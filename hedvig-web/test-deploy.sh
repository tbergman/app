#!/bin/bash
set -uex

if [ -z "${TRAVIS_PULL_REQUEST}" ] || [ "${TRAVIS_PULL_REQUEST}" == "false" ]; then
    if [ "${TRAVIS_BRANCH}" == "develop" ]; then
        echo "{\"s3_bucket_url\":\"${TEST_S3_BUCKET_URL}\"}" > ../hedvig-redux/config.json
        yarn build
        echo "TODO: Set up deploys as well"
    else
        echo "Not on develop, will not deploy to test"
    fi
else
    echo "Not on develop, will not deploy to test"
fi
