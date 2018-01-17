import {
  API,
  REMOVE_PERIL,
  PERIL_REMOVED,
  ADD_PERIL,
  PERIL_ADDED
} from "../actions/types"
import * as insuranceActions from "../actions/insurance"
import { take, takeEvery, put, select } from "redux-saga/effects"

// Returns a pointer to the found peril in categories
const findPerilInCategories = (peril, categories) => {
  for (let ci = 0; ci < categories.length; ci++) {
    let category = categories[ci]
    let pi = category.perils.findIndex(p => p.id === peril.id)
    if (pi !== -1) {
      return category.perils[pi]
    }
  }
}

const removePeril = function*({ payload: { peril } }) {
  const state = yield select()
  let statePeril = findPerilInCategories(peril, state.insurance.categories)
  statePeril.state = "REMOVE_REQUESTED"

  yield put({
    type: API,
    payload: {
      method: "POST",
      url: `/insurance/quote`,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(state.insurance, null, 4),
      SUCCESS: PERIL_REMOVED
    }
  })
  yield take(PERIL_REMOVED)
  yield put(insuranceActions.getInsurance())
}

const addPeril = function*({ payload: { peril } }) {
  const state = yield select()
  let statePeril = findPerilInCategories(peril, state.insurance.categories)
  statePeril.state = "ADD_REQUESTED"

  yield put({
    type: API,
    payload: {
      method: "POST",
      url: `/insurance/quote`,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(state.insurance, null, 4),
      SUCCESS: PERIL_ADDED
    }
  })
  yield take(PERIL_ADDED)
  yield put(insuranceActions.getInsurance())
}

const removeInsuranceSaga = function*() {
  yield takeEvery(REMOVE_PERIL, removePeril)
}

const addInsuranceSaga = function*() {
  yield takeEvery(ADD_PERIL, addPeril)
}

export { removeInsuranceSaga, addInsuranceSaga }
