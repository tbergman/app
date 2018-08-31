#!/usr/bin/env bash

COMMIT_MESSAGE=$(git log -1 HEAD --pretty=format:%s)

echo "**************** PUBLISH CHANGES WITH CODEPUSH ******************"
echo "APP NAME                => $APP_NAME"
echo "SELECTED RN PACKAGE     => $APPCENTER_REACTNATIVE_PACKAGE"

appcenter codepush release-react -a "$APP_NAME" -m --description "$COMMIT_MESSAGE" -d "$CODE_PUSH_DEPLOYMENT_URL" --token "$APP_CENTER_TOKEN"