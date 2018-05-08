import {
  DIALOG_MESSAGE,
  EMPTY_DIALOG_MESSAGE,
  DIALOG_CONFIRM_PRESSED,
  DIALOG_DISMISS_PRESSED,
} from './types';

export function showDialog({
  title,
  paragraph,
  confirmButtonTitle,
  dismissButtonTitle,
  onConfirm,
  onDismiss,
}) {
  return {
    type: DIALOG_MESSAGE,
    payload: {
      title,
      paragraph,
      confirmButtonTitle,
      dismissButtonTitle,
      onConfirm,
      onDismiss,
    },
  };
}

export function emptyDialog() {
  return {
    type: EMPTY_DIALOG_MESSAGE,
  };
}

export function confirmButtonPressed() {
  return {
    type: DIALOG_CONFIRM_PRESSED,
  };
}

export function dismissButtonPressed() {
  return {
    type: DIALOG_DISMISS_PRESSED,
  };
}
