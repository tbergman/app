import * as React from 'react';

import { UploadButton } from '../upload/button';
import { GiphyButton } from '../giphy-picker/button';
import { Consumer as GiphyConsumer } from '../giphy-picker/context';
import { Consumer as UploadConsumer } from '../upload/context';

import { HideView } from './hide-view';

export const Buttons: React.SFC = () => (
  <>
    <UploadConsumer>
      {({ isOpen }) => (
        <HideView hidden={isOpen}>
          <GiphyButton />
        </HideView>
      )}
    </UploadConsumer>
  </>
);
