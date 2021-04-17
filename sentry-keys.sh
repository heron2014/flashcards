SENTRY_AUTH_TOKEN=$(grep SENTRY_AUTH_TOKEN .env | cut -d '=' -f2)
sed -i '' "s/SENTRY_AUTH_TOKEN/${SENTRY_AUTH_TOKEN}/g" ./ios/sentry.properties
sed -i '' "s/SENTRY_AUTH_TOKEN/${SENTRY_AUTH_TOKEN}/g" ./android/sentry.properties
