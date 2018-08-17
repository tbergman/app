#!/usr/bin/env bash

set -uex

case "${ENVIRONMENT}" in
    "development")
        mv android/app/src/debug/google-services.json android/app/google-services.json;
        mv ios/hedvig/GoogleService-Info.development.plist ios/hedvig/GoogleService-Info.plist ;;

    "staging")
        mv android/app/src/staging/google-services.json android/app/google-services.json;
        mv ios/hedvig/GoogleService-Info.staging.plist ios/hedvig/GoogleService-Info.plist ;;

    "production")
        mv android/app/src/release/google-services.json android/app/google-services.json;
        mv ios/hedvig/GoogleService-Info.production.plist ios/hedvig/GoogleService-Info.plist ;;

    *)
        echo "ENVIRONMENT must be one of: DEVELOPMENT, STAGING, PRODUCTION"; exit 1 ;;
esac
