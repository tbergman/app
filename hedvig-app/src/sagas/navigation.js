import { takeEvery, put } from "redux-saga/effects"
import { types, userActions, assetActions } from "hedvig-redux"

const NAVIGATION_ACTIONS = [types.SWITCH_BASE, "Navigation/NAVIGATE"]

const navigationHandler = function*(action) {
  // TODO: Choose what to do based on the action
  console.log("Getting user profile data on base switch")
  yield put(userActions.getCurrentUser())
  yield put(assetActions.getAssets())
}

const navigationSaga = function*() {
  yield takeEvery(NAVIGATION_ACTIONS, navigationHandler)
}

export { navigationSaga }
