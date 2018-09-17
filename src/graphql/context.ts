import { AsyncStorage } from 'react-native'

let token: string;
const getToken = async () => {
  if (token) {
    console.log('had token, returning')
    return token
  }
  token = await AsyncStorage.getItem('@hedvig:token');
  console.log('getting token')
  return token
}

const deleteToken = () => {
  token = undefined
}

export { getToken, deleteToken }
