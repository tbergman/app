import { take, takeEvery, put, all } from "redux-saga/effects"

// TODO: Move to actions
const message = content => {
  return { type: "MESSAGE", payload: { content } }
}

function* onboardingSaga() {
  yield put(message("Hi there, I'm Hedvig! How old are you?"))
  const ageResponse = yield take("MESSAGE")
  const age = parseInt(ageResponse.payload.content, 10)
  if (age > 18) {
    yield put(message(`You're ${age}, that's over 18!`))
  } else {
    yield put(message(`You're ${age}, that means you're a kid!`))
  }
}

function* watchOnboarding() {
  yield takeEvery("START_ONBOARDING", onboardingSaga)
}

function* printMessageContent() {
  yield takeEvery("MESSAGE", function*(messageAction) {
    const { payload: { content } } = messageAction
    console.log("Message:", content)
  })
}

export default function* rootSaga() {
  yield all([watchOnboarding(), printMessageContent()])
}
