import React from 'react';
import {
  View,
  Image,
  Dimensions,
  StyleSheet,
  FlatList,
  Text,
} from 'react-native';
import { connect } from 'react-redux';

import {
  StyledDefaultMessageText,
  StyledDefaultUserMessageText,
  AnimatedStyledChatMessage,
  StyledUserChatMessage,
  StyledHeroMessage,
  StyledAvatarContainer,
} from '../styles/chat';
import EditMessageButton from '../containers/EditMessageButton';
import Avatar from '../containers/Avatar';
import LoadingIndicator from '../containers/LoadingIndicator';
import { theme } from '../../../style-theme';

const styles = StyleSheet.create({
  scrollContent: {
    flex: 1,
    paddingTop: 16,
    paddingBottom: 16,
  },
  statusMessage: {
    fontFamily: 'circular',
    fontSize: 12,
    textAlign: 'right',
    paddingRight: 34,
    color: '#8a8a99',
  },
});

const renderImage = (message) => {
  if (
    message.body.imageURL &&
    message.body.imageHeight &&
    message.body.imageWidth
  ) {
    return (
      <Image
        source={{ uri: message.body.imageURL }}
        style={{
          height: message.body.imageHeight,
          width: message.body.imageWidth,
        }}
      />
    );
  } else {
    return null;
  }
};

const HeroMessage = ({ message, textAlign }) => {
  const window = Dimensions.get('window');
  // (window width - (2 outer margin + 2 inner margin) * 0.98)
  const imageWidth = Math.round(
    (window.width - 4 * theme.mobile.margin.medium) * 0.98,
  );
  return (
    <StyledHeroMessage>
      {renderImage(message)}
      <StyledDefaultMessageText style={{ textAlign }}>
        {message.body.text}
      </StyledDefaultMessageText>
      <Image
        resizeMode="contain"
        source={{ uri: message.body.imageUri }}
        style={{ height: 200, width: imageWidth }}
      />
    </StyledHeroMessage>
  );
};

const DefaultHedvigMessage = ({ message }) => {
  if (message.body.text === '') {
    return null;
  } else {
    return (
      <AnimatedStyledChatMessage>
        {renderImage(message)}
        <StyledDefaultMessageText>{message.body.text}</StyledDefaultMessageText>
      </AnimatedStyledChatMessage>
    );
  }
};

const DefaultUserMessage = ({ message, index }) => {
  let maybeEditMessageButton;
  if (message.header.editAllowed) {
    maybeEditMessageButton = (
      <View
        style={{
          marginLeft: 10,
          marginBottom: 10,
        }}
      >
        <EditMessageButton />
      </View>
    );
  }
  return (
    <View style={{ maxWidth: '88%' }}>
      <View
        style={{
          flexDirection: 'row-reverse',
          alignItems: 'center',
        }}
      >
        {maybeEditMessageButton}
        <StyledUserChatMessage
          withMargin={message.header.statusMessage && index !== 1}
        >
          <StyledDefaultUserMessageText>
            {message.body.text}
          </StyledDefaultUserMessageText>
        </StyledUserChatMessage>
      </View>
      {message.header.statusMessage &&
        index === 1 && (
          <Text style={styles.statusMessage}>
            {message.header.statusMessage}
          </Text>
        )}
    </View>
  );
};

const UserMessageMapping = {};

const HedvigMessageMapping = {
  hero: HeroMessage,
  bankid_collect: () => null, // <-- This is how to not render certain types of messages from Hedvig
  audio: () => null,
  polling: () => null,
};

const renderMessage = (message, idx) => {
  let fromMe = message.header.fromId !== 1;
  let flexDirection = fromMe ? 'row-reverse' : 'row';
  let alignSelf = fromMe ? 'flex-end' : 'flex-start';
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
        style={{
          flexDirection: flexDirection,
          alignSelf: alignSelf,
        }}
      >
        <MessageRenderComponent message={message} index={idx} />
      </View>
      {lastIndex ? <LoadingIndicator messageIndex={idx} /> : null}
    </View>
  );
};

class MessageList extends React.Component {
  render() {
    return (
      <FlatList
        inverted
        style={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        data={this.props.messages}
        renderItem={({ item, index }) => renderMessage(item, index)}
        keyExtractor={(item) => '' + item.globalId}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    messages: state.chat.messages,
  };
};

const mapDispatchToProps = () => {
  return {};
};

const MessageListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MessageList);

export default MessageListContainer;
