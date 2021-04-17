Flashcard App

#### IOS:
master (dev): [![Build status](https://build.appcenter.ms/v0.1/apps/e9a179b2-6d20-4972-baa5-88555b777e12/branches/master/badge)](https://appcenter.ms)
release (prod): [![Build status](https://build.appcenter.ms/v0.1/apps/e9a179b2-6d20-4972-baa5-88555b777e12/branches/release/badge)](https://appcenter.ms)

### ENV VAR

```
API_URL=
APPCENTER_SECRET_KEY=
IOS_PRE_PLAYGROUND_PROMO_AD_UNIT_ID=
ANDROID_PRE_PLAYGROUND_PROMO_AD_UNIT_ID=
AD_MOB_IOS_APP_ID=
AD_MOB_ANDROID_APP_ID=
SENTRY_DSN=
SENTRY_AUTH_TOKEN=
```

Run the app locally:
```yarn start```

#### run on Android

```adb reverse tcp:8081 tcp:8081```
- check if device is connected: ```adb devices```
```yarn android```
