import { types } from 'hedvig-redux';

export function setStatusMessage({
  message = null,
  warning = null,
  error = null,
}) {
  return {
    type: types.STATUS_MESSAGE,
    payload: {
      message,
      warning,
      error,
    },
  };
}
