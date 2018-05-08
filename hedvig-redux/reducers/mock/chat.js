import { CREATED_CLAIM, LOADED_ONBOARDING } from '../../actions/types';
import { MOCK_NEXT_CHAT_MESSAGE_VISIBLE } from '../../actions/mock/types';

const reducer = (state = { numVisibleMessages: 1 }, action) => {
  switch (action.type) {
    case LOADED_ONBOARDING:
    case CREATED_CLAIM:
      return Object.assign({}, state, {
        numVisibleMessages: state.numVisibleMessages + 1,
      });
    case MOCK_NEXT_CHAT_MESSAGE_VISIBLE:
      return Object.assign({}, state, {
        numVisibleMessages: state.numVisibleMessages + 1,
      });
    default:
      return state;
  }
};

export default reducer;
