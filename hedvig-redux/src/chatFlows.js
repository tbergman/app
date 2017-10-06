/* global store hedvigRedux */

/*
Paste these into the Chrome console. They rely on `store` and `hedvigRedux` being global.
*/

async function authenticate() {
  store.dispatch({
    type: hedvigRedux.types.AUTHENTICATE,
    payload: { ssn: Math.floor(Math.random() * 100000).toString() }
  })
}

async function getMessages() {
  store.dispatch(hedvigRedux.chatActions.getMessages())
  await new Promise(resolve => setTimeout(resolve, 1000))
}

async function selectFirstOption() {
  let message = store.getState().chat.messages[0]
  store.dispatch(
    hedvigRedux.chatActions.selectChoice(message, message.body.links[0])
  )
  store.dispatch(
    hedvigRedux.chatActions.sendChatResponse(store.getState().chat.messages[0])
  )
  await new Promise(resolve => setTimeout(resolve, 1000))
}

async function sendTextResponse() {
  let lastMessage = store.getState().chat.messages.slice(-1).pop()
  store.dispatch(
    hedvigRedux.chatActions.sendChatResponse(lastMessage, {
      type: "text",
      content: "Pascal"
    })
  )
  await new Promise(resolve => setTimeout(resolve, 1000))
}

async function main() {
  await authenticate()
  await getMessages()
  await selectFirstOption()
  await sendTextResponse()
  console.log(store.getState().chat.messages)
}
main()
