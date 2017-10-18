/* global store hedvigRedux moment */

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

async function singleSelectOption(index) {
  let message = store.getState().chat.messages.slice(-1).pop()
  store.dispatch(
    hedvigRedux.chatActions.selectChoice(message, message.body.choices[index])
  )
  store.dispatch(
    hedvigRedux.chatActions.sendChatResponse(
      store.getState().chat.messages[store.getState().chat.messages.length - 1]
    )
  )
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
    hedvigRedux.chatActions.sendChatResponse(
      lastMessage,
      Object.assign({}, lastMessage.body, {
        text: "Pascal"
      })
    )
  )
  await new Promise(resolve => setTimeout(resolve, 1000))
}

async function sendDateResponse() {
  let lastMessage = store.getState().chat.messages.slice(-1).pop()
  store.dispatch(
    hedvigRedux.chatActions.sendChatResponse(
      lastMessage,
      Object.assign({}, lastMessage.body, {
        date: moment().toISOString()
      })
    )
  )
  await new Promise(resolve => setTimeout(resolve, 1000))
}

async function bankIdCollect() {
  let lastMessage = store.getState().chat.messages.slice(-1).pop()
  store.dispatch({
    type: "API",
    payload: {
      method: "POST",
      url: `/member/bankid/collect?referenceToken=${lastMessage.body
        .referenceId}`,
      body: null
    }
  })
  await new Promise(resolve => setTimeout(resolve, 1000))
}

async function main() {
  await authenticate()
  await getMessages()

  await new Promise(resolve => setTimeout(resolve, 1000))
  await singleSelectOption(0)
  await new Promise(resolve => setTimeout(resolve, 1000))
  await singleSelectOption(0)
  await new Promise(resolve => setTimeout(resolve, 1000))
  await singleSelectOption(0)
  await new Promise(resolve => setTimeout(resolve, 1000))
  await singleSelectOption(0)
  await new Promise(resolve => setTimeout(resolve, 1000))
  await singleSelectOption(0)
  await new Promise(resolve => setTimeout(resolve, 1000))

  await bankIdCollect()

  await getMessages()
}
main()
