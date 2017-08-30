import { API, LOADED_DASHBOARD, CREATED_CLAIM } from "./types"

export function getDashboard() {
  return {
    type: API,
    payload: {
      url: "/insurance",
      method: "GET",
      SUCCESS: LOADED_DASHBOARD
    }
  }
}

export function createClaim() {
  return {
    type: API,
    payload: {
      url: "/claim",
      method: "POST",
      SUCCESS: CREATED_CLAIM
    }
  }
}

export default {
  getDashboard,
  createClaim
}
