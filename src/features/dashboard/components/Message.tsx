import * as React from 'react';
import styled from '@sampettersson/primitives';
import { View, Text, TouchableOpacity } from 'react-native';
import { colors, fonts } from '@hedviginsurance/brand';
import Color from 'color';

import { ConsumerProps } from 'src/components/translations/consumer';
import { Spacing } from 'src/components/Spacing';
import { MessageAnimation } from './MessageAnimation';

export enum MessageType {
  ERROR = 'error',
  WARNING = 'warning',
  NOTIFY = 'notify',
}

const messageTypeColors = {
  [MessageType.ERROR]: colors.PINK,
  [MessageType.WARNING]: colors.PURPLE,
  [MessageType.NOTIFY]: colors.GREEN,
};

const messageTypeTextColors = {
  [MessageType.ERROR]: colors.WHITE,
  [MessageType.WARNING]: colors.WHITE,
  [MessageType.NOTIFY]: colors.BLACK,
};

const MessageContainer = styled(View)(
  ({ messageType }: { messageType: MessageType }) => ({
    backgroundColor: messageTypeColors[messageType],
    padding: 15,
    alignItems: 'center',
  }),
);

const MessageText = styled(Text)(
  ({ messageType }: { messageType: MessageType }) => ({
    color: messageTypeTextColors[messageType],
    fontFamily: fonts.CIRCULAR,
    fontSize: 16,
  }),
);

const ActionButton = styled(TouchableOpacity)(
  ({ messageType }: { messageType: MessageType }) => ({
    backgroundColor: Color(messageTypeColors[messageType])
      .darken(0.45)
      .rgb()
      .toString(),
    padding: 5,
    paddingLeft: 16,
    paddingRight: 16,
    borderRadius: 20,
  }),
);

const ActionButtonText = styled(Text)({
  color: colors.WHITE,
  fontFamily: fonts.CIRCULAR,
  fontSize: 14,
});

interface MessageProps {
  message: String | React.ReactElement<ConsumerProps>;
  messageType: MessageType;
  action: String | React.ReactElement<ConsumerProps>;
  onPressAction: () => void;
}

export const Message: React.SFC<MessageProps> = ({
  messageType,
  message,
  action,
  onPressAction,
}) => (
  <MessageAnimation>
    <MessageContainer messageType={messageType}>
      <MessageText messageType={messageType}>{message}</MessageText>
      <Spacing height={15} />
      <ActionButton messageType={messageType} onPress={onPressAction}>
        <ActionButtonText>{action}</ActionButtonText>
      </ActionButton>
    </MessageContainer>
  </MessageAnimation>
);
