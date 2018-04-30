import {
  BANKID_SIGN,
  BANKID_SIGN_CLIENT_FAILED_TO_OPEN,
  BANKID_SIGN_COMPLETE,
  BANKID_SIGN_FAILED,
  BANKID_SIGN_CANCEL,
  BANKID_SIGN_RESPONSE,
  BANKID_SIGN_RESET,
  BANKID_COLLECT,
  BANKID_COLLECT_RESPONSE,
  BANKID_COLLECT_COMPLETE,
  BANKID_COLLECT_FAILED,
  BANKID_COLLECT_CANCEL,
  BANKID_COLLECT_RESET,
  BANKID_DIALOG_SHOWN,
  BANKID_DIALOG_DISMISSED,
  BANKID_COLLECT_PREPARE,
} from './actions';

const initialSignState = {
  isCurrentlySigning: false,
  hasClientFailedToOpen: false,
  response: {
    orderRef: null,
    autoStartToken: null,
  },
};

const initialCollectState = {
  isCurrentlyCollecting: false,
  tryCount: 0,
  orderRef: null,
  response: {
    orderRef: null,
    status: null,
    hintCode: null,
  },
};

export const bankIdReducer = (
  state = {
    isDialogOpen: false,
    sign: initialSignState,
    collect: initialCollectState,
  },
  action,
) => {
  switch (action.type) {
    case BANKID_SIGN:
      return {
        ...state,
        sign: {
          ...state.sign,
          isCurrentlySigning: true,
        },
      };
    case BANKID_SIGN_COMPLETE:
      return {
        ...state,
        sign: {
          ...state.sign,
          isCurrentlySigning: false,
        },
      };
    case BANKID_SIGN_FAILED:
      return {
        ...state,
        sign: {
          ...state.sign,
          response: {
            ...state.sign.response,
            status: state.sign.response.status || 'failed',
            errorCode: state.sign.response.errorCode || 'unknown',
          },
        },
      };
    case BANKID_SIGN_CANCEL:
      return {
        ...state,
        sign: {
          ...state.sign,
          isCurrentlySigning: false,
        },
      };
    case BANKID_SIGN_CLIENT_FAILED_TO_OPEN:
      return {
        ...state,
        sign: {
          ...state.sign,
          hasClientFailedToOpen: action.payload.hasClientFailedToOpen,
        },
      };
    case BANKID_SIGN_RESPONSE:
      return {
        ...state,
        sign: {
          ...state.sign,
          response: action.payload,
        },
      };
    case BANKID_SIGN_RESET:
      return {
        ...state,
        sign: initialSignState,
      };
    case BANKID_COLLECT:
      return {
        ...state,
        collect: {
          ...state.collect,
          isCurrentlyCollecting: true,
          tryCount: state.collect.tryCount + 1,
          orderRef: action.payload.orderRef,
        },
      };
    case BANKID_COLLECT_PREPARE:
      return {
        ...state,
        collect: {
          ...state.collect,
          orderRef: action.payload.orderRef,
        },
      };
    case BANKID_COLLECT_RESPONSE:
      return {
        ...state,
        collect: {
          ...state.collect,
          response: action.payload,
        },
      };
    case BANKID_COLLECT_COMPLETE:
      return {
        ...state,
        collect: {
          ...state.collect,
          isCurrentlyCollecting: false,
          tryCount: 0,
          orderRef: null,
        },
      };
    case BANKID_COLLECT_FAILED:
      return {
        ...state,
        collect: {
          ...state.collect,
          isCurrentlyCollecting: false,
          tryCount: 0,
          orderRef: null,
          response: {
            ...state.collect.response,
            status: state.collect.response.status || 'failed',
            errorCode: state.collect.response.errorCode || 'unknown',
          },
        },
      };
    case BANKID_COLLECT_CANCEL:
      return {
        ...state,
        collect: {
          ...state.collect,
          isCurrentlyCollecting: false,
          tryCount: 0,
          orderRef: null,
        },
      };
    case BANKID_COLLECT_RESET:
      return {
        ...state,
        collect: initialCollectState,
      };
    case BANKID_DIALOG_SHOWN:
      return {
        ...state,
        isDialogOpen: true,
      };
    case BANKID_DIALOG_DISMISSED:
      return {
        ...state,
        isDialogOpen: false,
      };
    default:
      return state;
  }
};
