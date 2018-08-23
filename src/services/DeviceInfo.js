import { Dimensions } from 'react-native';
import Config from 'react-native-config';

export function getDeviceInfo() {
  return {
    linkingUri: Config.APP_SCHEMA,
    deviceHeight: Dimensions.get('window').height,
    deviceWidth: Dimensions.get('window').width,
  };
}
