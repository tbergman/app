import { BaseNavigator } from "../components/navigation/base"

// const initialState = Navigator.router.getStateForAction(
//   Navigator.router.getActionForPathAndParams("Intro")
// )

const navReducer = (state, action) => {
  const nextState = BaseNavigator.router.getStateForAction(action, state)

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state
}

export default navReducer
