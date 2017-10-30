import {
  API,
  API_ERROR,
  UPDATE_ITEM,
  ITEM_UPDATED,
  DELETE_ITEM,
  ITEM_DELETED,
  GET_ASSETS,
  LOADED_ASSETS
} from "../actions/types"
import { baseURL } from "../services/environment"
window.baseURL = baseURL
import * as assetActions from "../actions/assetTracker"
import * as statusMessageActions from "../actions/statusMessage"
import { take, takeEvery, put, select } from "redux-saga/effects"

// Create and update item

const postItem = function*({ payload: item }) {
  let id = item.id || ""
  yield put({
    type: API,
    payload: {
      method: item.id ? "PUT" : "POST",
      url: `/asset/${id}`,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item, null, 4),
      SUCCESS: ITEM_UPDATED
    }
  })
  let action = yield take([ITEM_UPDATED, API_ERROR])
  if (action.type === ITEM_UPDATED) {
    yield put(
      statusMessageActions.setStatusMessage({
        message: `${item.title || "Pryl"} sparad i prylbanken`
      })
    )
  } else if (action.type === API_ERROR) {
    yield put(
      statusMessageActions.setStatusMessage({
        error: `Misslyckades att spara i prylbanken`
      })
    )
  }
  console.log("Item updated response payload:", action.payload)
  yield put(assetActions.getAssets())
}

const deleteItem = function*({ payload: item }) {
  let id = item.id || ""
  yield put({
    type: API,
    payload: {
      method: "DELETE",
      url: `/asset/${id}`,
      headers: { "Content-Type": "application/json" },
      body: null,
      SUCCESS: ITEM_DELETED
    }
  })
  let action = yield take([ITEM_UPDATED, API_ERROR])
  if (action.type === ITEM_UPDATED) {
    yield put(
      statusMessageActions.setStatusMessage({
        message: `${item.title || "Pryl"} borttagen ur prylbanken`
      })
    )
  } else if (action.type === API_ERROR) {
    yield put(
      statusMessageActions.setStatusMessage({
        error: `Misslyckades att ta bort pryl`
      })
    )
  }
  console.log("Item updated response payload:", action.payload)
  yield put(assetActions.getAssets())
}

const getAssets = function*() {
  yield put({
    type: API,
    payload: {
      method: "GET",
      url: `/asset/`,
      headers: { "Content-Type": "application/json" },
      body: null,
      SUCCESS: LOADED_ASSETS
    }
  })
}

const updateItemSaga = function*() {
  yield takeEvery(UPDATE_ITEM, postItem)
}

const deleteItemSaga = function*() {
  yield takeEvery(DELETE_ITEM, deleteItem)
}

const getAssetsSaga = function*() {
  yield takeEvery(GET_ASSETS, getAssets)
}

export { updateItemSaga, deleteItemSaga, getAssetsSaga }
