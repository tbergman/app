#!/usr/bin/env bash

COMMIT_MESSAGE=$(git log -1 HEAD --pretty=format:%s)
PACKAGE_VERSION=$( awk -F: '$1 ~ /"version"/ { split($2,array,"\""); print array[2] ; exit }' package.json )

ANDROID_ARCHIVE_DIR="$APPCENTER_OUTPUT_DIRECTORY/android/app/build/intermediates/assets/release"
IOS_ARCHIVE_DIR="$APPCENTER_OUTPUT_DIRECTORY/archive/Staging.xcarchive/Products/Applications/Hedvig.app"

if [ "$PLATFORM" = "ANDROID" ]; then
    ARCHIVE_DIR="$ANDROID_ARCHIVE_DIR"
    BUNDLE_NAME="index.android.bundle"
else
    ARCHIVE_DIR="$IOS_ARCHIVE_DIR"
    BUNDLE_NAME="main.jsbundle"
fi

TMP_FOLDER="/tmp/codepush"

echo "**************** PUBLISH CHANGES WITH CODEPUSH ******************"
echo "$APPCENTER_OUTPUT_DIRECTORY"
echo "$ARCHIVE_DIR"

ls "$APPCENTER_OUTPUT_DIRECTORY"

mkdir "$TMP_FOLDER"
cp "$ARCHIVE_DIR/$BUNDLE_NAME" "$TMP_FOLDER"
cp -r "$ARCHIVE_DIR/assets" "$TMP_FOLDER"

appcenter codepush release -a "$APP_CENTER_APP_NAME" -c "$TMP_FOLDER" --description "hello" -d "$CODE_PUSH_DEPLOYMENT_NAME" -t "$PACKAGE_VERSION" --token "$APP_CENTER_TOKEN"