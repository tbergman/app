import {
  DEPRECATED_BANKID_COLLECT,
  DEPRECATED_BANKID_COLLECT_RESPONSE,
  DEPRECATED_BANKID_COLLECT_COMPLETE,
} from '../actions/types';

const reducer = (
  state = {
    referenceId: null,
    currentlyCollecting: false,
    tryCount: 0,
    response: null,
  },
  action,
) => {
  switch (action.type) {
    case DEPRECATED_BANKID_COLLECT:
      return Object.assign({}, state, {
        referenceId: action.payload.referenceId,
        currentlyCollecting: true,
        tryCount: state.tryCount + 1,
      });
    case DEPRECATED_BANKID_COLLECT_RESPONSE:
      return Object.assign({}, state, { response: action.payload });
    case DEPRECATED_BANKID_COLLECT_COMPLETE:
      return Object.assign({}, state, {
        referenceId: null,
        currentlyCollecting: false,
        response: null,
        tryCount: 0,
      });
    default:
      return state;
  }
};

export default reducer;
