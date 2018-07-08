import React from 'react';
import PropTypes from 'prop-types';
import { Animated, StyleSheet } from 'react-native';
import { DangerZone } from 'expo';
import { connect } from 'react-redux';

const { Lottie } = DangerZone;

const styles = StyleSheet.create({
  avatar: { backgroundColor: 'transparent' },
});

class Avatar extends React.Component {
  static propTypes = {
    avatar: PropTypes.shape({
      width: PropTypes.number,
      height: PropTypes.number,
      data: PropTypes.object,
    }),
  };

  static defaultProps = { avatar: {} };
  state = {
    progress: new Animated.Value(0),
  };

  play() {
    Animated.timing(this.state.progress, {
      toValue: 1,
      duration: this.props.avatar.duration,
    }).start();
  }

  render() {
    const { avatar } = this.props;
    if (avatar.data) {
      const { width, height, data } = avatar;
      return (
        <Lottie
          ref={() => this.play()} // TODO: Fix this hack
          style={[styles.avatar, { height, width }]}
          source={data}
          progress={this.state.progress}
        />
      );
    }
    return null;
  }
}

const mapStateToProps = (state) => {
  if (state.chat.messages.length > 0) {
    let message = state.chat.messages[0];
    return {
      avatar: state.chat.avatars[message.header.avatarName] || {},
    };
  } else {
    return {
      avatar: {},
    };
  }
};

export default connect(
  mapStateToProps,
  undefined,
)(Avatar);
