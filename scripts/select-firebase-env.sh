#!/usr/bin/env bash

set -uex

case "${ENVIRONMENT}" in
    "development")
        cp android/app/src/debug/google-services.json android/app/google-services.json;
        cp ios/hedvig/GoogleService-Info.development.plist ios/hedvig/GoogleService-Info.plist ;;

    "staging")
        cp android/app/src/staging/google-services.json android/app/google-services.json;
        cp ios/hedvig/GoogleService-Info.staging.plist ios/hedvig/GoogleService-Info.plist ;;

    "production")
        cp android/app/src/release/google-services.json android/app/google-services.json;
        cp ios/hedvig/GoogleService-Info.production.plist ios/hedvig/GoogleService-Info.plist ;;

    *)
        echo "ENVIRONMENT must be one of: DEVELOPMENT, STAGING, PRODUCTION"; exit 1 ;;
esac
