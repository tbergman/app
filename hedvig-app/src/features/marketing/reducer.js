import { MARKETING_SET_ACTIVE_SCREEN } from './actions';

export const marketingReducer = (
  state = {
    activeMarketingScreenIndex: 0,
  },
  action,
) => {
  switch (action.type) {
    case MARKETING_SET_ACTIVE_SCREEN:
      return {
        ...state,
        activeMarketingScreenIndex: action.payload.index,
      };
    default:
      return state;
  }
};
