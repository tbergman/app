import { DIALOG_MESSAGE, EMPTY_DIALOG_MESSAGE } from "./types"

export function showDialog({title=null, paragraph=null}) {
  return {
    type: DIALOG_MESSAGE,
    payload: {title, paragraph},
  }
}

export function emptyDialog() {
  return {
    type: EMPTY_DIALOG_MESSAGE
  }
}
