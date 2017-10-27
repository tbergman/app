import { API } from "./types"

export function event(info) {
  return {
    type: "_____DISABLED_____API",
    // type: API,
    payload: {
      url: "/event",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(info),
      SUCCESS: "POST_EVENT_SUCCESS"
    }
  }
}
