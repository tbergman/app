import { AsyncStorage } from 'react-native'
import Config from '@hedviginsurance/react-native-config'

const getUser = async () => {
  const token = await AsyncStorage.getItem('@hedvig:token');
  const data = await fetch(`${Config.API_BASE_URL}/member/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data.json();
};

export { getUser }
