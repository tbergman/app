import React from 'react';
import { Animated } from 'react-native';
import { DangerZone } from 'expo';
import { connect } from 'react-redux';

const { Lottie } = DangerZone;

class LoadingIndicator extends React.Component {
  state = {
    fade: new Animated.Value(0),
  };
  componentDidMount() {
    Animated.timing(this.state.fade, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }

  render() {
    if (this.props.loadingMessages && this.props.avatar.data) {
      return (
        <Animated.View
          style={{
            height: this.props.avatar.height,
            width: this.props.avatar.width,
            opacity: this.state.fade,
          }}
        >
          <Lottie
            ref={(animation) => (animation ? animation.play() : null)}
            style={{
              height: this.props.avatar.height,
              width: this.props.avatar.width,
              backgroundColor: 'transparent',
            }}
            loop={true}
            source={this.props.avatar.data}
          />
        </Animated.View>
      );
    } else {
      return null;
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  if (state.chat.messages.length > 0) {
    let message = state.chat.messages[ownProps.messageIndex];
    return {
      loadingMessages: state.chat.loadingMessages,
      avatar: state.chat.avatars[message.header.loadingIndicator] || {},
    };
  } else {
    return {
      avatar: {},
    };
  }
};

const mapDispatchToProps = () => {
  return {};
};

const LoadingIndicatorContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoadingIndicator);

export default LoadingIndicatorContainer;
