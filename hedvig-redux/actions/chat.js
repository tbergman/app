import {
  API,
  LOADED_MESSAGES,
  LOADED_ONBOARDING,
  CHOICE_SELECTED,
  SET_RESPONSE_VALUE,
  SEND_CHAT_RESPONSE,
  API_AND_NAVIGATE_TO_CHAT,
  LOADED_AVATARS,
  RESET_CONVERSATION,
  EDIT_LAST_RESPONSE,
} from './types';

export const GET_MESSAGES_URL = '/messages';

export function getMessages({ intent = null } = {}) {
  // `intent` is used to start the right conversation on the backend
  // Defaults to onboarding when no intent is given
  // intent = login || onboarding
  const paramIntent = intent ? `&intent=${encodeURIComponent(intent)}` : '';
  return {
    type: API,
    payload: {
      url: `${GET_MESSAGES_URL}?timestamp=${Date.now()}${paramIntent}`,
      method: 'GET',
      SUCCESS: LOADED_MESSAGES,
    },
  };
}

export function startOnboarding() {
  return {
    type: API,
    payload: {
      url: '/onboarding',
      method: 'POST',
      SUCCESS: LOADED_ONBOARDING,
    },
  };
}

export function resetConversation() {
  return {
    type: RESET_CONVERSATION,
  };
}

export function editLastResponse() {
  return {
    type: EDIT_LAST_RESPONSE,
  };
}

export function selectChoice(message, choice) {
  return {
    type: CHOICE_SELECTED,
    payload: {
      message,
      choice,
    },
  };
}

export function setResponseValue(message, value) {
  return {
    type: SET_RESPONSE_VALUE,
    payload: {
      message,
      value,
    },
  };
}

export function sendChatResponse(message, bodyOverride = {}) {
  return {
    type: SEND_CHAT_RESPONSE,
    payload: {
      message,
      bodyOverride,
    },
  };
}

export function apiAndNavigateToChat(apiPayload) {
  return {
    type: API_AND_NAVIGATE_TO_CHAT,
    payload: apiPayload,
  };
}

export function getAvatars() {
  return {
    type: API,
    payload: {
      url: '/avatars',
      method: 'GET',
      body: null,
      SUCCESS: LOADED_AVATARS,
    },
  };
}
