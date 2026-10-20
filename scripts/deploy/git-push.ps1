Add-Type -TypeDefinition @"
using System;
using System.Runtime.InteropServices;
using System.Text;

public class WinCredHelper {
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

$token = [WinCredHelper]::GetSecret('git:https://github.com')
if (-not $token) {
    $token = [WinCredHelper]::GetSecret('git:https://Janeferdinant@github.com')
}

if (-not $token) {
    Write-Error "Failed to retrieve GitHub token from Windows Credential Manager."
    exit 1
}

$basicAuth = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes("x-access-token:$token"))
Write-Host "Authenticating with GitHub using stored WCM credential..."

git -c "http.extraheader=AUTHORIZATION: basic $basicAuth" push origin main
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Successfully pushed to https://github.com/Janeferdinant/miseva-ai.git on branch main!"
} else {
    Write-Error "Git push failed with exit code $LASTEXITCODE"
    exit $LASTEXITCODE
}
