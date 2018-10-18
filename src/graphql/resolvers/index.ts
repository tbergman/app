import { insurance } from './insurance';
import { cashback } from './cashback';
import { logout } from './logout';
import { offerClosed } from './offer-closed';
import { IResolvers } from 'graphql-tools';

const resolvers: IResolvers<any, any> = {
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
