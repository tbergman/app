import { AsyncStorage } from 'react-native'
import Config from '@hedviginsurance/react-native-config'

import { Store } from 'src/setupApp'
import { setLayout, getMarketingLayout } from 'src/navigation/layout'
import { Mutation, MutationToLogoutResolver } from 'src/graphql/types';

const logoutUser = async () => {
  const token = await AsyncStorage.getItem('@hedvig:token');
  await fetch(`${Config.API_BASE_URL}/logout`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
  });
};

const logout: MutationToLogoutResolver<Mutation, boolean> = async () => {
  await logoutUser();
  Store.dispatch({ type: 'DELETE_TOKEN' });
  Store.dispatch({ type: 'DELETE_TRACKING_ID' });
  Store.dispatch({ type: 'AUTHENTICATE' });
  await AsyncStorage.removeItem('@hedvig:alreadySeenMarketingCarousel');
  setLayout(getMarketingLayout());
  return true;
}

export { logout }
