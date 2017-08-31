import { CREATED_CLAIM } from "../actions/types"
import { MOCK } from "../actions/mock/types"
import { getClaimMessages } from "../actions/mock/chat"

const mockMiddleware = ({ dispatch }) => next => action => {
  if (action.type === MOCK) {
    dispatch({ type: action.payload.SUCCESS })
  } else if (action.type === CREATED_CLAIM) {
    dispatch(getClaimMessages())
  } else {
    return next(action)
  }
}

export default mockMiddleware
