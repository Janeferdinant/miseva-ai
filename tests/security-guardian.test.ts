import { describe, it, expect } from 'vitest';
import { runSecurityGuardianAudit, scanForSecrets, auditAndroidManifest, auditAiAgentSecurity, auditDatabaseSecurity } from '../scripts/security-guardian';

describe('Security Guardian — AppSec & Play Store Compliance Auditor', () => {
  it('should audit all 14 required scopes across web, android, api, and infrastructure', async () => {
    const report = await runSecurityGuardianAudit();
    
    expect(report).toBeDefined();
    expect(report.scannedScopes).toContain('nextjs_web');
    expect(report.scannedScopes).toContain('android_native');
    expect(report.scannedScopes).toContain('backend_apis');
    expect(report.scannedScopes).toContain('ai_cooking_agent');
    expect(report.scannedScopes).toContain('authentication_authorization');
    expect(report.scannedScopes).toContain('database_rls');
    expect(report.scannedScopes).toContain('external_shopping_adapters');
    expect(report.scannedScopes).toContain('media_and_images');
    expect(report.scannedScopes).toContain('voice_services');
    expect(report.scannedScopes).toContain('caching_and_offline_storage');
    expect(report.scannedScopes).toContain('secrets_and_env_vars');
    expect(report.scannedScopes).toContain('dependencies_and_sbom');
    expect(report.scannedScopes).toContain('cicd_workflows');
    expect(report.scannedScopes).toContain('privacy_policy_and_disclosures');
  });

  it('should find ZERO Critical vulnerabilities in the current codebase to pass the release security gate', async () => {
    const report = await runSecurityGuardianAudit();
    expect(report.summary.critical).toBe(0);
    expect(report.gatePassed).toBe(true);
  });

  it('should verify secret scanning detects no hardcoded API keys or credentials in source code', async () => {
    const secretScan = await scanForSecrets();
    expect(secretScan.detectedSecrets.length).toBe(0);
    expect(secretScan.scannedFilesCount).toBeGreaterThan(20);
  });

  it('should verify Android Manifest complies with mobile AppSec standards', async () => {
    const manifestAudit = await auditAndroidManifest();
    expect(manifestAudit.usesCleartextTraffic).toBe(false);
    expect(manifestAudit.allowBackup).toBe(false);
    expect(manifestAudit.exportedComponentsSafelyConfigured).toBe(true);
    expect(manifestAudit.unjustifiedPermissions.length).toBe(0);
  });

  it('should verify AI cooking agent enforces prompt injection guardrails and tool sandboxing', async () => {
    const aiAudit = await auditAiAgentSecurity();
    expect(aiAudit.hasPromptInjectionMitigation).toBe(true);
    expect(aiAudit.hasInputLengthLimits).toBe(true);
    expect(aiAudit.disallowsSystemOverride).toBe(true);
  });

  it('should verify database schema and client enforce least privilege / RLS patterns', async () => {
    const dbAudit = await auditDatabaseSecurity();
    expect(dbAudit.leastPrivilegeEnforced).toBe(true);
    expect(dbAudit.noExposedServiceRoleKeysInClient).toBe(true);
  });

  it('should generate an SBOM and inventory of third-party dependencies', async () => {
    const report = await runSecurityGuardianAudit();
    expect(report.sbom).toBeDefined();
    expect(report.sbom.components.length).toBeGreaterThan(5);
  });
});
