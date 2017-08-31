import { API, LOADED_INTRO_MESSAGES, LOADED_ONBOARDING } from "./types"

export function getIntroMessages() {
  return {
    type: API,
    payload: {
      url: "/messages/intro",
      method: "GET",
      SUCCESS: LOADED_INTRO_MESSAGES
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
  getIntroMessages,
  startOnboarding
}
