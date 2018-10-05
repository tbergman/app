import Config from '@hedviginsurance/react-native-config';

const getUser = async (token: string) => {
  const data = await fetch(`${Config.API_BASE_URL}/member/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data.json();
};

export { getUser };
