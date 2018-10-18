import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Dimensions,
  StyleSheet,
  FlatList,
  Text,
  PixelRatio,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { connect } from 'react-redux';
import { createImageProgress } from 'react-native-image-progress';
import FastImage from 'react-native-fast-image';
import * as Progress from 'react-native-progress';
import { colors } from '@hedviginsurance/brand';
import Config from '@hedviginsurance/react-native-config';
import Hyperlink from 'react-native-hyperlink';

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
import { GiphyMessage } from '../components/giphy-message';
import { FileMessage } from '../components/file-message';

const Image = createImageProgress(FastImage);

const window = Dimensions.get('window');
// (window width - (2 outer margin + 2 inner margin) * 0.98)
const heroImageWidth = Math.round((window.width - 64) * 0.98);

const styles = StyleSheet.create({
  heroMessage: { height: 200, width: heroImageWidth },
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
  userMessageEditButton: {
    marginLeft: 5,
    marginRight: 1,
  },
  userMessageEditButtonWithStatusMessage: { marginBottom: 10 },
  messageUserContainer: { flexDirection: 'row-reverse', alignSelf: 'flex-end' },
  messageHedvigContainer: { flexDirection: 'row', alignSelf: 'flex-start' },
  inlineImage: { width: 280, height: 200 },
  inlineImageContainer: {
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.LIGHT_GRAY,
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

// TODO: Investigate if this is actually in use. If not, delete it
class HeroMessage extends React.Component {
  static propTypes = { message: PropTypes.object };

  render() {
    const { message } = this.props;
    return (
      <StyledHeroMessage>
        {renderImage(message)}
        <StyledDefaultMessageText>{message.body.text}</StyledDefaultMessageText>
        <Image
          resizeMode="contain"
          source={{ uri: message.body.imageUri }}
          style={styles.heroMessage}
        />
      </StyledHeroMessage>
    );
  }
}

const renderImageOrText = (message, index) => {
  if (
    message.body.text.includes('.jpg') ||
    message.body.text.includes('.png') ||
    message.body.text.includes('.jpeg') ||
    message.body.text.includes('.bmp') ||
    message.body.text.includes('.gif')
  ) {
    if (message.body.text.includes('giphy')) {
      return <GiphyMessage url={message.body.text} />;
    }

    const IMAGE_SIZE = PixelRatio.getPixelSizeForLayoutSize(200);
    return (
      <View style={styles.inlineImageContainer}>
        <Image
          source={{
            uri: `${
              Config.PIG_URL
            }/unsafe/${IMAGE_SIZE}x${IMAGE_SIZE}/smart/${encodeURIComponent(
              message.body.text,
            )}`,
          }}
          indicator={Progress.CircleSnail}
          indicatorProps={{
            size: 40,
            thickness: 3,
            color: colors.PURPLE,
          }}
          style={styles.inlineImage}
        />
      </View>
    );
  }

  const withMargin =
    !message.header.statusMessage ||
    (message.header.statusMessage && index !== 1);

  if (message.body.text.includes('hedvig-app-uploads')) {
    return <FileMessage url={message.body.text} withMargin={withMargin} />;
  }

  return (
    <>
      {message.header.editAllowed && (
        <View
          style={[
            styles.userMessageEditButton,
            !message.header.statusMessage
              ? styles.userMessageEditButtonWithStatusMessage
              : undefined,
          ]}
        >
          <EditMessageButton index={index} />
        </View>
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
};

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
    return (
      <View style={styles.userMessageOuterContainer}>
        <View style={styles.userMessageInnerContainer}>
          {renderImageOrText(message, index)}
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
  hero: HeroMessage,
  bankid_collect: () => null, // <-- This is how to not render certain types of messages from Hedvig
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
