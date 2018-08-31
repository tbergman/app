#!/usr/bin/env bash

COMMIT_MESSAGE=$(git log -1 HEAD --pretty=format:%s)

echo "**************** PUBLISH CHANGES WITH CODEPUSH ******************"

cd $APPCENTER_SOURCE_DIRECTORY; appcenter codepush release-react -a "$APP_CENTER_APP_NAME" -m --description "$COMMIT_MESSAGE" -d "$CODE_PUSH_DEPLOYMENT_NAME" --token "$APP_CENTER_TOKEN"