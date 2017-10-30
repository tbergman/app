/*
IMPORTANT

We cannot declare generators as below:
function* rootSaga() {
  ...
}

Instead do:
const rootSaga = function* () {
  ...
}

This is because of a bug in babel-preset-react-native
See
https://github.com/expo/expo/issues/519
https://stackoverflow.com/questions/45155249/when-using-redux-saga-with-react-native-web-we-get-an-error-cannot-read-propert
*/

import { take, takeEvery, put, all } from "redux-saga/effects"
import { authenticateSaga } from "./authenticate"
import { apiSaga } from "./api"
import {
  sendChatResponseSaga,
  pollMessagesSaga,
  downloadAvatarSaga,
  resetConversationSaga,
  editLastResponseSaga,
  getInsuranceWithMessagesSaga
} from "./chat"
import { updateItemSaga, deleteItemSaga, getAssetsSaga } from "./assetTracker"
import { uploadSaga } from "./upload"
import { addInsuranceSaga, removeInsuranceSaga } from "./insurance"
import { handleStatusMessage } from "./statusMessage"
import { updateCashbackSaga } from "./cashback"
import { handleDialogSaga } from "./dialog"
import { collectSaga } from "./bankid"
import runner from "./sagaRunner"

// TODO: Move to actions
const message = content => {
  return { type: "MESSAGE", payload: { content } }
}

const onboardingSaga = function*() {
  yield put(message("Hi there, I'm Hedvig! How old are you?"))
  const ageResponse = yield take("MESSAGE")
  const age = parseInt(ageResponse.payload.content, 10)
  if (age > 18) {
    yield put(message(`You're ${age}, that's over 18!`))
  } else {
    yield put(message(`You're ${age}, that means you're a kid!`))
  }
}

const watchOnboarding = function*() {
  yield takeEvery("START_ONBOARDING", onboardingSaga)
}

const printMessageContent = function*() {
  yield takeEvery("MESSAGE", function*(messageAction) {
    const { payload: { content } } = messageAction
    console.log("Message:", content)
  })
}

const root = (additionalSagas = []) =>
  function* rootSaga() {
    yield runner([
      watchOnboarding,
      printMessageContent,
      authenticateSaga,
      apiSaga,
      sendChatResponseSaga,
      pollMessagesSaga,
      downloadAvatarSaga,
      resetConversationSaga,
      editLastResponseSaga,
      getInsuranceWithMessagesSaga,
      updateItemSaga,
      deleteItemSaga,
      getAssetsSaga,
      uploadSaga,
      addInsuranceSaga,
      removeInsuranceSaga,
      handleStatusMessage,
      updateCashbackSaga,
      collectSaga,
      handleDialogSaga,
      ...additionalSagas
    ])
  }

export const rootSaga = root
