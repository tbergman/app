import { Dimensions } from 'react-native';
import { schemaUri } from '../constants';

export function getDeviceInfo() {
  return {
    linkingUri: schemaUri,
    deviceHeight: Dimensions.get('window').height,
    deviceWidth: Dimensions.get('window').width,
  };
}
