import { AsyncStorage } from 'react-native';
import { Navigation } from 'react-native-navigation';

import { SEEN_MARKETING_CAROUSEL_KEY, IS_VIEWING_OFFER } from '../constants';
import { Store } from '../setupApp';

import { insuranceActions } from '../../hedvig-redux';
import { colors } from '../style';

import { CHAT_SCREEN } from './screens/chat';
import { MARKETING_SCREEN } from './screens/marketing';
import { OFFER_SCREEN } from './screens/offer';
import { DASHBOARD_SCREEN } from './screens/dashboard';
import { PROFILE_SCREEN } from './screens/profile';
import { FAB_COMPONENT } from './components/fab';

export const getMarketingLayout = () => ({
  root: {
    stack: {
      children: [MARKETING_SCREEN],
    },
  },
});

export const getMainLayout = () => ({
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
  overlays: [
    {
      component: {
        name: FAB_COMPONENT.name,
        options: {
          layout: {
            backgroundColor: 'transparent',
          },
          overlay: {
            interceptTouchOutside: false,
          },
        },
      },
    },
  ],
});

export const getChatLayout = () => ({
  root: {
    stack: {
      children: [CHAT_SCREEN],
    },
  },
});

export const getOfferLayout = () => ({
  modals: [
    {
      stack: {
        children: [OFFER_SCREEN],
      },
    },
  ],
  ...getChatLayout(),
});

export const getInitialLayout = async () => {
  const alreadySeenMarketingCarousel = await AsyncStorage.getItem(
    SEEN_MARKETING_CAROUSEL_KEY,
  );

  if (!alreadySeenMarketingCarousel) {
    return getMarketingLayout();
  }

  Store.dispatch(insuranceActions.getInsurance());

  return new Promise((resolve) => {
    const unsubscribe = Store.subscribe(async () => {
      const { insurance } = Store.getState();

      if (!insurance.status) return;

      unsubscribe();

      if (
        ['ACTIVE', 'INACTIVE_WITH_START_DATE', 'INACTIVE'].includes(
          insurance.status,
        )
      ) {
        return resolve(getMainLayout());
      }

      const isViewingOffer = await AsyncStorage.getItem(IS_VIEWING_OFFER);

      if (isViewingOffer) {
        return resolve(getOfferLayout());
      }

      return resolve(getChatLayout());
    });
  });
};

export const setLayout = ({ root, modals, overlays }) => {
  Navigation.setDefaultOptions({
    topBar: {
      animate: false,
      title: {
        fontFamily: 'CircularStd-Book',
      },
      leftButtons: {
        fontFamily: 'CircularStd-Book',
      },
      rightButtons: {
        fontFamily: 'CircularStd-Book',
      },
    },
    statusBar: {
      visible: true,
      drawBehind: false,
    },
    bottomTab: {
      iconColor: colors.DARK_GRAY,
      selectedIconColor: colors.PURPLE,
      textColor: colors.DARK_GRAY,
      selectedTextColor: colors.PURPLE,
      fontFamily: 'CircularStd-Book',
      fontSize: 13,
    },
    layout: {
      backgroundColor: 'white',
    },
  });

  Navigation.setRoot({
    root,
  });

  if (modals) {
    modals.forEach((modal) => Navigation.showModal(modal));
  }

  if (overlays) {
    overlays.forEach((overlay) => Navigation.showOverlay(overlay));
  }
};

export const setInitialLayout = async () => {
  const layout = await getInitialLayout();
  setLayout(layout);
};
