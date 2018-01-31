if [ -z "${TRAVIS_PULL_REQUEST}" ] || [ "${TRAVIS_PULL_REQUEST}" == "false" ]; then
    if [ "${TRAVIS_BRANCH}" == "master" ]; then
        sudo sysctl fs.inotify.max_user_watches=524288
        sudo sysctl fs.inotify.max_queued_events=524288
        sudo sysctl -p
        exp login -u ${EXPO_DEV_USERNAME} -p ${EXPO_DEV_PASSWORD}
        exp publish
        sed -i -e 's/https:\/\/gateway.test.hedvig.com/http:\/\/hedvig.ngrok.io/g' ../hedvig-redux/src/services/environment.js
        sed -i -e 's/"slug": "hedvig-app"/"slug": "hedvig-ngrok-app"/g' app.json
        exp logout
        exp login -u ${EXPO_DEV_USERNAME} -p ${EXPO_DEV_PASSWORD}
        exp publish
        exp logout
    else
        echo "Not on master, will not deploy to test"
    fi
else
    echo "Not on master, will not deploy to test"
fi
