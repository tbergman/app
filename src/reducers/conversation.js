import { CONVERSATION_INTENT } from '../actions/conversation';

export default (state = {}, action) => {
  switch (action.type) {
    case CONVERSATION_INTENT:
      return Object.assign({}, state, {
        intent: action.payload.intent,
      });
    default:
      return state;
  }
};
