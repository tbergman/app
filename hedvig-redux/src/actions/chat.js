import { API, LOADED_MESSAGES, LOADED_ONBOARDING } from "./types"

export function getMessages() {
  return {
    type: API,
    payload: {
      url: "/messages",
      method: "GET",
      SUCCESS: LOADED_MESSAGES
    }
  }
}

export function startOnboarding() {
  return {
    type: API,
    payload: {
      url: "/onboarding",
      method: "POST",
      SUCCESS: LOADED_ONBOARDING
    }
  }
}
export default {
  getMessages,
  startOnboarding
}
