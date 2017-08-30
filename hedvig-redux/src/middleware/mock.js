import { MOCK } from "../actions/mock/types"

const mockMiddleware = ({ dispatch }) => next => action => {
  if (action.type !== MOCK) {
    return next(action)
  }

  dispatch({ type: action.payload.SUCCESS })
}

export default mockMiddleware
