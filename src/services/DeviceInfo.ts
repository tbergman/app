import { Dimensions } from 'react-native';
import Config from '@hedviginsurance/react-native-config';
import DeviceInfo from 'react-native-device-info'

const getDeviceInfo = () => ({
  linkingUri: Config.APP_SCHEME,
  model: DeviceInfo.getDeviceId(),
  id: DeviceInfo.getUniqueID()
});

export { getDeviceInfo };
