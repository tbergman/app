import { STATUS_MESSAGE } from "./types"

export function setStatusMessage({message=null, warning=null, error=null}) {
  return {
    type: STATUS_MESSAGE,
    payload: {
      message,
      warning,
      error
    },
  }
}
