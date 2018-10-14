import * as React from 'react';
import { CameraRoll, GetPhotosReturnType } from 'react-native';
import { Container, ActionMap } from 'constate';
import { Mount } from 'react-lifecycle-components';

interface State {
  photos?: Partial<GetPhotosReturnType>;
}

interface Actions {
  setPhotos: (photos: GetPhotosReturnType) => void;
}

const actions: ActionMap<State, Actions> = {
  setPhotos: (photos) => () => ({
    photos,
  }),
};

interface Children {
  photos?: Partial<GetPhotosReturnType>;
  shouldLoadMore: () => void;
}

interface DataProps {
  children: (args: Children) => React.ReactNode;
  shouldLoad: boolean;
}

const loadPhotos = ({ photos, setPhotos }: Actions & State) => {
  CameraRoll.getPhotos({
    first: 10,
    after: photos!.page_info ? photos!.page_info!.end_cursor : undefined,
    assetType: 'All',
  }).then((cameraRoll) => {
    if (photos!.page_info && !photos!.page_info!.has_next_page) {
      return;
    }

    console.log(cameraRoll.edges);

    setPhotos({
      ...cameraRoll,
      edges: [...photos!.edges!, ...cameraRoll.edges],
    });
  });
};

export const Data: React.SFC<DataProps> = ({ children, shouldLoad }) => (
  <Container actions={actions} initialState={{ photos: { edges: [] } }}>
    {({ photos, setPhotos }) => (
      <>
        {shouldLoad && (
          <Mount on={() => loadPhotos({ photos, setPhotos })}>{null}</Mount>
        )}
        {children({
          photos,
          shouldLoadMore: () => {
            loadPhotos({ photos, setPhotos });
          },
        })}
      </>
    )}
  </Container>
);
