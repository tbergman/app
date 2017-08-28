## Prerequisites

* node js
* yarn
* expo account
* exp cli
* S3 bucket set up as website [link](http://docs.aws.amazon.com/AmazonS3/latest/dev/WebsiteHosting.html)
* s3cmd (cli)

## Set up

```
exp login
s3cmd --configure
```

## Installation

```
make install
```

## Deployment

### Mobile apps

This will deploy to your expo account

```
cd hedvig-app
yarn deploy
```

### Web

```
cd hedvig-web
HEDVIG_S3_BUCKET=<your_bucket_name> yarn deploy
```
