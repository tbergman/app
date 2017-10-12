import { API, LOADED_USER } from "./types"

export function getCurrentUser() {
  return {
    type: API,
    payload: {
      url: "/member/me",
      method: "GET",
      SUCCESS: LOADED_USER
    }
  }
}
