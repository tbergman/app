export const APP_STATE_CHANGE = 'APP_STATE_CHANGE';

export function appStateChange(newState) {
  return {
    type: APP_STATE_CHANGE,
    payload: newState,
  };
}
