Add-Type -TypeDefinition @"
using System;
using System.Runtime.InteropServices;
using System.Text;

public class WinCredVercel {
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

$vercelToken = [WinCredVercel]::GetSecret('Vercel')
if (-not $vercelToken) {
    Write-Host "Vercel token not found in WCM. Checking Vercel environment variables..."
    $vercelToken = $env:VERCEL_TOKEN
}

if ($vercelToken) {
    Write-Host "Vercel Token acquired from WCM. Checking deployment status..."
    $env:VERCEL_TOKEN = $vercelToken
    # Run npx vercel with token to inspect or deploy
    npx vercel --token $vercelToken --yes --prod
} else {
    Write-Host "Using automatic Git-integrated deployment via GitHub."
}
