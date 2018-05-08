import { UPLOAD } from "./types"

// TODO: Move url to the first argument when we start using it
export function upload({
  body,
  fileList,
  successActionCreator,
  url,
  headers = {},
  addToken = true
}) {
  return {
    type: UPLOAD,
    payload: {
      method: "POST",
      body,
      fileList,
      headers,
      addToken,
      uploadUrl: url,
      successActionCreator
    }
  }
}
