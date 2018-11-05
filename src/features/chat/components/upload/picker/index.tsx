import * as React from 'react';
import { Consumer } from '../context';
import { FlatList, View, Keyboard } from 'react-native';
import styled from '@sampettersson/primitives';
import { Data } from './data';
import { Image } from './image';
import { Video } from './video';
import { Header } from './header';
import { Delayed } from 'src/components/Delayed';
import { Update } from 'react-lifecycle-components';
import Collapsible from 'react-native-collapsible';

const PickerContainer = styled(View)({
  height: 250,
  width: '100%',
});

interface PickerProps {
  sendMessage: (key: string) => void;
}

interface ListHeaderContextProps {
  sendMessage: (key: string) => void;
  setIsOpen: (isOpen: boolean) => void;
}

const ListHeaderContext = React.createContext<ListHeaderContextProps>({
  sendMessage: () => {},
  setIsOpen: () => {},
});

const ListHeaderComponent = () => (
  <ListHeaderContext.Consumer>
    {({ sendMessage, setIsOpen }) => (
      <Header
        onUpload={(key) => {
          sendMessage(key);
          setIsOpen(false);
        }}
      />
    )}
  </ListHeaderContext.Consumer>
);

export const Picker: React.SFC<PickerProps> = ({ sendMessage }) => (
  <Consumer>
    {({ isOpen, setIsOpen }) => (
      <Collapsible collapsed={!isOpen}>
        <ListHeaderContext.Provider value={{ setIsOpen, sendMessage }}>
          <PickerContainer>
            <Update
              watched={isOpen}
              was={() => {
                if (isOpen) {
                  Keyboard.dismiss();
                }
              }}
            >
              {null}
            </Update>
            <Delayed
              mountChildren={isOpen}
              unmountChildrenAfter={500}
              mountChildrenAfter={0}
            >
              <Data shouldLoad={isOpen}>
                {({ photos, shouldLoadMore }) => (
                  <FlatList
                    ListHeaderComponent={ListHeaderComponent}
                    data={photos ? photos.edges || [] : []}
                    renderItem={({ item }) =>
                      item.node.type.includes('Photo') ? (
                        <Image
                          uri={item.node.image.uri}
                          onUpload={(key) => {
                            sendMessage(key);
                            setIsOpen(false);
                          }}
                        />
                      ) : (
                        <Video uri={item.node.image.uri} />
                      )
                    }
                    keyExtractor={(item) => String(item.node.image.uri)}
                    onEndReached={() => shouldLoadMore()}
                    horizontal
                  />
                )}
              </Data>
            </Delayed>
          </PickerContainer>
        </ListHeaderContext.Provider>
      </Collapsible>
    )}
  </Consumer>
);
