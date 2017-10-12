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

## Internal api

### Status bar messages

You can use the status bar to show a message, warning or error:
`store.dispatch(
  hedvigRedux.statusMessageActions.setStatusMessage(
    {message: "Hello World!"}
  )
)`
where you use any of these keys: `message`, `warning` or `error`

## Client / Server communcation

### Peril states

* `"ADD_REQUESTED"` - set by the client to mark a user's request to add this peril
* `"REMOVE_REQUESTED"` - set by the client to mark a user's request to remove this peril
* `"ADD_PENDING"` - the peril add is pending
* `"REMOVE_PENDING"` - the peril remove is pending
* `"WAITING_FOR_PAYMENT"` - needs payment to get activated
* `"NOT_COVERED"` - this peril is not covered by the user's insurance
* `"COVERED"` - this peril is covered by the user's insurance

### Initiate an insurance update by requesting a quote

Get a quote

`POST /insurance/quote`

#### Request body example:

```
"categories": [
  {
    "title": "Du och din familj",
    "iconUrl": "https://unsplash.it/70/70"
    "perils": [
      {
        "id": "someid",
        "title": "Peril 1 CREATED",
        "key": 0,
        "state": "ADD_REQUESTED",   // ADD_REQUESTED when a user wants to add this peril or REMOVE_REQUESTED when a user wants to remove this peril
        "imageUrl": "https://s-media-cache-ak0.pinimg.com/originals/ee/51/39/ee5139157407967591081ee04723259a.png",
        "description": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean m"
      },
      ...
    ],
  },
  ...
]
```

#### Response body example

```
{
  "categories": [
    {
      "title": "Du och din familj",
      "iconUrl": "https://unsplash.it/70/70"
      "perils": [
        {
          "id": "someid",
          "title": "Peril 1 CREATED",
          "key": 0,
          "state": "CREATED",
          "imageUrl": "https://s-media-cache-ak0.pinimg.com/originals/ee/51/39/ee5139157407967591081ee04723259a.png",
          "description": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean m"
        },
        ...
      ],
    },
    ...
  ],
  "currentTotalPrice": 0,
  "newTotalPrice": 500,
  "status": OK,
  "statusDescription": ""
}
```

or in case the user is denied a quote the status is set to DENIED and statusDescription contains a text for display

### My current insurance

Get my current insurance (also includes new price if user has requested a quote that differs from their current insurance)

`GET /insurance`

#### Response body example

```
{
  "categories": [
    {
      "title": "Du och din familj",
      "iconUrl": "https://unsplash.it/70/70"
      "perils": [
        {
          "id": "someid",
          "title": "Peril 1 CREATED",
          "key": 0,
          "state": "CREATED",
          "imageUrl": "https://s-media-cache-ak0.pinimg.com/originals/ee/51/39/ee5139157407967591081ee04723259a.png",
          "description": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean m"
        },
        ...
      ],
    },
    ...
  ],
  "currentTotalPrice": 0,
  "newTotalPrice": 500  // This is only set to an integer if the user hasn't paid an updated insurance. Otherwise, when no update is done, it's set to null.
}
```

### Asset states

* `"CREATED"` - information posted to backend
* `"PENDING"` - Wait for
Hedvig to get back to the user in the chat / email
* `"WAITING_FOR_PAYMENT"`
* `"NOT_COVERED"` - if they chose not to pay, or Hedvig decided this can’t be covered
* `"COVERED"`

### Upload image files
`POST file in field fileUpload to /asset/fileupload/`
```
<form method="post" action="https://gateway.hedvig.com/asset/fileupload/" enctype="multipart/form-data">
  <input type="file" class="file" name="fileUpload"/>
</form>
```
Returns 2xx with id of saved image
```
{id:2d3ab7cc-469b-416b-a146-61937542dc51}
```
Images are then loaded from
```
GET /asset/image/{id}
```
Ex:
```
https://gateway.hedvig.com/asset/image/2d3ab7cc-469b-416b-a146-61937522dc51
```

### List assets

`GET /asset/`

```
[
  {
    "id": "someid",
    "photoUrl": "https://unsplash.it/200/200",
    "receiptUrl": "https://unsplash.it/100/200",
    "title": "Laptop"
    "state": "COVERED"
    "includedInBasePackage": false
    "registrationDate": "2017-10-10"
  },
  ...
]
```

