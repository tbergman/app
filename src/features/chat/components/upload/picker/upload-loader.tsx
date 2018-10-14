import * as React from 'react';
import { View } from 'react-native';
import styled from '@sampettersson/primitives';
import { Loader } from 'src/components/Loader';

const UploadLoaderContainer = styled(View)({
  position: 'absolute',
  width: '100%',
  height: '100%',
});

export const UploadLoader = () => (
  <UploadLoaderContainer>
    <Loader />
  </UploadLoaderContainer>
);
