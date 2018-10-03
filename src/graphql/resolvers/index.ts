import { insurance } from './insurance';
import { cashback } from './cashback';
import { logout } from './logout';
import { sendEvent } from './send-event';
import { Resolver } from '../types';

const resolvers: Resolver = {
  Query: {
    insurance,
    cashback,
  },
  Mutation: {
    logout,
    sendEvent,
  },
};

export { resolvers };
