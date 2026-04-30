# Plan: Fix failing EAS build (Missing gradlew)

The EAS build is failing because it cannot find the `android/gradlew` file. This is due to the `android/` directory being ignored in `.gitignore`, while the `development` build profile in `eas.json` specifies a custom `gradleCommand`. This combination often causes EAS to skip the automatic `prebuild` step that would otherwise generate the native directory.

## Proposed Changes

### 1. `eas.json`
- Remove the `"gradleCommand": ":app:assembleDebug"` override from the `development` profile.
- This allows EAS to use its default build logic, which includes running `npx expo prebuild` if the native directory is missing.

### 2. `.gitignore`
- Remove `/android/` and `/ios/` from the ignored patterns.
- **Rationale**: While Expo managed projects often ignore these folders, Shelly contains custom JNI modules (`modules/terminal-emulator`, `modules/terminal-view`). Committing the native directories ensures that the native project configuration is consistent between local development and EAS/CI environments. It also prevents the "missing gradlew" error.

### 3. Native Directory Cleanup (Optional)
- After unignoring the directories, they should be staged and committed to the repository.

## Verification Plan

### 1. Local Verification
- Run `git status` to ensure `android/` and `ios/` are no longer ignored.
- Run `npx expo prebuild` locally to ensure the directories are in a clean state.

### 2. EAS Build Verification
- Trigger a new EAS build for the development profile:
  ```bash
  eas build --platform android --profile development
  ```
- Verify that the build no longer fails with the `ENOENT` error for `gradlew`.
