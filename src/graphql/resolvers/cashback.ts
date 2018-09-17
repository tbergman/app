import { getUser } from './user'
import { Cashback, QueryToCashbackResolver, Query } from '../types';

const cashback: QueryToCashbackResolver<Query, Cashback> = async () => {
  const user = await getUser();
  return {
    name: user.selectedCashback,
    imageUrl: user.selectedCashbackImageUrl,
  };
};

export { cashback }
