import { AsyncStorage } from 'react-native';
import Config from '@hedviginsurance/react-native-config';

import { CUSTOM_CONFIG } from 'src/constants';

export const patchCustomConfig = () => {
  AsyncStorage.getItem(CUSTOM_CONFIG).then((customConfig) => {
    if (customConfig) {
      const parsedCustomConfig = JSON.parse(customConfig);

      Object.keys(parsedCustomConfig).map((key) => {
        Object.defineProperty(Config, key, {
          get: () => {
            return parsedCustomConfig[key];
          },
        });
      });
    }
  });
};
