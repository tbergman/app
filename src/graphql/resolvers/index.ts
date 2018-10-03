import { insurance } from './insurance';
import { cashback } from './cashback';
import { logout } from './logout';
import { offerClosed } from './offer-closed';
import { Resolver } from '../types';

const resolvers: Resolver = {
  Query: {
    insurance,
    cashback,
  },
  Mutation: {
    logout,
    offerClosed,
  },
};

export { resolvers };
