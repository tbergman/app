import { API } from '../types';
import {
  MOCK,
  MOCK_NEXT_CHAT_MESSAGE_VISIBLE,
  MOCK_LOADED_CLAIM_MESSAGES,
} from './types';

export function displayNextMessage() {
  return {
    type: MOCK,
    payload: {
      SUCCESS: MOCK_NEXT_CHAT_MESSAGE_VISIBLE,
    },
  };
}

export function getClaimMessages() {
  return {
    type: API,
    payload: {
      url: '/mock-messages/claim',
      method: 'GET',
      SUCCESS: MOCK_LOADED_CLAIM_MESSAGES,
    },
  };
}

export default {
  displayNextMessage,
};
