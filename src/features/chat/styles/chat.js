import React from 'react';
import { Animated, View, StyleSheet, Text, TextInput } from 'react-native';
import styled from 'styled-components/native';

// Regular text messages

const styles = StyleSheet.create({
  rightAlignedOptions: {
    flexDirection: 'row-reverse',
    alignSelf: 'flex-end',
    alignItems: 'center',
    marginLeft: 5,
  },
  defaultMessageText: {
    color: '#0f007a',
    fontSize: 16,
    fontFamily: 'merriweather',
    textAlign: 'left',
  },
  userMessageText: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'circular',
    textAlign: 'left',
  },
  messageContainer: {
    flexDirection: 'row',
    paddingTop: 12,
    paddingRight: 12,
    paddingBottom: 12,
    paddingLeft: 12,
    borderRadius: 8,
    maxWidth: '88%',
    backgroundColor: '#f9fafc',
    marginBottom: 8,
  },
  textInputContainer: {
    flexDirection: 'row',
    marginRight: 8,
    marginLeft: 8,
    marginBottom: 8,
  },
  textInput: {
    flex: 1,
    alignSelf: 'stretch',
    height: 40,
    paddingTop: 10,
    paddingRight: 16,
    paddingBottom: 10,
    paddingLeft: 16,
    marginRight: 8,
    backgroundColor: '#ffffff',
    borderColor: '#651eff',
    borderWidth: 1,
    borderRadius: 24,
    fontSize: 16,
    overflow: 'hidden',
  },
  optionsContainer: {
    marginBottom: 8,
    justifyContent: 'flex-end',
    flexWrap: 'wrap',
  },
  optionsContainerWrap: {
    flexDirection: 'row',
  },
  optionsContainerNoWrap: { flexDirection: 'column' },
  marginContainer: {
    marginRight: 16,
    marginBottom: 40,
    marginLeft: 16,
    justifyContent: 'flex-end',
    flexWrap: 'wrap',
  },
});

export class StyledDefaultMessageText extends React.Component {
  render() {
    return <Text {...this.props} style={styles.defaultMessageText} />;
  }
}

export class StyledDefaultUserMessageText extends React.Component {
  render() {
    return <Text {...this.props} style={styles.userMessageText} />;
  }
}

export const StyledChatMessage = styled.View`
  flex-direction: row;
  padding: 12px 12px;
  border-radius: 8px;
  max-width: 88%;
  background: ${(props) => props.theme.colors.hedvigMessageBackground};
  margin-bottom: 8px;
`;

export class AnimatedStyledChatMessage extends React.Component {
  state = {
    slideAnim: new Animated.Value(-100),
  };

  componentDidMount() {
    Animated.spring(this.state.slideAnim, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  }

  render() {
    return (
      <Animated.View
        style={[
          styles.messageContainer,
          { transform: [{ translateX: this.state.slideAnim }] },
        ]}
        {...this.props}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}

export const StyledUserChatMessage = styled.View`
  margin-bottom: 8px;
  padding: 8px 16px;
  background-color: ${(props) => props.theme.colors.primary};
  border-color: ${(props) => props.theme.colors.primary};
  border-width: 1px;
  border-radius: 24px;
  align-items: center;
  justify-content: center;
  align-self: center;
`;

export const StyledHeroMessage = StyledChatMessage.extend`
  flex-direction: column;
  width: 98%;
`;

export const StyledAvatarContainer = styled.View`
  margin-left: 15px;
  margin-bottom: 15px;
`;

// Single select & multiple select

export class StyledMarginContainer extends React.Component {
  render() {
    const { wrap, ...rest } = this.props;
    return (
      <View
        {...rest}
        style={[
          styles.marginContainer,
          wrap ? styles.optionsContainerWrap : styles.optionsContainerNoWrap,
        ]}
      />
    );
  }
}

export class StyledRightAlignedOptions extends React.Component {
  render() {
    return <View style={[styles.rightAlignedOptions]} {...this.props} />;
  }
}

// Multiple select

export class StyledOptionsContainer extends React.Component {
  render() {
    const { wrap, ...rest } = this.props;
    return (
      <View
        {...rest}
        style={[
          styles.optionsContainer,
          wrap ? styles.optionsContainerWrap : styles.optionsContainerNoWrap,
        ]}
      />
    );
  }
}

// Text input

export class StyledTextInputContainer extends React.Component {
  render() {
    return <View {...this.props} style={styles.textInputContainer} />;
  }
}

export class StyledTextInput extends React.Component {
  render() {
    return <TextInput {...this.props} style={styles.textInput} />;
  }
}

// Date input

export const StyledDatePickerResultRow = styled.View`
  margin: 0 8px 8px 8px;
  flex-direction: row;
`;

export const StyledFakeTextInput = styled.View`
  flex: 1;
  align-self: stretch;
  justify-content: center;
  height: ${(props) => props.theme.input.default.height};
  padding: 10px 16px;
  margin-right: 8px;
  background-color: ${(props) => props.theme.colors.white};
  border-color: ${(props) => props.theme.colors.primary};
  border-width: 1px;
  border-radius: 24px;
`;

export const TouchableStyledFakeTextInput = styled.TouchableOpacity`
  flex: 1;
  align-self: stretch;
  justify-content: center;
  height: ${(props) => props.theme.input.default.height};
  padding: 10px 16px;
  margin-right: 8px;
  background-color: ${(props) => props.theme.colors.white};
  border-color: ${(props) => props.theme.colors.primary};
  border-width: 1px;
  border-radius: 24px;
`;

export const StyledFakeTextInputText = styled.Text`
  font-size: ${(props) => props.theme.typography.input.fontSize};
  color: ${(props) => props.theme.typography.activeText.color};
`;
