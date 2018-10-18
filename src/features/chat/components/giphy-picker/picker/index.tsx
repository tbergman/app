import * as React from 'react';
import { Consumer } from '../context';
import { View, StyleSheet } from 'react-native';
import styled from '@sampettersson/primitives';
import { colors } from '@hedviginsurance/brand';
import { Delayed } from 'src/components/Delayed';

import { Data } from './data';
import { SearchBar } from './search-bar';

const PickerContainer = styled(View)(({ isOpen }: { isOpen: boolean }) => ({
  height: isOpen ? 250 : 0,
  width: '100%',
  backgroundColor: colors.LIGHT_GRAY,
  overflow: 'hidden',
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
          unmountChildrenAfter={300}
          mountChildrenAfter={0}
        >
          <SearchBar>
            {(dataQuery) => (
              <Data
                query={dataQuery}
                onImagePress={(url) => {
                  setIsOpen(false);
                  sendMessage(url);
                }}
              />
            )}
          </SearchBar>
        </Delayed>
      </PickerContainer>
    )}
  </Consumer>
);
