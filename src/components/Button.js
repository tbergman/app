/* global require */
import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { DangerZone } from 'expo';
import {
  StyledButton,
  StyledDisabledButton,
  StyledButtonText,
  StyledButtonTextInverted,
  StyledRoundedButton,
  StyledRoundedButtonInverted,
} from './styles/button';
import { StyledDialogButton, StyledDialogButtonText } from './styles/dialog';
const { Lottie } = DangerZone;

const hitSlop = {
  top: 20,
  right: 20,
  bottom: 20,
  left: 20,
};

export const TextButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} hitSlop={hitSlop}>
      <StyledButtonText>{title}</StyledButtonText>
    </TouchableOpacity>
  );
};

export const RoundedButtonWithChildren = ({
  onPress,
  children,
  disabled,
  style = undefined,
}) => {
  return (
    <StyledRoundedButton
      disabled={disabled}
      onPress={onPress}
      {...(style ? { style: style } : {})}
    >
      {children}
    </StyledRoundedButton>
  );
};

export const RoundedInvertedButtonWithChildren = ({ onPress, children }) => {
  return (
    <StyledRoundedButtonInverted onPress={onPress} hitSlop={hitSlop}>
      {children}
    </StyledRoundedButtonInverted>
  );
};

export const RoundedInvertedButton = ({ title, onPress }) => {
  return (
    <RoundedInvertedButtonWithChildren onPress={onPress}>
      <StyledButtonText>{title}</StyledButtonText>
    </RoundedInvertedButtonWithChildren>
  );
};

export const RoundedButton = ({
  title,
  prefix,
  onPress,
  disabled = false,
  selected = false,
  _ContainerComponent = RoundedButtonWithChildren,
  _TextComponent = StyledButtonText,
  style = undefined,
}) => {
  if (prefix) {
    throw new Error('prefix used');
  }
  return (
    <_ContainerComponent
      disabled={disabled}
      onPress={onPress}
      selected={selected}
      {...(style ? { style: style } : {})}
    >
      <_TextComponent selected={selected}>{title}</_TextComponent>
    </_ContainerComponent>
  );
};

export const TextInputSubmitButton = ({ title, prefix, onPress }) =>
  RoundedButton({
    title,
    prefix,
    onPress,
    _ContainerComponent: RoundedInvertedButtonWithChildren,
    _TextComponent: StyledButtonTextInverted,
  });

// Dialog

export const DialogButton = ({ title, onPress, borderRight = false }) => {
  return (
    <StyledDialogButton onPress={onPress} borderRight={borderRight}>
      <StyledDialogButtonText>{title}</StyledDialogButtonText>
    </StyledDialogButton>
  );
};

// Icon buttons

export const IconButton = ({
  iconModule,
  onPress,
  width,
  size = 'big',
  _ButtonComponent = StyledButton,
  style = {},
}) => {
  width =
    width ||
    {
      small: 16,
      medium: 20,
      mediumBig: 24,
      big: 40,
      huge: 56,
    }[size];
  return (
    <_ButtonComponent onPress={onPress} hitSlop={hitSlop} style={style}>
      <Image source={iconModule} style={{ width: width, height: width }} />
    </_ButtonComponent>
  );
};

export const DisabledIconButton = ({ iconModule, size }) =>
  IconButton({ iconModule, size, _ButtonComponent: StyledDisabledButton });

export const SendIconButton = ({ onPress }) => (
  <IconButton
    iconModule={require('../../assets/icons/chat/send.png')}
    onPress={onPress}
  />
);

export const SendDisabledIconButton = () => (
  <DisabledIconButton
    iconModule={require('../../assets/icons/chat/send_idle.png')}
  />
);

export const ChatNavDashboardButton = ({ onPress }) => (
  <IconButton
    iconModule={require('../../assets/icons/chat/to_dashboard.png')}
    onPress={onPress}
  />
);

export const ListNextButton = ({ onPress }) => (
  <IconButton
    iconModule={require('../../assets/icons/navigate_next.png')}
    onPress={onPress}
    size="mediumBig"
  />
);

export const DisabledListNextButton = () => (
  <DisabledIconButton
    iconModule={require('../../assets/icons/navigate_next.png')}
    size="mediumBig"
  />
);

export const DisabledCollapseButton = () => (
  <DisabledIconButton
    iconModule={require('../../assets/icons/collapse.png')}
    size="mediumBig"
  />
);

export const DisabledExpandButton = () => (
  <DisabledIconButton
    iconModule={require('../../assets/icons/expand.png')}
    size="mediumBig"
  />
);

export const NavigateBackButton = ({ onPress }) => (
  <IconButton
    iconModule={require('../../assets/icons/navigate_back.png')}
    onPress={onPress}
    size="mediumBig"
  />
);

export const XNavigateBackButton = ({ onPress }) => (
  <IconButton
    iconModule={require('../../assets/icons/close/close_black.png')}
    onPress={onPress}
    size="mediumBig"
  />
);

export const RecordButton = ({ onPress }) => (
  <IconButton
    iconModule={require('../../assets/icons/chat/record_audio.png')}
    onPress={onPress}
    size="huge"
    style={{
      marginBottom: 8,
    }}
  />
);

export const StopRecordingButton = ({ onPress }) => (
  <IconButton
    iconModule={require('../../assets/icons/chat/stop_record_audio.png')}
    onPress={onPress}
    size="huge"
  />
);

export const HiddenDisabledButton = ({ size = 'medium' }) => (
  <DisabledIconButton size={size} />
);

// Animation buttons

export const AnimationButton = ({
  animationModule,
  onPress,
  width,
  size = 'big',
  _ButtonComponent = StyledButton,
}) => {
  width =
    width ||
    {
      small: 16,
      medium: 20,
      mediumBig: 24,
      big: 40,
      huge: 56,
    }[size];
  return (
    <_ButtonComponent onPress={onPress} hitSlop={hitSlop}>
      <Lottie
        ref={(animation) => {
          animation ? animation.play() : null;
        }}
        style={{
          height: width,
          width: width,
          backgroundColor: 'transparent',
        }}
        loop={true}
        source={animationModule}
      />
    </_ButtonComponent>
  );
};

export const DisabledAnimationButton = ({ animationModule, width, size }) =>
  AnimationButton({
    animationModule,
    width,
    size,
    _ButtonComponent: StyledDisabledButton,
  });

export const StopRecordingAnimationButton = ({ onPress }) => (
  <AnimationButton
    animationModule={require('../../assets/animations/hedvig_voice_recording_animation.json')}
    onPress={onPress}
    size="huge"
  />
);
