import Config from '@hedviginsurance/react-native-config'

const getUser = async (token) => {
  const data = await fetch(`${Config.API_BASE_URL}/member/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log('got user')
  return data.json();
};

export { getUser }
