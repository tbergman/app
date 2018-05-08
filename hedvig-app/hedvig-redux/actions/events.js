import { EVENT } from "./types"

export function event(info, opts = {}) {
  return {
    type: EVENT,
    payload: {
      info,
      getMessagesAfter: opts.getMessagesAfter,
      showLoadingIndicator: opts.showLoadingIndicator
    }
  }
}
