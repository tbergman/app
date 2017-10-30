import { take, takeEvery, put, select } from "redux-saga/effects"
import { UPLOAD } from "../actions/types"
import { upload } from "../services/Upload"
const uuidv4 = require("uuid/v4")

const UPLOAD_URL = "http://hedvig-upload-test.s3-eu-west-1.amazonaws.com"

const uploadHandler = function*(action) {
  let { body: { uri, type, fileExtension = "jpg" } } = action.payload
  let formData = new FormData()
  formData.append("key", `${uuidv4()}.${fileExtension}`) // This has to come BEFORE `file` because xhr is lol
  formData.append("file", {
    uri,
    type
  })
  action.payload.body = formData
  try {
    let response = yield upload(UPLOAD_URL, action.payload, progress => {
      console.log(
        "Upload progress",
        Math.round(progress.loaded / progress.total * 100),
        "%"
      )
    })
    console.log("Upload succeeded", response)
    let uploadedUrl = response.target.responseHeaders.Location
    if (action.payload.successActionCreator) {
      yield put(action.payload.successActionCreator(uploadedUrl))
    } else {
      yield put({
        type: "UPLOAD_SUCCEEDED",
        payload: uploadedUrl
      })
    }
  } catch (e) {
    console.error("Upload failed", e)
  }
}

const uploadSaga = function*() {
  yield takeEvery(UPLOAD, uploadHandler)
}

export { uploadSaga }
