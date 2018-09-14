import { insurance } from './insurance'
import { cashback } from './cashback'
import { logout } from './logout'

const resolvers = {
  Query: {
    insurance,
    cashback
  },
  Mutation: {
    logout
  },
}

export { resolvers }
