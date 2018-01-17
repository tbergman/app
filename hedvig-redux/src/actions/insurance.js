import { API, LOADED_INSURANCE, CREATED_CLAIM, REMOVE_PERIL, ADD_PERIL, CREATED_QUOTE } from "./types"

export function getInsurance() {
  return {
    type: API,
    payload: {
      url: "/insurance",
      method: "GET",
      SUCCESS: LOADED_INSURANCE
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

export function removePeril(peril) {
  return {
    type: REMOVE_PERIL,
    payload: {
      peril
    }
  }
}

export function addPeril(peril) {
  return {
    type: ADD_PERIL,
    payload: {
      peril
    }
  }
}

export function createQuote() {
  return {
    type: API,
    payload: {
      url: "/insurance/quote",
      method: "POST",
      SUCCESS: CREATED_QUOTE
    }
  }
}

export function sendPolicyEmail() {
  return {
    type: API,
    payload: {
      url: "insurance/email-policy",
      method: "POST",
      SUCCESS: "SENT_POLICY_EMAIL"
    },
    statusMessage: {
      message: "Policy email sent"
    }
  }
}
