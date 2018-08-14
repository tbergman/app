import { AsyncStorage } from 'react-native';
import { SEEN_MARKETING_CAROUSEL_KEY, IS_VIEWING_OFFER } from '../constants';
import { Store } from '../setupApp';

import { insuranceActions } from '../../hedvig-redux';

import { CHAT_SCREEN } from './screens/chat';
import { MARKETING_SCREEN } from './screens/marketing';
import { OFFER_SCREEN } from './screens/offer';
import { DASHBOARD_SCREEN } from './screens/dashboard';
import { PROFILE_SCREEN } from './screens/profile';

export const getMarketingStack = () => ({
  root: {
    stack: {
      children: [MARKETING_SCREEN],
    },
  },
});

export const getMainAppStack = () => ({
  root: {
    bottomTabs: {
      children: [
        {
          stack: {
            children: [DASHBOARD_SCREEN],
            options: {
              bottomTab: {
                text: 'Min hemförsäkring',
                icon: require('../../assets/icons/tab_bar/lagenhet.png'),
              },
            },
          },
        },
        {
          stack: {
            children: [PROFILE_SCREEN],
            options: {
              bottomTab: {
                text: 'Min Profil',
                icon: require('../../assets/icons/tab_bar/du_och_din_familj.png'),
              },
            },
          },
        },
      ],
    },
  },
});

export const getChatStack = () => ({
  root: {
    stack: {
      children: [CHAT_SCREEN],
    },
  },
});

export const getOfferStack = () => ({
  modals: [
    {
      stack: {
        children: [OFFER_SCREEN],
      },
    },
  ],
  ...getChatStack(),
});

export const getInitialStack = async () => {
  const alreadySeenMarketingCarousel = await AsyncStorage.getItem(
    SEEN_MARKETING_CAROUSEL_KEY,
  );

  if (!alreadySeenMarketingCarousel) {
    return getMarketingStack();
  }

  Store.dispatch(insuranceActions.getInsurance());

  return new Promise((resolve) => {
    const unsubscribe = Store.subscribe(async () => {
      const { insurance } = Store.getState();

      if (!insurance.status) return;

      unsubscribe();

      if (['ACTIVE', 'INACTIVE'].includes(insurance.status)) {
        return resolve(getMainAppStack());
      }

      const isViewingOffer = await AsyncStorage.getItem(IS_VIEWING_OFFER);

      if (isViewingOffer) {
        return resolve(getOfferStack());
      }

      return resolve(getChatStack());
    });
  });
};
