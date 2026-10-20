Add-Type -TypeDefinition @"
using System;
using System.Runtime.InteropServices;
using System.Text;

public class WinCred {
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

    public static string GetCredential(string target) {
        IntPtr credPtr;
        if (CredRead(target, 1, 0, out credPtr)) {
            CREDENTIAL cred = (CREDENTIAL)Marshal.PtrToStructure(credPtr, typeof(CREDENTIAL));
            byte[] blob = new byte[cred.CredentialBlobSize];
            Marshal.Copy(cred.CredentialBlob, blob, 0, cred.CredentialBlobSize);
            CredFree(credPtr);
            string secretUtf8 = Encoding.UTF8.GetString(blob);
            string secretUnicode = Encoding.Unicode.GetString(blob);
            if (!string.IsNullOrEmpty(secretUtf8) && !secretUtf8.Contains("\0")) {
                return secretUtf8;
            }
            return Encoding.Unicode.GetString(blob);
        }
        return null;
    }
}
"@

$targets = @('git:https://github.com', 'git:https://Janeferdinant@github.com', 'git:https://x-access-token@github.com', 'Vercel')
foreach ($t in $targets) {
    $c = [WinCred]::GetCredential($t)
    if ($c) {
        Write-Host "Target [$t] -> Length: $($c.Length), Prefix: $($c.Substring(0, [Math]::Min(4, $c.Length)))..."
    } else {
        Write-Host "Target [$t] -> Not found"
    }
}