### Add / edit an asset

`POST (for create) PUT (for edit) /asset/ (set id in payload if editing)`

#### Request body example (for POST and PUT - no body required for DELETE)

```
{
  "id": "someidIfWe'reEditing",
  "photoUrl": "https://unsplash.it/200/200",
  "receiptUrl": "https://unsplash.it/100/200",
  "title": "Laptop"
  "state": "CREATED" // The client sets state to "CREATED" when adding an item. The backend should respond with pending.
  "includedInBasePackage": false
  "registrationDate": "2017-10-10"
}
```
### Delete an asset

`DELETE /asset/{id}`

```
gateway.hedvig.com/asset/57003ec1-bdd0-4e8b-a98e-325fa5b629de
```

#### Response code

2xx

```
{
  "id": "someid",
  "photoUrl": "https://unsplash.it/200/200",
  "receiptUrl": "https://unsplash.it/100/200",
  "title": "Laptop"
  "state": "PENDING" // The client sets state to "CREATED" when adding an item. The backend should respond with pending.
  "includedInBasePackage": false
  "registrationDate": "2017-10-10"
}
```

### Checkout

`POST /checkout`

### Claims

#### Initiate a general claim

`POST /claim`

Response code: 204

#### Initiate a claim for specific asset

`POST /claim/asset/{id}`

Reponse code: 204

**After initiating a claim the client fetches `/messages`**

### Claim video / audio / photo upload

`POST {response_path}` where response_path is provided in the chat message with corresponding type

### List cashback options

#### Request body example

`GET /cashback/options`

```
[
  {
    "id": "someid",
    "title": "Rädda Barnen",
    "description": "Lorem ipsum dolor sit amet...",
    "selected": false,
    "charity": true,
    "imageUrl": "https://unsplash.it/400/200"
  },
  {
    "id": "someotherid",
    "title": "Mitt konto",
    "description": "Lorem ipsum dolor sit amet...",
    "selected": true,
    "charity": false,
    "imageUrl": "https://unsplash.it/400/200"
  }
]
```

### Edit cashback option via separate endpoint (used in profile view)

`POST /cashback`

* Parameter `optionId`
* Value `id` of the option selected

#### Request body example

```
[
  {
    "id": "someid",
    "title": "Rädda Barnen",
    "description": "Lorem ipsum dolor sit amet...",
    "selected": true,
    "charity": true,
    "imageUrl": "https://unsplash.it/400/200"
  },
  {
    "id": "someotherid",
    "title": "Mitt konto",
    "description": "Lorem ipsum dolor sit amet...",
    "selected": false,
    "charity": false,
    "imageUrl": "https://unsplash.it/400/200"
  }
]
```

#### Response body example

```
[
  {
    "id": "someid",
    "title": "Rädda Barnen",
    "description": "Lorem ipsum dolor sit amet...",
    "selected": true,
    "charity": true,
    "imageUrl": "https://unsplash.it/400/200"
  },
  {
    "id": "someotherid",
    "title": "Mitt konto",
    "description": "Lorem ipsum dolor sit amet...",
    "selected": false,
    "charity": false,
    "imageUrl": "https://unsplash.it/400/200"
  }
]
```

### Get current user

`GET ~~/me~~ /member/me`

```
{
  "name": "Anakin Skywalker",
  "familyMembers": [
    "Anakin Skywalker",
    "Padmé Amidala",
    "Luke Skywalker",
    "Leia Organa"
  ],
  "age": 26,
  "email": "anakkin@skywalk.er",
  "address": "Krukmakargatan 5",
  "livingAreaSqm": "48",
  "maskedBankAccountNumber": "XXXX XXXX 1234",
  "selectedCashback": "Rädda Barnen"
}
```

### Update profile

The client:

1. makes the corresponding request
2. navigates to chat where the the converation in /messages is about updating the requested topic

`POST /hedvig/initiateUpdate`

* Paramter: `what`
* Values: `PERSONAL_INFORMATOIN, FAMILY_MEMBERS, APARTMENT_INFORMATION, BANK_ACCOUNT`

Response code: 204

### Push notifications

