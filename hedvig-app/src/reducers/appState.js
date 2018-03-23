import { AppState } from 'react-native';
import { APP_STATE_CHANGE } from '../actions/appState';

function handleAppStateChange(state, action) {
  return Object.assign({}, state, {
    lastState: state.currentState,
    currentState: action.payload,
  });
}

export default function reducer(
  state = { currentState: AppState.currentState, lastState: null },
  action,
) {
  switch (action.type) {
    case APP_STATE_CHANGE:
      return handleAppStateChange(state, action);
    default:
      return state;
  }
}
