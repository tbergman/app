import { AsyncStorage } from 'react-native';

let token: string | null;
const getToken = async () => {
  if (token) {
    return token;
  }
  token = await AsyncStorage.getItem('@hedvig:token');
  return token;
};

const deleteToken = () => {
  token = null;
};

export { getToken, deleteToken };
