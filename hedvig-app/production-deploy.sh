#!/usr/bin/env sh

if [ -z "${TRAVIS_PULL_REQUEST}"] || [ "${TRAVIS_PULL_REQUEST}" == "false" ]; then
    if [ "${TRAVIS_BRANCH}" == "master" ]; then
        exp login -u ${EXPO_USERNAME} -p ${EXPO_PASSWORD}
        sudo sysctl fs.inotify.max_user_watches=524288
        sudo sysctl fs.inotify.max_queued_events=52488
        sudo sysctl -p
        cd ../hedvig-redux
        sed -i -e 's/gateway.test.hedvig.com/gateway.hedvig.com/g' src/services/environment.js
        cd ../hedvig-app
        sed -i -e 's/com.hedvig.test.app/com.hedvig.app/g' app.json
        yarn deploy
        exp logout
    else
        echo "Not on deploy, will not deploy to production"
    fi
else
    echo "Not on deploy, will not deploy to production"
fi
