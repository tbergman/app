import {
  OFFER_SET_ACTIVE_SCREEN,
  PERILS_DIALOG_SHOWN,
  PERILS_DIALOG_DISMISSED,
  PERILS_SET_ACTIVE,
  PERILS_UNSET_ACTIVE,
} from './actions';

export const offerReducer = (
  state = {
    activeOfferScreenIndex: 0,
    isPerilsDialogOpen: false,
    activePeril: null,
  },
  action,
) => {
  switch (action.type) {
    case OFFER_SET_ACTIVE_SCREEN:
      return {
        ...state,
        activeOfferScreenIndex: action.payload.index,
      };
    case PERILS_DIALOG_SHOWN:
      return {
        ...state,
        isPerilsDialogOpen: true,
      };
    case PERILS_DIALOG_DISMISSED:
      return {
        ...state,
        isPerilsDialogOpen: false,
      };
    case PERILS_SET_ACTIVE:
      return {
        ...state,
        activePeril: action.payload.peril,
        activePerilCategoryTitle: action.payload.title,
      };
    case PERILS_UNSET_ACTIVE:
      return {
        ...state,
        activePeril: null,
        activePerilCategoryTitle: null,
      };
    default:
      return state;
  }
};
