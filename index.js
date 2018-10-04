import { Navigation } from 'react-native-navigation';
import { YellowBox } from 'react-native';

import { HOC } from './App';
import { setInitialLayout } from './src/navigation/layout';
import { register } from './src/navigation/register';

import { setupPushNotifications } from './src/setupPushNotifications';

YellowBox.ignoreWarnings(['constantsToExport']);

const registerHandler = (name, componentCreator) =>
  Navigation.registerComponent(name, () => {
    const innerComponent = componentCreator();
    return HOC(innerComponent.options)(innerComponent);
  });

register(registerHandler);

Navigation.events().registerAppLaunchedListener(async () => {
  await setInitialLayout();
  setupPushNotifications();
});
