import {
  API,
  UPDATE_ITEM,
  ITEM_UPDATED,
  GET_ASSETS,
  LOADED_ASSETS
} from "../actions/types"
import { baseURL } from "../services/environment"
import * as assetActions from "../actions/assetTracker"
import { take, takeEvery, put, select } from "redux-saga/effects"


// Create and update item

const postItem = function*({ payload: item }) {
  let id = item.id || ""
  yield put({
    type: API,
    payload: {
      method: item.id ? "PUT" : "POST",
      url: `${baseURL}/asset/${id}`,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item, null, 4),
      SUCCESS: ITEM_UPDATED
    }
  })
  let success = yield take(ITEM_UPDATED)
  console.log("Item updated response payload:", success.payload)
  yield put(assetActions.getAssets())
}

const getAssets = function*() {
  yield put({
    type: API,
    payload: {
      method: "GET",
      url: `${baseURL}/insurance`,
      headers: { "Content-Type": "application/json" },
      body: null,
      SUCCESS: LOADED_ASSETS
    }
  })
}

const updateItemSaga = function*() {
  yield takeEvery(UPDATE_ITEM, postItem)
}

const getAssetsSaga = function*() {
  yield takeEvery(GET_ASSETS, getAssets)
}

export { updateItemSaga, getAssetsSaga }
