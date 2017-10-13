import { API, LOADED_USER } from "./types"

export function registerPushToken(pushToken) {
  let body = {
    token: pushToken
  }
  return {
    type: API,
    payload: {
      url: "/push-token",
      method: "POST",
      body: JSON.stringify(body, null, 4),
      SUCCESS: "REGISTERED_PUSH_TOKEN"
    }
  }
}
