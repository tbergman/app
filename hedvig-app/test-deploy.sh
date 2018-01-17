#!/usr/bin/env sh

if [ -z "${TRAVIS_PULL_REQUEST}"] || [ "${TRAVIS_PULL_REQUEST}" == "false" ]; then
    if [ "${TRAVIS_BRANCH}" == "master" ]; then
        exp login -u ${EXPO_DEV_USERNAME} -p ${EXPO_DEV_PASSWORD}
        sudo sysctl fs.inotify.max_user_watches=524288
        sudo sysctl fs.inotify.max_queued_events=524288
        sudo sysctl -p
        yarn deploy
        exp logout
    else
        echo "Not on master, will not deploy to test"
    fi
else
    echo "Not on master, will not deploy to test"
fi
