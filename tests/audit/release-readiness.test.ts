import { describe, it, expect } from 'vitest';
import {
  auditAndroidReleaseReadiness,
  OFFICIAL_PLAY_POLICY_REFS,
  generatePermissionJustificationMatrix,
  generateGooglePlayDataSafety,
} from '@/scripts/android-release-readiness';

describe('Android Release Readiness Agent & Google Play Policy Verification', () => {
  it('should verify all 6 official Google Play policy references are present and up to date', () => {
    expect(OFFICIAL_PLAY_POLICY_REFS.length).toBe(6);
    expect(OFFICIAL_PLAY_POLICY_REFS.map((r) => r.id)).toContain('target_api');
    expect(OFFICIAL_PLAY_POLICY_REFS.map((r) => r.id)).toContain('closed_testing_personal_account');
    expect(OFFICIAL_PLAY_POLICY_REFS.map((r) => r.id)).toContain('data_safety');
    expect(OFFICIAL_PLAY_POLICY_REFS.map((r) => r.id)).toContain('user_data_privacy');
    expect(OFFICIAL_PLAY_POLICY_REFS.map((r) => r.id)).toContain('prepare_for_review');
    expect(OFFICIAL_PLAY_POLICY_REFS.map((r) => r.id)).toContain('play_console_requirements');
  });

  it('should verify Android build strictly targets Android 16 (API 36) per August 31, 2026 mandate', async () => {
    const report = await auditAndroidReleaseReadiness();
    expect(report.buildConfig.targetSdk).toBe(36);
    expect(report.buildConfig.compileSdk).toBe(36);
    expect(report.buildConfig.minSdk).toBe(26);
    expect(report.buildConfig.applicationId).toBe('com.culinaryverse.ai');
    expect(report.buildConfig.targetApiCompliant).toBe(true);
  });

  it('should generate a comprehensive Permission Justification Matrix covering all declared permissions', () => {
    const matrix = generatePermissionJustificationMatrix();
    expect(matrix).toBeDefined();
    expect(matrix.permissions.map((p) => p.name)).toContain('android.permission.RECORD_AUDIO');
    expect(matrix.permissions.map((p) => p.name)).toContain('android.permission.INTERNET');
    expect(matrix.permissions.map((p) => p.name)).toContain('android.permission.WAKE_LOCK');

    const audioPermission = matrix.permissions.find((p) => p.name === 'android.permission.RECORD_AUDIO');
    expect(audioPermission?.userBenefit).toContain('Hands-free cooking assistant');
    expect(audioPermission?.isRuntime).toBe(true);
  });

  it('should generate Google Play Data Safety declaration draft reflecting genuine app behavior', () => {
    const dataSafety = generateGooglePlayDataSafety();
    expect(dataSafety.dataCollection.length).toBeGreaterThan(0);
    expect(dataSafety.encryptionInTransit).toBe(true);
    expect(dataSafety.supportsAccountDeletion).toBe(true);
    expect(dataSafety.deletionUrl).toContain('/privacy#account-deletion');
  });

  it('should verify personal developer account closed testing requirements (12 testers for 14 continuous days)', async () => {
    const report = await auditAndroidReleaseReadiness();
    expect(report.personalAccountRequirement.requiredTesters).toBe(12);
    expect(report.personalAccountRequirement.requiredContinuousDays).toBe(14);
    expect(report.personalAccountRequirement.policyUrl).toContain('14151465');
  });

  it('should conclude with READY FOR OWNER APPROVAL status if all technical gates pass', async () => {
    const report = await auditAndroidReleaseReadiness();
    expect(report.status).toBe('READY FOR OWNER APPROVAL');
  });
});
