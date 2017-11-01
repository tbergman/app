import { API, LOADED_CASHBACK_ALTERNATIVES, UPDATE_CASHBACK } from "./types"

export function getCashbackAlternatives() {
  return {
    type: API,
    payload: {
      url: "/cashback/options",
      method: "GET",
      SUCCESS: LOADED_CASHBACK_ALTERNATIVES
    }
  }
}

export function updateCashback(selectedCashback) {
  return {
    type: UPDATE_CASHBACK,
    payload: selectedCashback
  }
}
