export const CONVERSATION_INTENT = 'CONVERSATION_INTENT';

export function setConversationIntent({ intent = null }) {
  return {
    type: CONVERSATION_INTENT,
    payload: {
      intent,
    },
  };
}
