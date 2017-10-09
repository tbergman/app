import { UPLOAD } from "./types"

export function upload(info, successActionCreator) {
  return {
    type: UPLOAD,
    payload: {
      method: "POST",
      body: info,
      successActionCreator
    }
  }
}
