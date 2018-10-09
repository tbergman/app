import { Platform } from 'react-native';
import { colors } from '@hedviginsurance/brand';

import {
  SIGN_BUTTON,
  CHAT_BUTTON,
} from 'src/navigation/screens/new-offer/buttons';

export const NEW_OFFER_OPTIONS = {
  layout: {
    backgroundColor: colors.BLACK_PURPLE,
  },
  popGesture: false,
  topBar: {
    drawBehind: Platform.select({
      ios: false,
      android: true,
    }),
    visible: Platform.select({
      ios: true,
      android: false,
    }),
    title: {
      text: '',
      color: 'white',
    },
    subtitle: {
      text: '',
      color: 'white',
    },
    background: {
      color: colors.BLACK_PURPLE,
    },
    leftButtons: Platform.select({
      ios: [CHAT_BUTTON],
      android: [],
    }),
    rightButtons: Platform.select({
      ios: [SIGN_BUTTON],
      android: [CHAT_BUTTON, SIGN_BUTTON],
    }),
  },
  statusBar: {
    visible: true,
    style: 'light',
    drawBehind: false,
  },
};
