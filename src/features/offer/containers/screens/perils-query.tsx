import * as React from 'react';
import { Query, QueryResult } from 'react-apollo';
import gql from 'graphql-tag';

import { Insurance } from 'src/graphql/types';

const QUERY = gql`
  query Perils {
    insurance {
      address
      type
      perilCategories {
        title
        description
        iconUrl
        perils {
          id
          title
          imageUrl
          description
        }
      }
    }
  }
`;

interface PerilsQueryProps {
  children: (result: QueryResult<{ insurance: Insurance }>) => React.ReactNode;
}

export const PerilsQuery: React.SFC<PerilsQueryProps> = ({ children }) => (
  <Query<{ insurance: Insurance }> query={QUERY}>{children}</Query>
);
