import { ADD_LISTENER } from './types';

export function addListener(actionType, callback) {
  return {
    type: ADD_LISTENER,
    payload: {
      actionType,
      callback,
    },
  };
}
