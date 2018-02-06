#!/bin/bash
set -uex

if [ -z "${TRAVIS_PULL_REQUEST}" ] || [ "${TRAVIS_PULL_REQUEST}" == "false" ]; then
    if [ "${TRAVIS_BRANCH}" == "deploy" ]; then
        sudo sysctl fs.inotify.max_user_watches=524288
        sudo sysctl fs.inotify.max_queued_events=52488
        sudo sysctl -p
        echo "{\"s3_bucket_url\":\"${PROD_S3_BUCKET_URL}\"}" > ../hedvig-redux/config.json
        cd ../hedvig-redux
        sed -i -e 's/gateway.test.hedvig.com/gateway.hedvig.com/g' src/services/environment.js
        cd ../hedvig-app
        sed -i -e 's/com.hedvig.test.app/com.hedvig.app/g' app.json
        sed -i -e 's/hedvig-test/hedvig/g' app.json
        sed -i -e 's/"name": "Hedvig Test"/"name": "Hedvig"/g' app.json
        exp login -u ${EXPO_USERNAME} -p ${EXPO_PASSWORD}
        exp publish --non-interactive
        exp logout
    else
        echo "Not on deploy, will not deploy to production"
    fi
else
    echo "Not on deploy, will not deploy to production"
fi
