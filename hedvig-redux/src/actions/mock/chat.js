import { MOCK, MOCK_NEXT_CHAT_MESSAGE_VISIBLE } from "./types"

export function displayNextMessage() {
  return {
    type: MOCK,
    payload: {
      SUCCESS: MOCK_NEXT_CHAT_MESSAGE_VISIBLE
    }
  }
}

export default {
  displayNextMessage
}
