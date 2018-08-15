import { Navigation } from 'react-native-navigation';
import { HOC } from './App';
import { getInitialStack } from './src/navigation/getInitialStack';
import { colors } from './src/style';

import { register } from './src/navigation/register';

const registerHandler = (name, componentCreator) =>
  Navigation.registerComponent(name, () => {
    const innerComponent = componentCreator();
    return HOC(innerComponent.options)(innerComponent);
  });

register(registerHandler);

Navigation.events().registerAppLaunchedListener(async () => {
  const { root, modals, overlays } = await getInitialStack();

  Navigation.setDefaultOptions({
    topBar: {
      fontFamily: 'SoRay',
    },
    bottomTab: {
      iconColor: colors.DARK_GRAY,
      selectedIconColor: colors.PURPLE,
      textColor: colors.DARK_GRAY,
      selectedTextColor: colors.PURPLE,
      fontFamily: 'SoRay',
      fontSize: 13,
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
});
