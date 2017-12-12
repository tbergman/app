import { API, UPDATE_CASHBACK } from "../actions/types"
import * as cashbackActions from "../actions/cashback"
import * as userActions from "../actions/user"
import { take, takeEvery, put, select } from "redux-saga/effects"
import { baseURL } from "../services/environment"

const updateCashback = function*({ payload: selectedItem }) {
  // Use this to return the whole cashbackAlternatives list with selected: true
  // only one the selected item
  // let state = yield select()
  // let cashbackAlternatives = state.cashback.alternatives.map(alternative => {
  //   alternative.selected = selectedItem.id === alternative.id
  //   return alternative
  // })
  yield put({
    type: API,
    payload: {
      method: "POST",
      url: `/cashback?optionId=${selectedItem.id}`,
      // headers: { "Content-Type": "application/json" },
      // body: JSON.stringify(cashbackAlternatives, null, 4),
      SUCCESS: "UPDATED_CASHBACK"
    }
  })
  let success = yield take("UPDATED_CASHBACK")
  yield put(cashbackActions.getCashbackAlternatives())
  // Also get user profile as this includes some selected cashback info
  yield put(userActions.getCurrentUser())
}

const updateCashbackSaga = function*() {
  yield takeEvery(UPDATE_CASHBACK, updateCashback)
}

export { updateCashbackSaga }
