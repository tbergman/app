import { API, LOADED_DASHBOARD } from "./types"

export function getDashboard() {
  return {
    type: API,
    payload: {
      url: "/me/insurance",
      method: "GET",
      SUCCESS: LOADED_DASHBOARD
    }
  }
}

export default {
  getDashboard
}
