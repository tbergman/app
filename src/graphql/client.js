import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { SchemaLink } from 'apollo-link-schema';
import { makeExecutableSchema } from 'graphql-tools';

import { resolvers } from './resolvers';

const typeDefs = `
  type Insurance {
    address: String
    monthlyCost: Int
    safetyIncreasers: [String!]
    certificateUrl: String
    status: InsuranceStatus
    type: InsuranceType
    activeFrom: LocalDate

    perilCategories: [PerilCategory]
  }

  type PerilCategory {
    title: String
    description: String
    iconUrl: String
    perils: [Peril]
  }

  type Peril {
    id: ID
    title: String
    imageUrl: String
    description: String
  }

  enum InsuranceStatus {
    PENDING
    ACTIVE
    INACTIVE
    INACTIVE_WITH_START_DATE
    TERMINATED
  }

  enum InsuranceType {
    RENT
    BRF
    STUDENT_RENT
    STUDENT_BRF
  }

  type Cashback {
    id: ID
    name: String
    imageUrl: String
  }

  type Query {
    insurance: Insurance!
    cashback: Cashback!
  }

  type Mutation {
    logout: Boolean
  }

  scalar LocalDate
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new SchemaLink({ schema }),
});
