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
import * as uploadActions from "../actions/upload"
import * as statusMessageActions from "../actions/statusMessage"
import { take, takeEvery, put, select, call } from "redux-saga/effects"
import R from "ramda"

// Upload files for an item

const isLocalUrl = uri => !R.isNil(uri) && uri.startsWith("file://")

const uploadUrlFields = function*(item) {
  console.log("Uploading url fields in", item)

  let photoUrlUploadedAction
  if (isLocalUrl(item.photoUrl)) {
    console.log("Uploading local photo URL", item.photoUrl)
    yield put(
      uploadActions.upload({
        body: { uri: item.photoUrl, type: "image/jpeg" },
        successActionCreator: uploadedUrl => ({
          type: "UPLOAD_URL_SUCCEEDED",
          payload: uploadedUrl
        })
      })
    )
    photoUrlUploadedAction = yield take("UPLOAD_URL_SUCCEEDED")
  }

  let receiptUrlUploadedAction
  if (isLocalUrl(item.receiptUrl)) {
    console.log("Uploading local receipt URL", item.photoUrl)
    yield put(
      uploadActions.upload({
        body: { uri: item.receiptUrl, type: "image/jpeg" },
        successActionCreator: uploadedUrl => ({
          type: "UPLOAD_URL_SUCCEEDED",
          payload: uploadedUrl
        })
      })
    )
    receiptUrlUploadedAction = yield take("UPLOAD_URL_SUCCEEDED")
  }

  if (photoUrlUploadedAction) {
    item.photoUrl = photoUrlUploadedAction.payload
  }
  if (receiptUrlUploadedAction) {
    item.receiptUrl = receiptUrlUploadedAction.payload
  }

  return item
}

// Create and update item

const postItem = function*({ payload: item }) {
  let itemWithUploadedFields = yield call(uploadUrlFields, item)

  let id = itemWithUploadedFields.id || ""
  yield put({
    type: API,
    payload: {
      method: itemWithUploadedFields.id ? "PUT" : "POST",
      url: `/asset/${id}`,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(itemWithUploadedFields, null, 4),
      SUCCESS: ITEM_UPDATED
    }
  })
  let action = yield take([ITEM_UPDATED, API_ERROR])
  if (action.type === ITEM_UPDATED) {
    yield put(
      statusMessageActions.setStatusMessage({
        message: `${itemWithUploadedFields.title || "Pryl"} sparad i prylbanken`
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
