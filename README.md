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

### Chat message types

* `text` - Plain text message
* `single_select` - Single select question / answer
* `multiple_select` - Multiple select question / answer
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
