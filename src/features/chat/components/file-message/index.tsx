import * as React from 'react';
import { TouchableOpacity, Linking, View } from 'react-native';
import styled from '@sampettersson/primitives';
import path from 'path';

import { File } from 'src/components/icons/File';

import {
  StyledDefaultUserMessageText,
  StyledUserChatMessage,
} from '../../styles/chat';
import { Spacing } from 'src/components/Spacing';

interface FileMessageProps {
  url: string;
  withMargin: boolean;
}

const Content = styled(View)({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
});

export const FileMessage: React.SFC<FileMessageProps> = ({
  url,
  withMargin,
}) => (
  <TouchableOpacity
    accessibilityLabel="Ladda ner fil"
    accessibilityComponentType="button"
    onPress={() => Linking.openURL(url)}
  >
    <StyledUserChatMessage withMargin={withMargin}>
      <Content>
        <File width={20} height={40} />
        <Spacing width={5} />
        <StyledDefaultUserMessageText>
          {path.extname(url.split('?')[0]).replace('.', '')} fil uppladdad
        </StyledDefaultUserMessageText>
      </Content>
    </StyledUserChatMessage>
  </TouchableOpacity>
);
