import * as React from 'react';
import { Consumer } from '../context';
import { FlatList, View } from 'react-native';
import styled from '@sampettersson/primitives';
import { colors } from '@hedviginsurance/brand';
import { Data } from './data';
import { Image } from './image';
import { Video } from './video';
import { Header } from './header';
import { Delayed } from 'src/components/Delayed';

const PickerContainer = styled(View)(({ isOpen }: { isOpen: boolean }) => ({
  height: isOpen ? 250 : 0,
  width: '100%',
  backgroundColor: colors.LIGHT_GRAY,
}));

interface PickerProps {
  sendMessage: (message: string) => void;
}

export const Picker: React.SFC<PickerProps> = ({ sendMessage }) => (
  <Consumer>
    {({ isOpen, setIsOpen }) => (
      <PickerContainer isOpen={isOpen}>
        <Delayed
          mountChildren={isOpen}
          unmountChildrenAfter={500}
          mountChildrenAfter={0}
        >
          <Data shouldLoad={isOpen}>
            {({ photos, shouldLoadMore }) => (
              <FlatList
                ListHeaderComponent={Header}
                data={photos!.edges!}
                renderItem={({ item }) =>
                  item.node.type.includes('Photo') ? (
                    <Image
                      uri={item.node.image.uri}
                      onUpload={(url) => {
                        sendMessage(url);
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
    )}
  </Consumer>
);
