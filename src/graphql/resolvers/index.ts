import { insurance } from './insurance'
import { cashback } from './cashback'
import { logout } from './logout'
import { Resolver } from '../types';

const resolvers: Resolver = {
  Query: {
    insurance,
    cashback
  },
  Mutation: {
    logout
  },
}

export { resolvers }
