import { insurance } from './insurance';
import { cashback } from './cashback';
import { logout } from './logout';
import { Resolver } from '../types';
import { IResolvers } from 'graphql-tools';

const resolvers: IResolvers<Resolver> = {
  Query: () => ({
    insurance,
    cashback,
  }),
  Mutation: () => ({
    logout,
  }),
};

export { resolvers };
