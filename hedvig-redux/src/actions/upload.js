import { UPLOAD } from "./types"

// TODO: Move url to the first argument when we start using it
export function upload({
  body,
  successActionCreator,
  url,
  headers = {},
  addToken = false
}) {
  return {
    type: UPLOAD,
    payload: {
      method: "POST",
      body,
      headers,
      addToken,
      uploadUrl: url,
      successActionCreator
    }
  }
}
