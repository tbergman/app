import { getGroup } from 'src/components/experiment';

import { NEW_OFFER_SCREEN } from 'src/navigation/screens/new-offer';
import { OFFER_SCREEN } from 'src/navigation/screens/offer';

export enum OFFER_GROUPS {
  OLD = 'old',
  NEW = 'new',
}

export const getOfferGroup = () =>
  getGroup('offeringScreens', [OFFER_GROUPS.OLD, OFFER_GROUPS.NEW]);

export const getOfferScreen = async () => {
  const group = await getOfferGroup();

  if (group === OFFER_GROUPS.NEW) {
    return {
      group,
      screen: NEW_OFFER_SCREEN,
    };
  } else {
    return {
      group,
      screen: OFFER_SCREEN,
    };
  }
};
