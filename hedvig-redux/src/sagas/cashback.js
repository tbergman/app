import {
  API,
  UPDATE_CASHBACK
} from "../actions/types"
import * as cashbackActions from "../actions/cashback"
import { take, takeEvery, put, select } from "redux-saga/effects"
import { baseURL } from "../services/environment"


const updateCashback = function*({ payload: selectedItem }) {
  let state = yield select()
  let cashbackAlternatives = state.cashback.alternatives.map(alternative => {
    alternative.selected = selectedItem.id === alternative.id
    return alternative
  })
  yield put({
    type: API,
    payload: {
      method: "POST",
      url: `/cashback/options`,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cashbackAlternatives, null, 4),
      SUCCESS: "UPDATED_CASHBACK"
    }
  })
  let success = yield take("UPDATED_CASHBACK")
  yield put(cashbackAlternatives.getCashbackAlternatives())
}

const updateCashbackSaga = function*() {
  yield takeEvery(UPDATE_CASHBACK, updateCashback)
}

export { updateCashbackSaga }
