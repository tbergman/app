import {
  API,
  GET_INSURANCE,
  LOADED_INSURANCE,
  REMOVE_PERIL,
  PERIL_REMOVED,
  ADD_PERIL,
  PERIL_ADDED
} from "../actions/types"
import { baseURL } from "../services/environment"
import * as assetActions from "../actions/assetTracker"
import { take, takeEvery, put, select } from "redux-saga/effects"

const removePeril = function*({ payload: { peril } }) {
  const state = yield select();
  state.insurance.categories[0].perils[0].state = "REMOVE_REQUESTED"

  yield put({
    type: API,
    payload: {
      method: "POST",
      url: `${baseURL}/insurance/quote`,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(state, null, 4),
      SUCCESS: PERIL_REMOVED
    }
  })
  let success = yield take(PERIL_REMOVED)
  console.log("Peril removed - response payload:", success.payload)
  yield put(assetActions.getInsurance())
}

const addPeril = function*({ payload: { peril } }) {
  const state = yield select();
  state.insurance.categories[0].perils[0].state = "ADD_REQUESTED"

  yield put({
    type: API,
    payload: {
      method: "POST",
      url: `${baseURL}/insurance/quote`,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(state, null, 4),
      SUCCESS: PERIL_ADDED
    }
  })
  let success = yield take(PERIL_ADDED)
  console.log("Peril removed - response payload:", success.payload)
  yield put(assetActions.getInsurance())
}

const removeInsuranceSaga = function*() {
  yield takeEvery(REMOVE_PERIL, removePeril)
}

const addInsuranceSaga = function*() {
  yield takeEvery(ADD_PERIL, addPeril)
}

export { removeInsuranceSaga, addInsuranceSaga }