Read more about the client / server requirements [here](https://docs.expo.io/versions/latest/guides/push-notifications.html#2-call-expos-push-api-with-the-users-token)

`POST /push-token`

```
{
  "token": "somepushtoken"
}
```

### Chat

![image](https://user-images.githubusercontent.com/206061/30038446-f1a534e0-91c4-11e7-9ee7-74ba6bf4c976.png)

Chat messages are delivered through polling the /messages endpoint. They are delivered in timestamp order (as seen by the API-GATEWAY)
<BR>Response format is {"timestamp1":message1, "timestamp2":message2,...}
<BR><BR>
Chat messages are recieved by POSTING to the /response endpoint with the id field set to the message you are responding to. To respond to a message just alter the content and/or the Boolean select fields of the choices and post it to /response. Note the message does not include the initial timestamp so to reply to

```
"1507473841801":{
  "globalId":4,
  "id":"message.getname",
  "header":{
    "messageId":4,
    "fromId":1,
    "responsePath":"/response",
    "timeStamp":1507473841801},
   "body":{
    "type":"text",
    "id":4,
    "text":"Trevlig, vad heter du?"},
   "timestamp":1507473841.801000000}
```
simply POST this to /response:

```
{
  "globalId":4,
  "id":"message.getname",
  "header":{
    "messageId":4,
    "fromId":1,
    "responsePath":"/response",
    "timeStamp":1507473841801},
   "body":{
    "type":"text",
    "id":4,
    "text":"John Doe"},
   "timestamp":1507473841.801000000
}
```
<BR>Request format is {message}

#### Chat message types

* `text` - Plain text message
```
"1507549994762": {
  "id": "message.getname",
  "header": {
    "messageId": 20,
    "fromId": 1,
    "responsePath": "/response",
    "timeStamp": 1507549994762
  },
  "body": {
    "type": "text",
    "id": 20,
    "text": "Trevlig, vad heter du?"
  },
  "timestamp": 1507549994.762
}
```
* `number` - Numeric input
```
"1507042098159": {
  "id":"message.getname",
  "timestamp": 1507042098159,
  "header":{
     "fromId":1,
     "responsePath":"/response",
  },
  "body":{
     "type":"number",
     "text":"Trevlig, vad heter du?"
  }
}
```
* `single_select` - Single select question / answer

NOTE: Each `link` should only have one of [`appUrl`, `webUrl`, `view`]
```
"17879879179871": {
  "id":"message.hello",
  "timestamp": 17879879179871,
  "header":{
     "fromId":1,
     "responsePath":"/response"
  },
  "body":{
     "type":"single_select",
     "text":"Hej, det är jag som är Hedvig, din personliga försäkringsassistent! Vad kan jag hjälpa dig med?",
     "choices":[
        {
           "type": "selection",
           "text":"Jag vill ha en ny",
        },
        {
           "type": "link",
           "text":"I want to see my assets",
           "view": "AssetTracker",
           "appUrl": "bankid://",
           "webUrl": "http://hedvig.com"
        }
     ]
  }
}
```

List of valid `view` values:

* `AssetTracker`
* `Dashboard`

* `multiple_select` - Multiple select question / answer
```
"1507042097247": {
  "id":"message.hello",
  "timestamp": 1507042097247,
  "header":{
     "fromId":1,
     "responsePath":"/response",
  },
  "body":{
     "type":"multiple_select",
     "text":"Hej, det är jag som är Hedvig, din personliga försäkringsassistent! Vad kan jag hjälpa dig med?",
     "choices":[
        {
           "text":"Jag vill ha en ny",
           "selected":false
        },
        {
           "text":"Vill byta försäkring",
           "selected":false
        },
        {
           "text":"Varför behöver jag?",
           "selected":false
        },
        {
           "text":"Vem är du, Hedvig?",
           "selected":false
        }
     ]
  }
}
```
* `datepicker` - Select a date
```
"1507474046966":{
  "globalId":7,
  "id":"message.greetings",
  "header":{
    "messageId":7,
    "fromId":1230923,
    "responsePath":"/response",
    "timeStamp":1507474046966},
   "body":{
    "type":"date_picker",
    "id":7,
    "text":"Hej John Doe, kul att du gillar försäkring :). När är du född?",
    "date":[2002,8,25,0,0]},
   "timestamp":1507474046.966000000}
```
* `video`
```
"1507042098159": {
  "id":"message.getname",
  "timestamp": 1507042098159,
  "header":{
     "fromId":1,
     "responsePath":"/response"
  },
  "body":{
     "type":"video",
     "text":"Record a video"
  }
}
```
* `hero` - A big "hero" / "jumbotron" to showcase key (marketing?) messages
```
"1507042098159": {
  "id":"message.getname",
  "timestamp": 1507042098159,
  "header":{
     "fromId":1,
     "responsePath":"/response"
  },
  "body":{
     "type":"hero",
     "text":"I'm a hero",
     "imageUri": "http://placekitten.com/g/200/300"
  }
}
```
* `photo_upload`
```
"1507042098159": {
  "id":"message.getname",
  "timestamp": 1507042098159,
  "header":{
     "fromId":1,
     "responsePath":"/response"
  },
  "body":{
     "type":"photo_upload",
     "text":"Upload a photo"
  }
}
```
* ~`link` - A link to another view~ This is now a `single_select` type with one `choices.type` set to `link`

#### Generate a main menu (what do you want to do today) message from Hedvig

`POST /chat/main`

This will generate a new message which is available through the /messages endpoint

#### Reset a conversation

Used in claim and onboarding.

`POST /chat/reset`

#### Edit the last message from current user

On the next `GET /messages`, the backend serves messages which let the user edit their last answer.

`POST /chat/edit`

Example:

Hedvig: What's your name?

User: Kirderf

Hedvig: Hey Kirderf, where do you live?

`User clicks edit`

Hedvig: Ok, everyone makes mistakes. What's you name?

User: Fredrik

Hedvig: Ok Fredrik, where do you live?

#### Chat flow example

GET /messages
```
"1506330482691":{"id":"message.hello","header":{"fromId":1,"responsePath":"/response","timeStamp":1.506330482691E12},"body":{"type":"text","content":"Hello I am Hedvig"}}}
```

GET /messages
```
{"1506330403007":
  {"id":"message.hello","header":{"fromId":1,"responsePath":"/response","timeStamp":1.506330403007E12},"body":{"type":"multiple_choice","content":"Hej, det är jag som är Hedvig, din personliga försäkringsassistent! Vad kan jag hjälpa dig med?","links":[{"text":"Jag vill ha en ny","selected":false,"URI":"/response","param":"action.new"},{"text":"Vill byta försäkring","selected":false,"URI":"/response","param":"action.change"},{"text":"Varför behöver jag?","selected":false,"URI":"/response","param":"action.why"},{"text":"Vem är du, Hedvig?","selected":false,"URI":"/response","param":"action.who"}]}},
"1506330444463":
  {"id":"message.changecompany","header":{"fromId":1,"responsePath":"/response","timeStamp":1.506330444463E12},"body":{"type":"multiple_choice","content":"Ok, vilket bolag har du idag?","links":[{"text":"If","selected":false,"URI":"/response","param":"company.if"},{"text":"TH","selected":false,"URI":"/response","param":"company.th"},{"text":"LF","selected":false,"URI":"/response","param":"company.lf"}]}},
"1506330482691":{"id":"error","header":
  {"fromId":1,"responsePath":"/response","timeStamp":1.506330482691E12},"body":{"type":"text","content":"Oj nu blev något fel..."}}}
```

POST /message
```
To reply to a particular message just use the same id as the message you are replying to and alter the body. Time stamp and other header information is updated by the API-GATEWAY
{
  "id":"message.name",
  "header":
    {"fromId":1,"responsePath":"/response","timeStamp":1.506330482691E12},
  "body":
    {"type":"text","content":"John"}
}
```

### Authentication

For authentication we utilize the JWT tokens. The tokens should be added to the _Authorization_ header and prepended with _Bearer _.

Ex:```Authorization:Bearer AKLSJDLAJD.ASDLKJADJ.KJALJDSLA```

#### On newly started applications

Newly started application should be initiated by calling helloHedvig
endpoint and get an access token. Further calles to the backend should
include this token.


POST /helloHedvig

```
Response:
XXXX.XXXXX.XXXX
```

### Log out

`POST /logout` (authorized request)

#### BankId authentication

The bankId authentication flow mimics the flow used by BankId.  A call
to /member/bankid/auth starts the auth process. In order to know if
the auth request succeded or not the client must poll
/member/bankid/collect.

POST /member/bankid/auth

Arguments:
* ssn - (Optional) The personnumer of the authenticating member


#### BankId collect

POST /member/bankid/collect

Response:
SUCCESS
FAILIURE
.
.
