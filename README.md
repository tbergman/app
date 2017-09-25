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

## Client / Server communcation

### Initiate an insurance update by requesting a quote

Get a quote

`POST /insurance/quote`

#### Request body example:

```
{
  "insurance": {
    "fire": true,
    "theft": false,
    "waterleak": true
  }
}
```

#### Response body example

```
{
  "insurance": {
    "fire": {
      "state": "waiting_for_payment",
      "included_in_base_package": false,
    },
    "theft": {
      "state": "disabled",
      "included_in_base_package": false
    },
    "waterleak": {
      "state": "waiting_for_signing", // any of "disabled", "waiting_for_signing", "waiting_for_payment", "enabled"
      "included_in_base_package": true
    },
    "current_total_price": 0,
    "new_total_price": 500
    }
  }
}
```

or in case the user is denied a quote

```
{
  "insurance": {
    "denied": true
  }
}
```

### My current insurance

Get my current insurance (also includes new price if user has requested a quote that differs from their current insurance)

`GET /insurance`

#### Response body example

```
{
  "insurance": {
    "fire": {
      "state": "waiting_for_payment",
      "included_in_base_package": false,
    },
    "theft": {
      "state": "disabled",
      "included_in_base_package": false
    },
    "waterleak": {
      "state": "waiting_for_signing", // any of "disabled", "waiting_for_signing", "waiting_for_payment", "enabled"
      "included_in_base_package": true
    },
    "assets": [
      {
        "id": "12312412",
        "image_urls": [...],
        "name": "Kamera"
        "state": "enabled", // any of "disabled", "waiting_for_signing", "waiting_for_payment", "enabled"
        "included_in_base_package": true
      },
      {
        "id": "1231241124122",
        "image_urls": [...],
        "name": "Laptop"
        "state": "waiting_for_signing", // any of "disabled", "waiting_for_signing", "waiting_for_payment", "enabled"
        "included_in_base_package": false
      }
    ]
    "current_total_price": 500
    "new_total_price": 600 // only set if the user has made quote request that differs from their current insurance
    }
  }
}
```

### Add / edit / delete an asset

`POST (for create) PUT (for edit) DELETE /insurance/assets/{id} (id if editing or deleting)

#### Request body example

```
{
  "image_urls": [...],
  "name": "Laptop"
  "included_in_base_package": false
}
```

#### Response code

2xx

### Claims

#### Initiate a general claim

`POST /claim`

Response code: 204

#### Initiate a claim for specific asset

`POST /claim/asset/{id}`

Reponse code: 204

#### Initiate a claim for specific insurance

`POST /claim/insurance/{id}`

Reponse code: 204

**After initiating a claim the client fetches `/messages`**

### Claim video / audio / photo upload

`POST {response_path}` where response_path is provided in the chat message with corresponding type

### List cashback options

#### Request body example

`GET /cashback/options`

```
{
  "id1": {
    "name": "Rädda Barnen",
    "selected": false,
    "charity": true
  },
  "id2": {
    "name": "Mitt konto",
    "selected": true,
    "charity": false
  }
}
```

### Edit cashback option via separate endpoint (used in profile view)

`POST /cashback`

#### Request body example

```
{
  "id1": {
    "name": "Rädda Barnen",
    "selected": true,
    "charity": true
  },
  "id2": {
    "name": "Mitt konto",
    "selected": false,
    "charity": false
  }
}
```

#### Response body example

```
{
  "id1": {
    "name": "Rädda Barnen",
    "selected": true,
    "charity": true
  },
  "id2": {
    "name": "Mitt konto",
    "selected": false,
    "charity": false
  }
}
```

### Send insurance letter by email

`POST /insurance/email-policy`

Response code: 204

### Chat

![image](https://user-images.githubusercontent.com/206061/30038446-f1a534e0-91c4-11e7-9ee7-74ba6bf4c976.png)

Chat messages are delivered through polling the /messages endpoint. Response format is {"timestamp1":message1, "timestamp2":message2,...}

#### Chat message types

* `text` - Plain text message
* `single_select` - Single select question / answer
* `multiple_select` - Multiple select question / answer
* `multiple_choice` - Multiple actionable choices
* `map_select` - Select position on a map
* `datepicker` - Select a date
* `video` or `audio` **not decided yet** - Let's a user record and upload a video or audio
* `hero` - A big "hero" / "jumbotron" to showcase key (marketing?) messages
* `link` - A link to another view

#### Chat flow example

GET /messages
```
{ "data":
  { "1":
    {
      "header": { "from": 1, "type": "text", "message_id": 1, "timestamp": 1231231231231 },
      "body": { "content": "Welcome" }
    }
  }
}
```

GET /messages
```
{ "data":
  { "1":
    {
      "header": { "from": 1, "type": "text", "message_id": 1, "timestamp": 1231231231231 },
      "body": { "content": "Welcome" }
    },
    "2":
    {
      "header": { "from": 1, "type": "single_select", "response_path": "/response/2", "message_id": 2, "timestamp": 1231231231232 },
      "body": { "question": "Which is your favourite color?",
                "options": [
                  {"id": 1, "value": "Red", "selected": false},
                  {"id": 2, "value": "Green", "selected": false},
                  {"id": 3, "value": "Blue", "selected": false}
                ]
              }
    }
  }
}
```

POST /message/2
```
{
  "header": { "type": "single_select" },
  "body": { "answer": 3 }
}
```

GET /messages
```
{ "data":
  { "1":
    {
      "header": { "from": 1, "type": "text", "message_id": 1, "timestamp": 1231231231231 },
      "body": { "content": "Welcome" }
    },
  "2":
    {
      "header": { "from": 1, "type": "single_select", "response_path": "/response/2", "message_id": 2, "timestamp": 1231231231232 },
      "body": { "question": "Which is your favourite color?",
                "options": [
                  {"id": 1, "value": "Red", "selected": false},
                  {"id": 2, "value": "Green", "selected": false},
                  {"id": 3, "value": "Blue", "selected": true}
                ]
              }
    },
  "3":
    {
      "header": { "from": 1, "type": "text", "message_id": 3, "timestamp": 1231231231233 },
      "body": { "content": "What's your name?" }
    }
  }
}
```

POST /message
```
{
  "header": { "type": "text" },
  "body": { "content": "Fredrik" }
}
```

// GET /messages
```
{ "data":
  { "1":
    {
      "header": { "from": 1, "type": "text", "message_id": 1, "timestamp": 1231231231231 },
      "body": { "content": "Welcome" }
    },
  "2":
    {
      "header": { "from": 1, "type": "single_select", "response_path": "/response/2", "message_id": 2, "timestamp": 1231231231232 },
      "body": { "question": "Which is your favourite color?",
                "options": [
                  {"id": 1, "value": "Red", "selected": false},
                  {"id": 2, "value": "Green", "selected": false},
                  {"id": 3, "value": "Blue", "selected": true}
                ]
              }
    },
  "3":
    {
      "header": { "from": 1, "type": "text", "message_id": 3, "timestamp": 1231231231233 },
      "body": { "content": "What's your name?" }
    },
  "4":
    {
      "header": { "from": 123, "type": "text", "message_id": 4, "timestamp": 1231231231234 },
      "body": { "content": "Fredrik" }
    }
  }
}
```
