import { UPLOAD } from "./types"

// TODO: Move url to the first argument when we start using it
export function upload(info, successActionCreator, url = null) {
  return {
    type: UPLOAD,
    payload: {
      method: "POST",
      body: info,
      url,
      successActionCreator
    }
  }
}
