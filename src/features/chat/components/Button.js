import React from 'react';
import PropTypes from 'prop-types';
import {
  Animated,
  TouchableOpacity,
  StyleSheet,
  Text,
  TouchableHighlight,
  Image,
  View,
} from 'react-native';

const AnimatableTouchableHighlight = Animated.createAnimatedComponent(
  TouchableHighlight,
);

const styles = StyleSheet.create({
  buttonBase: {
    minHeight: 20,
    paddingTop: 8,
    paddingRight: 16,
    paddingBottom: 8,
    paddingLeft: 16,
    borderWidth: 1,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  chatOptionButton: {
    borderColor: '#651eff',
    marginBottom: 8,
  },
  buttonColorSelected: { backgroundColor: '#651eff' },
  buttonColorNotSelected: { backgroundColor: '#ffffff' },
  buttonHidden: { opacity: 0 },
  buttonText: {
    fontFamily: 'circular',
    fontSize: 16,
    lineHeight: 20,
    backgroundColor: 'transparent',
  },
  buttonTextColorSelected: { color: '#ffffff' },
  buttonTextColorNotSelected: { color: '#651eff' },
  backToOfferButton: {
    backgroundColor: '#1be9b6',
    borderColor: '#1be9b6',
  },
  backToOfferText: { color: '#ffffff', fontFamily: 'circular' },
  sendButton: { width: 40, height: 40 },
  closeButton: { width: 40, height: 40 },
});

export class AnimatedSingleSelectOptionButton extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    selected: PropTypes.bool,
    disabled: PropTypes.bool,
    onPress: PropTypes.func.isRequired,
    hidden: PropTypes.bool,
  };

  static defaultProps = {
    selected: false,
    disabled: false,
    hidden: false,
  };

  state = {
    slideAnim: new Animated.Value(300),
  };

  componentDidMount() {
    Animated.sequence([
      Animated.delay(100),
      Animated.spring(this.state.slideAnim, {
        toValue: 0,
        useNativeDriver: true,
      }),
    ]).start();
  }

  render() {
    const { title, selected, disabled, onPress, hidden } = this.props;
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        style={[
          styles.buttonBase,
          styles.chatOptionButton,
          {
            transform: [{ translateX: this.state.slideAnim }],
          },
          selected ? styles.buttonColorSelected : styles.buttonColorNotSelected,
          hidden ? styles.buttonHidden : undefined,
        ]}
      >
        <Text
          style={[
            styles.buttonText,
            selected
              ? styles.buttonTextColorSelected
              : styles.buttonTextColorNotSelected,
          ]}
        >
          {title}
        </Text>
      </TouchableOpacity>
    );
  }
}

export class AnimatedMultipleSelectOptionButton extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    selected: PropTypes.bool,
    onPress: PropTypes.func.isRequired,
  };
  state = {
    slideAnim: new Animated.Value(250),
  };

  componentDidMount() {
    Animated.sequence([
      Animated.delay(100),
      Animated.spring(this.state.slideAnim, {
        toValue: 0,
        useNativeDriver: true,
      }),
    ]).start();
  }

  render() {
    const { selected, title, onPress } = this.props;
    return (
      <AnimatableTouchableHighlight
        onPress={onPress}
        underlayColor="transparent"
        activeOpacity={0.5}
        style={[
          styles.buttonBase,
          styles.chatOptionButton,
          {
            transform: [
              {
                translateX: this.state.slideAnim,
              },
            ],
          },
          selected ? styles.buttonColorSelected : styles.buttonColorNotSelected,
        ]}
      >
        <Text
          style={[
            styles.buttonText,
            selected
              ? styles.buttonTextColorSelected
              : styles.buttonTextColorNotSelected,
          ]}
        >
          {title}
        </Text>
      </AnimatableTouchableHighlight>
    );
  }
}

export class BackToOfferButton extends React.Component {
  static propTypes = {
    onPress: PropTypes.func.isRequired,
  };

  render() {
    const { onPress } = this.props;
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[styles.buttonBase, styles.backToOfferButton]}
      >
        <Text style={styles.backToOfferText}>Fortsätt →</Text>
      </TouchableOpacity>
    );
  }
}

export class SendButton extends React.Component {
  static propTypes = {
    onPress: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired,
  };
  static _hitSlop = { top: 20, right: 20, bottom: 20, left: 20 };

  render() {
    const { onPress, disabled } = this.props;
    if (disabled) {
      return (
        <View>
          <Image
            source={require('../../../../assets/icons/chat/send_idle.png')}
            style={styles.sendButton}
          />
        </View>
      );
    }
    return (
      <TouchableOpacity onPress={onPress} hitSlop={SendButton._hitSlop}>
        <Image
          source={require('../../../../assets/icons/chat/send.png')}
          style={styles.sendButton}
        />
      </TouchableOpacity>
    );
  }
}

export class CloseButton extends React.Component {
  static propTypes = {
    onPress: PropTypes.func.isRequired,
  };

  static _hitSlop = { top: 20, right: 20, bottom: 20, left: 20 };

  render() {
    const { onPress } = this.props;
    return (
      <TouchableOpacity onPress={onPress} hitSlop={CloseButton._hitSlop}>
        <Image
          source={require('../../../../assets/icons/close/close_black.png')}
          style={styles.closeButton}
        />
      </TouchableOpacity>
    );
  }
}