import * as React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import { TranslationsContext } from './context';
import { TextKeys } from './types';

interface TextKey {
  key: string;
  text: string;
}

interface Language {
  textKeys: TextKey[];
}

interface Data {
  languages: Language[];
}

const TRANSLATIONS_QUERY = gql`
  query TranslationsQuery {
    languages(where: { code: "sv_SE" }) {
      textKeys(where: { project: App }) {
        key
        text
      }
    }
  }
`;

export const normalizeKeys = (textKeys: TextKey[]) =>
  textKeys.reduce((acc: TextKeys, curr: TextKey) => {
    acc[curr.key] = curr.text;
    return acc;
  }, {});

export const TranslationsProvider: React.SFC = ({ children }) => (
  <Query<Data> query={TRANSLATIONS_QUERY}>
    {({ loading, data }) =>
      loading ? null : (
        <TranslationsContext.Provider
          value={{
            textKeys: normalizeKeys(data!.languages[0].textKeys),
          }}
        >
          {children}
        </TranslationsContext.Provider>
      )
    }
  </Query>
);
