import {
  BANKID_COLLECT,
  BANKID_COLLECT_RESPONSE,
  BANKID_COLLECT_COMPLETE
} from "../actions/types"

const reducer = (
  state = {
    referenceId: null,
    currentlyCollecting: false,
    tryCount: 0,
    response: null
  },
  action
) => {
  switch (action.type) {
    case BANKID_COLLECT:
      return Object.assign({}, state, {
        referenceId: action.payload.referenceId,
        currentlyCollecting: true,
        tryCount: state.tryCount + 1
      })
    case BANKID_COLLECT_RESPONSE:
      return Object.assign({}, state, { response: action.payload })
    case BANKID_COLLECT_COMPLETE:
      return Object.assign({}, state, {
        referenceId: null,
        currentlyCollecting: false,
        response: null,
        tryCount: 0
      })
    default:
      return state
  }
}

export default reducer
