import * as React from 'react';
import { View } from 'react-native';
import styled from '@sampettersson/primitives';
import Hyperlink from 'react-native-hyperlink';

import EditMessageButton from '../../containers/EditMessageButton';
import {
  StyledUserChatMessage,
  StyledDefaultUserMessageText,
} from '../../styles/chat';

import { Props } from './types';

const EditMessageButtonContainer = styled(View)(
  ({ hasStatusMessage }: { hasStatusMessage: boolean }) => ({
    marginLeft: 5,
    marginRight: 1,
    marginBottom: hasStatusMessage ? 0 : 10,
  }),
);

export const TextMessage: React.SFC<Props> = ({
  message,
  index,
  withMargin,
}) => (
  <>
    {message.header.editAllowed && (
      <EditMessageButtonContainer
        hasStatusMessage={!!message.header.statusMessage}
      >
        <EditMessageButton index={index} />
      </EditMessageButtonContainer>
    )}
    <StyledUserChatMessage withMargin={withMargin}>
      <Hyperlink
        linkDefault={true}
        linkStyle={{ textDecorationLine: 'underline' }}
      >
        <StyledDefaultUserMessageText>
          {message.body.text}
        </StyledDefaultUserMessageText>
      </Hyperlink>
    </StyledUserChatMessage>
  </>
);
