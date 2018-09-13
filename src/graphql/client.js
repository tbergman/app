import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { SchemaLink } from 'apollo-link-schema';
import { makeExecutableSchema } from 'graphql-tools';
import { AsyncStorage } from 'react-native';

import Config from '@hedviginsurance/react-native-config';

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

  type User {
    insurance: Insurance
    cashback: Cashback
  }

  type Auth {
    token: String!
  }

  type Query {
    user: User!
    insurance: Insurance!
  }

  type Mutation {
    logout: Auth
  }

  scalar LocalDate
`;

const getUser = async () => {
  const token = await AsyncStorage.getItem('@hedvig:token');
  const data = await fetch(`${Config.API_BASE_URL}/member/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return await data.json();
};

const getInsurance = async () => {
  const token = await AsyncStorage.getItem('@hedvig:token');
  const data = await fetch(`${Config.API_BASE_URL}/insurance`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return await data.json();
};

const logoutUser = async () => {
  const token = await AsyncStorage.getItem('@hedvig:token');
  await fetch(`${Config.API_BASE_URL}/logout`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
  });
};

const registerUser = async () => {
  const data = await fetch(`${Config.API_BASE_URL}/helloHedvig`, {
    method: 'POST',
  });
  return await data.text();
};

const resolvers = {
  Query: {
    user: async () => {
      const [user, insurance] = await Promise.all([getUser(), getInsurance()]);
      return {
        insurance: {
          safetyIncreasers: user.safetyIncreasers,
          monthlyCost: insurance.currentTotalPrice,
          address: insurance.addressStreet,
          certificateUrl: insurance.certificateUrl,
        },
        cashback: {
          name: user.selectedCashback,
          imageUrl: user.selectedCashbackImageUrl,
        },
      };
    },
    insurance: async () => {
      const insurance = await getInsurance();
      return {
        monthlyCost: insurance.currentTotalPrice,
        address: insurance.addressStreet,
        certificateUrl: insurance.certificateUrl,
        status: insurance.status,
        type: insurance.insuranceType,
        activeFrom: insurance.activeFrom,
        perilCategories: insurance.categories,
      };
    },
  },
  Mutation: {
    logout: async () => {
      await logoutUser();
      const newToken = await registerUser();
      return { token: newToken };
    },
  },
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new SchemaLink({ schema }),
});
