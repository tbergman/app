import * as React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { FlatList } from 'react-native';
import { Loader } from 'src/components/Loader';

import { GifImage } from './gif-image';
import { EmptyState } from './empty-state';

const QUERY = gql`
  query GifsQuery($query: String!) {
    gifs(query: $query) {
      url
    }
  }
`;

interface Gif {
  url: string;
}

interface QueryResult {
  gifs: Gif[];
}

interface DataProps {
  query: string;
  onImagePress: (url: string) => void;
}

export const Data: React.SFC<DataProps> = ({ query, onImagePress }) => (
  <Query<QueryResult> query={QUERY} variables={{ query }}>
    {({ data, loading }) =>
      !loading && data ? (
        <FlatList
          keyboardDismissMode="none"
          keyboardShouldPersistTaps="always"
          alwaysBounceHorizontal={false}
          horizontal
          initialNumToRender={3}
          data={data.gifs}
          renderItem={({ item }) => (
            <GifImage url={item.url} onPress={() => onImagePress(item.url)} />
          )}
          keyExtractor={(gif) => gif.url}
          ListEmptyComponent={() => <EmptyState query={query} />}
          style={{ width: '100%' }}
        />
      ) : (
        <Loader />
      )
    }
  </Query>
);
