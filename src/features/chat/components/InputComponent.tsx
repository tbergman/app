import * as React from 'react';

import MessageList from '../containers/MessageList';
import ChatNumberInput from '../containers/ChatNumberInput';
import ChatTextInput from '../containers/ChatTextInput';
import MultipleSelectInput from '../containers/MultipleSelectInput';
import SingleSelectInput from '../containers/SingleSelectInput';
import BankIdCollectInput from '../containers/BankIdCollectInput';
import AudioInput from '../containers/AudioInput';
import ParagraphInput from '../containers/ParagraphInput';

interface InputComponentProps {
  messages: any;
  showOffer: any;
}

const inputComponentMap: { [key: string]: any } = {
  multiple_select: () => <MultipleSelectInput />,
  text: () => <ChatTextInput />,
  number: () => <ChatNumberInput />,
  single_select: (props: any) => <SingleSelectInput {...props} />,
  bankid_collect: () => <BankIdCollectInput />,
  paragraph: () => <ParagraphInput />,
  audio: () => <AudioInput />,
};

const InputComponent: React.SFC<InputComponentProps> = (props) => {
  const { messages } = props;

  if (messages.length === 0) {
    return null;
  }

  const lastMessage = messages[0];
  const lastMessageType = lastMessage.body.type;

  const Component: React.ComponentType = inputComponentMap[lastMessageType];
  return <Component {...props} />;
};

export default InputComponent;
