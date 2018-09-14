import { getUser } from './user'

const cashback = async () => {
  const user = await getUser();
  return {
    name: user.selectedCashback,
    imageUrl: user.selectedCashbackImageUrl,
  };
};

export { cashback }
