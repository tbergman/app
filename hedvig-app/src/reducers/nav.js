import BaseNavigator from "../components/navigation/base-navigator/BaseNavigator"

const initialState = BaseNavigator.router.getStateForAction(
  BaseNavigator.router.getActionForPathAndParams("Loading")
)

const navReducer = (state = initialState, action) => {
  const nextState = BaseNavigator.router.getStateForAction(action, state)

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state
}

export default navReducer
