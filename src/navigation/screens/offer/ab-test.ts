import { getGroup } from 'src/components/experiment';

import { NEW_OFFER_SCREEN } from 'src/navigation/screens/new-offer';
import { OFFER_SCREEN } from 'src/navigation/screens/offer';

export const getOfferGroup = () => getGroup('offeringScreens', ['old', 'new']);

export const getOfferScreen = async () => {
  const group = await getOfferGroup();

  if (group === 'new') {
    return NEW_OFFER_SCREEN;
  } else {
    return OFFER_SCREEN;
  }
};
