import { getUser } from './user'
import { Cashback, QueryToCashbackResolver, Query } from '../types';

const cashback: QueryToCashbackResolver<Query, Cashback> = async (_root, _args, { getToken }) => {
  const token = await getToken()
  const user = await getUser(token)
  return {
    name: user.selectedCashback,
    imageUrl: user.selectedCashbackImageUrl,
  };
};

export { cashback }
