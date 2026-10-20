param()

$credHelper = @"
using System;
using System.Runtime.InteropServices;
using System.Text;

public class WinCredTester2 {
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

    public static string Read(string target) {
        IntPtr credPtr;
        if (CredRead(target, 1, 0, out credPtr)) {
            CREDENTIAL cred = (CREDENTIAL)Marshal.PtrToStructure(credPtr, typeof(CREDENTIAL));
            byte[] blob = new byte[cred.CredentialBlobSize];
            Marshal.Copy(cred.CredentialBlob, blob, 0, cred.CredentialBlobSize);
            CredFree(credPtr);
            string s = Encoding.UTF8.GetString(blob);
            if (!string.IsNullOrEmpty(s) && !s.Contains("\0")) return s;
            return Encoding.Unicode.GetString(blob);
        }
        return null;
    }
}
"@

Add-Type -TypeDefinition $credHelper -ErrorAction SilentlyContinue

$token = [WinCredTester2]::Read('git:https://github.com')
$headers = @{
    'Authorization' = "token $token"
    'User-Agent' = 'Miseva-Deploy-Agent'
    'Accept' = 'application/vnd.github.v3+json'
}

$body = @{
    name = "miseva-ai-marketing"
    description = "Miseva AI - Autonomous Multi-Channel Marketing and Social Media Automation Engine"
    private = $false
    has_issues = $true
    has_projects = $true
    has_wiki = $false
} | ConvertTo-Json

try {
    $res = Invoke-RestMethod -Uri 'https://api.github.com/user/repos' -Method Post -Headers $headers -Body $body -ContentType 'application/json'
    Write-Host "SUCCESS: Created GitHub repo: $($res.html_url)"
} catch {
    Write-Host "Creation Response: $($_.Exception.Message)"
}
