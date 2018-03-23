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

import { authenticateSaga, validateTokenSaga } from "./authenticate"
import { apiSaga } from "./api"
import {
  sendChatResponseSaga,
  pollMessagesSaga,
  downloadAvatarSaga,
  resetConversationSaga,
  editLastResponseSaga,
  getInsuranceWithMessagesSaga,
  startWebChatSaga
} from "./chat"
import { uploadSaga } from "./upload"
import { updateCashbackSaga } from "./cashback"
import { handleDialogSaga } from "./dialog"
import { collectSaga } from "./bankid"
import { handleCheckoutSaga } from "./offer"
import { handleEventSaga } from "./events"
import { addListenerSaga } from "./listener"
import runner from "./sagaRunner"
import { startPaymentSaga, finalizePaymentSaga } from "./payment";

const root = (additionalSagas = [], raven) =>
  function* rootSaga() {
    yield runner([
      authenticateSaga,
      validateTokenSaga,
      apiSaga,
      sendChatResponseSaga,
      pollMessagesSaga,
      downloadAvatarSaga,
      resetConversationSaga,
      editLastResponseSaga,
      getInsuranceWithMessagesSaga,
      uploadSaga,
      updateCashbackSaga,
      collectSaga,
      handleDialogSaga,
      handleCheckoutSaga,
      handleEventSaga,
      addListenerSaga,
      startWebChatSaga,
      startPaymentSaga,
      finalizePaymentSaga,
      ...additionalSagas
    ],
    raven)
  }

export const rootSaga = root
