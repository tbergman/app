import React from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import { connect } from 'react-redux';
import Hyperlink from 'react-native-hyperlink';

import {
  StyledDefaultMessageText,
  AnimatedStyledChatMessage,
  StyledAvatarContainer,
} from '../styles/chat';
import Avatar from '../containers/Avatar';
import LoadingIndicator from '../containers/LoadingIndicator';
import { RichMessage } from '../components/rich-message';

const styles = StyleSheet.create({
  scrollContent: {
    flex: 1,
    paddingTop: 16,
    paddingBottom: 16,
  },
  statusMessage: {
    fontFamily: 'CircularStd-Book',
    fontSize: 12,
    textAlign: 'right',
    paddingRight: 34,
    color: '#8a8a99',
  },
  userMessageOuterContainer: { maxWidth: '88%' },
  userMessageInnerContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  messageUserContainer: { flexDirection: 'row-reverse', alignSelf: 'flex-end' },
  messageHedvigContainer: { flexDirection: 'row', alignSelf: 'flex-start' },
});

class DefaultHedvigMessage extends React.Component {
  render() {
    const { message } = this.props;
    if (message.body.text === '') {
      return null;
    } else {
      return (
        <AnimatedStyledChatMessage>
          <Hyperlink>
            <StyledDefaultMessageText>
              {message.body.text}
            </StyledDefaultMessageText>
          </Hyperlink>
        </AnimatedStyledChatMessage>
      );
    }
  }
}

class DefaultUserMessage extends React.Component {
  render() {
    const { message, index } = this.props;

    const withMargin =
      !message.header.statusMessage ||
      (message.header.statusMessage && index !== 1);

    return (
      <View style={styles.userMessageOuterContainer}>
        <View style={styles.userMessageInnerContainer}>
          <RichMessage
            index={index}
            message={message}
            withMargin={withMargin}
          />
        </View>
        {message.header.statusMessage &&
          index === 1 && (
            <Text style={styles.statusMessage}>
              {message.header.statusMessage}
            </Text>
          )}
      </View>
    );
  }
}

const UserMessageMapping = {};

const HedvigMessageMapping = {
  hero: () => null,
  bankid_collect: () => null,
  audio: () => null,
  polling: () => null,
};

const renderMessage = (message, idx) => {
  let fromMe = message.header.fromId !== 1;
  const lastIndex = idx === 0;

  let MessageRenderComponent;
  if (!fromMe) {
    MessageRenderComponent = DefaultHedvigMessage;
    if (HedvigMessageMapping.hasOwnProperty(message.body.type)) {
      MessageRenderComponent = HedvigMessageMapping[message.body.type];
    }
  } else {
    MessageRenderComponent = DefaultUserMessage;
    if (UserMessageMapping.hasOwnProperty(message.body.type)) {
      MessageRenderComponent = UserMessageMapping[message.body.type];
    }
  }

  let avatar =
    lastIndex && message.header.avatarName ? (
      <StyledAvatarContainer>
        <Avatar messageIndex={idx} />
      </StyledAvatarContainer>
    ) : null;
  return (
    <View key={message.globalId || idx}>
      {avatar}
      <View
        style={
          fromMe ? styles.messageUserContainer : styles.messageHedvigContainer
        }
      >
        <MessageRenderComponent message={message} index={idx} />
      </View>
      {lastIndex ? <LoadingIndicator messageIndex={idx} /> : null}
    </View>
  );
};

class MessageList extends React.Component {
  _renderItem = ({ item, index }) => renderMessage(item, index);
  _keyExtractor = (item) => '' + item.globalId;

  shouldComponentUpdate(nextProps) {
    return nextProps.messages !== this.props.messages;
  }

  render() {
    return (
      <FlatList
        inverted
        style={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        data={this.props.messages}
        renderItem={this._renderItem}
        keyExtractor={this._keyExtractor}
        keyboardDismissMode="interactive"
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    messages: state.chat.messages,
  };
};

export default connect(
  mapStateToProps,
  undefined,
)(MessageList);
