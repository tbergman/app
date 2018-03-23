import { insuranceActions } from 'hedvig-redux';
import { navigateTo } from './Navigation';

export function createClaimAndNavigateToChat(dispatch) {
  dispatch(insuranceActions.createClaim());
  navigateTo(dispatch, 'Chat');
}
