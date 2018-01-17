#!/usr/bin/env sh

cd hedvig-app
exp login -u ${EXPO_DEV_USERNAME} -p ${EXPO_DEV_PASSWORD}
sudo sysctl fs.inotify.max_user_watches=524288
sudo sysctl fs.inotify.max_queued_events=524288
sudo sysctl -p
yarn deploy
exp logout
