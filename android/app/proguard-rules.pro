# Proguard rules for CulinaryVerse AI Android
-keepattributes *Annotation*
-keepclassmembers class * {
    @androidx.room.TypeConverter *;
}
-keep class com.culinaryverse.ai.data.model.** { *; }
