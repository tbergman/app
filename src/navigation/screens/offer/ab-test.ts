import { getGroup } from 'src/components/experiment';

import { NEW_OFFER_SCREEN } from 'src/navigation/screens/new-offer';
import { OFFER_SCREEN } from 'src/navigation/screens/offer';

export enum OFFER_GROUPS {
  OLD = 'old',
  NEW = 'new',
}

const SCREENS = {
  [OFFER_GROUPS.NEW]: {
    group: OFFER_GROUPS.NEW,
    screen: NEW_OFFER_SCREEN,
  },
  [OFFER_GROUPS.OLD]: {
    group: OFFER_GROUPS.NEW,
    screen: OFFER_SCREEN,
  },
};

export const getOfferGroup = () =>
  getGroup('offeringScreens', [OFFER_GROUPS.OLD, OFFER_GROUPS.NEW]);

export const getOfferScreen = async () => {
  const group = await getOfferGroup();

  return {
    screen: SCREENS[group],
    group,
  };
};
