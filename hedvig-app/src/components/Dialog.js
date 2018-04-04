import React from 'react';
import PropTypes from 'prop-types';
import { Dimensions, BackHandler, Text } from 'react-native';
import PopupDialog from 'react-native-popup-dialog';
import { theme } from 'hedvig-style';
import {
  DialogContainer,
  Heading,
  Paragraph,
  ButtonsContainer,
} from './styles/dialog';
import { DialogButton } from './Button';

/**
 * Props:
 * * `message`, ex: {title: "<some title>", paragraph: "<some paragraph>"}
 * * `dismissButtonTitle`, ex: "Confirm"
 * * `dismissButtonOnPress`, ex: () => console.log("Confirm pressed")
 * * `confirmButtonTitle`, ex: "Cancel"
 * * `confirmButtonOnPress`, ex: () => console.log("Cancel pressed")
 */
export default class Dialog extends React.Component {
  static propTypes = {
    message: PropTypes.object.isRequired, // TODO Better definition of message type
  };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  onBackPress = () => {
    if (this.props.message.title) {
      this.dismissButtonPressed();
      return true;
    }
  };

  componentDidUpdate() {
    if (this.props.message.title) {
      this.popupDialog.show();
    } else {
      this.popupDialog.dismiss();
    }
  }

  close() {
    this.popupDialog.dismiss();
    this.props.emptyDialog();
  }

  confirmButtonPressed() {
    this.props.confirmButtonPressed();
    this.close();
  }

  dismissButtonPressed() {
    this.props.dismissButtonPressed();
    this.close();
  }

  buttons() {
    let title = this.props.message.dismissButtonTitle || 'Ok';
    const dismissButton = (
      <DialogButton
        title={title}
        onPress={() => this.dismissButtonPressed()}
        borderRight={this.props.message.confirmButtonTitle ? true : false}
      />
    );
    let confirmButton;
    if (this.props.message.confirmButtonTitle) {
      confirmButton = (
        <DialogButton
          title={this.props.message.confirmButtonTitle}
          onPress={() => this.confirmButtonPressed()}
        />
      );
    }

    return (
      <ButtonsContainer>
        {dismissButton}
        {confirmButton}
      </ButtonsContainer>
    );
  }

  render() {
    let window = Dimensions.get('window');
    let width = window.width - 2 * theme.mobile.margin.big;
    return (
      <PopupDialog
        ref={(popupDialog) => {
          this.popupDialog = popupDialog;
        }}
        dismissOnTouchOutside={false}
        width={width}
        height={1}
        style={{ backgroundColor: 'blue' }}
        dialogStyle={{
          backgroundColor: 'transparent',
          justifyContent: 'center',
        }}
      >
        {this.props.message.title ? (
          <DialogContainer>
            <Heading>{this.props.message.title}</Heading>
            <Paragraph>{this.props.message.paragraph}</Paragraph>
            {this.buttons()}
          </DialogContainer>
        ) : (
          <Text />
        )}
      </PopupDialog>
    );
  }
}
