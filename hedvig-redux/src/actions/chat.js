import { API, LOADED_ONBOARDING } from "./types"

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
  startOnboarding
}
