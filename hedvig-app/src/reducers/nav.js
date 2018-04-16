import BaseNavigator from '../components/navigation/base-navigator/BaseNavigator';
import { NavigationActions } from 'react-navigation';

const initialState = BaseNavigator.router.getStateForAction(
  NavigationActions.init(),
);

const navReducer = (state = initialState, action) => {
  const nextState = BaseNavigator.router.getStateForAction(action, state);
  return nextState || state;
};

export default navReducer;
