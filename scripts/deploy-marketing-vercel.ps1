param()

Add-Type -TypeDefinition @"
using System;
using System.Runtime.InteropServices;
using System.Text;

public class WinCredVercelMarketing {
    [DllImport("advapi32.dll", SetLastError = true, CharSet = CharSet.Unicode)]
    public static extern bool CredRead(string target, int type, int reservedFlag, out IntPtr credentialPtr);

    [DllImport("advapi32.dll", SetLastError = true)]
    public static extern void CredFree(IntPtr credentialPtr);

    [StructLayout(LayoutKind.Sequential, CharSet = CharSet.Unicode)]
    public struct CREDENTIAL {
        public int Flags;
        public int Type;
        public string TargetName;
        public string Comment;
        public long LastWritten;
        public int CredentialBlobSize;
        public IntPtr CredentialBlob;
        public int Persist;
        public int AttributeCount;
        public IntPtr Attributes;
        public string TargetAlias;
        public string UserName;
    }

    public static string GetSecret(string target) {
        IntPtr credPtr;
        if (CredRead(target, 1, 0, out credPtr)) {
            CREDENTIAL cred = (CREDENTIAL)Marshal.PtrToStructure(credPtr, typeof(CREDENTIAL));
            byte[] blob = new byte[cred.CredentialBlobSize];
            Marshal.Copy(cred.CredentialBlob, blob, 0, cred.CredentialBlobSize);
            CredFree(credPtr);
            string secretUtf8 = Encoding.UTF8.GetString(blob);
            if (!string.IsNullOrEmpty(secretUtf8) && !secretUtf8.Contains("\0")) {
                return secretUtf8;
            }
            return Encoding.Unicode.GetString(blob);
        }
        return null;
    }
}
"@

$vercelToken = [WinCredVercelMarketing]::GetSecret('Vercel')
if (-not $vercelToken) {
    $vercelToken = $env:VERCEL_TOKEN
}

$marketingDir = "c:\Users\Asus\Documents\miseva-ai-marketing"
Set-Location $marketingDir

if ($vercelToken) {
    Write-Host "Deploying miseva-ai-marketing to Vercel with token..."
    $env:VERCEL_TOKEN = $vercelToken
    npx vercel --token $vercelToken --yes --prod --name miseva-ai-marketing
} else {
    Write-Host "Vercel token not found. Automatic GitHub deployment configured on Janeferdinant/miseva-ai-marketing."
}
