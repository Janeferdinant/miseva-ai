# Android Permission Justification Matrix — CulinaryVerse AI

> **Package ID:** `com.culinaryverse.ai`  
> **Target SDK:** API 36 (Android 16+)  
> **Play Store Policy Compliance Date:** October 2026

| Permission | Type | User Benefit & Feature | Privacy Impact & Safeguards |
| :--- | :--- | :--- | :--- |
| `android.permission.INTERNET` | Normal | **Access latest recipes, culinary techniques, and price comparisons across Indian retailers.**: Fetch recipe catalog updates, AI chef interactions, and real-time grocery prices. | Encrypted communication over HTTPS only; no personal data transmitted without explicit action. |
| `android.permission.ACCESS_NETWORK_STATE` | Normal | **Uninterrupted cooking experience even if kitchen Wi-Fi drops.**: Monitor connection status to seamlessly switch between online API and offline Room DB cache. | Read-only network state; no location or hardware telemetry gathered. |
| `android.permission.WAKE_LOCK` | Normal | **Hands-free cooking without phone display timing out while hands are covered in flour or spices.**: Keep screen active while user is in active Cooking Studio session. | Only active during an in-progress cooking step; immediately released when leaving studio. |
| `android.permission.POST_NOTIFICATIONS` | Dangerous / Runtime | **Prevents burnt dishes and overboiled payasam by alerting user when timer finishes.**: Notify cook when kitchen timers expire or when meal plan alerts trigger. | Standard Android notification channel; user can mute in OS settings anytime. |
| `android.permission.RECORD_AUDIO` | Dangerous / Runtime | **Hands-free cooking assistant allows cook to ask questions and advance steps using voice.**: Capture voice commands for hands-free recipe navigation and bilingual cooking assistance. | Audio is streamed only while voice button is pressed or hands-free wake word is active; audio is never stored or shared. |

### Runtime Permission Journey:
1. **Microphone (`RECORD_AUDIO`):** Requested just-in-time only when user taps the microphone button in Cooking Studio. Preceded by an in-app educational dialog explaining that voice audio is processed locally/transiently for step navigation.
2. **Notifications (`POST_NOTIFICATIONS`):** Requested when user initiates their first active multi-step cooking timer.
