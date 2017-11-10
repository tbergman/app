import { take, takeEvery, put, select } from "redux-saga/effects"
import { delay } from "redux-saga"
import { UPLOAD, UPLOAD_STARTED, UPLOAD_SUCCEEDED } from "../actions/types"
import { upload } from "../services/Upload"
const uuidv4 = require("uuid/v4")

const UPLOAD_URL = "http://hedvig-upload-test.s3-eu-west-1.amazonaws.com"

const uploadHandler = function*(action) {
  if (action.payload.addToken) {
    const state = yield select()
    const token = state.authentication.token
    action.payload.headers.Authorization = `Bearer ${token}`
  }

  let { body: { uri, type, fileExtension = "jpg" } } = action.payload
  let formData = new FormData()
  formData.append("key", `${uuidv4()}.${fileExtension}`) // This has to come BEFORE `file` because xhr is lol
  formData.append("file", {
    uri,
    type
  })
  action.payload.body = formData
  try {
    yield put({ type: UPLOAD_STARTED, payload: action.payload })
    let response = yield upload(
      action.payload.uploadUrl || UPLOAD_URL,
      action.payload,
      progress => {
        console.log(
          "Upload progress",
          Math.round(progress.loaded / progress.total * 100),
          "%"
        )
      }
    )
    console.log("Upload succeeded", response)
    let uploadedUrl = response.target.responseHeaders.Location
    // DEBUG
    // yield delay(5000)
    yield put({
      type: UPLOAD_SUCCEEDED,
      payload: Object.assign({}, action.payload, { uploadedUrl })
    })
    if (action.payload.successActionCreator) {
      yield put(action.payload.successActionCreator(uploadedUrl))
    }
  } catch (e) {
    console.error("Upload failed", e)
  }
}

const uploadSaga = function*() {
  yield takeEvery(UPLOAD, uploadHandler)
}

export { uploadSaga }
