import * as React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import { TranslationsContext } from './context';
import { TextKeys } from './types';

interface Key {
  value: string;
}

interface Translation {
  key: Key;
  text: string;
}

interface Language {
  translations: Translation[];
}

interface Data {
  languages: Language[];
}

const TRANSLATIONS_QUERY = gql`
  query TranslationsQuery {
    languages(where: { code: "sv_SE" }) {
      translations(where: { project: App }) {
        key {
          value
        }
        text
      }
    }
  }
`;

export const normalizeTranslations = (translations: Translation[]) =>
  translations.reduce((acc: TextKeys, curr: Translation) => {
    acc[curr.key.value] = curr.text;
    return acc;
  }, {});

export const TranslationsProvider: React.SFC = ({ children }) => (
  <Query<Data> query={TRANSLATIONS_QUERY}>
    {({ loading, data }) =>
      loading ? null : (
        <TranslationsContext.Provider
          value={{
            textKeys: normalizeTranslations(data!.languages[0].translations),
          }}
        >
          {children}
        </TranslationsContext.Provider>
      )
    }
  </Query>
);
