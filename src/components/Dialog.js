import React from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions,
  BackHandler,
  Text,
  StyleSheet,
  Modal,
  View,
  StatusBar,
} from 'react-native';
import { theme } from '../style-theme';
import {
  DialogContainer,
  Heading,
  Paragraph,
  ButtonsContainer,
} from './styles/dialog';
import { DialogButton } from './Button';
import { colors } from '../style';

// TODO Clean up this mess

const styles = StyleSheet.create({
  dialogStyle: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

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

  state = {
    visible: false,
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
      this.open();
    } else {
      this.close();
    }
  }

  open() {
    if (this.state.visible) return;
    this.setState({ visible: true });
  }

  close() {
    if (!this.state.visible) return;
    this.setState({ visible: false });
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
    const window = Dimensions.get('window');
    const width = window.width - 2 * theme.mobile.margin.big;
    return (
      <Modal visible={this.state.visible} transparent animationType="fade">
        <StatusBar animated barStyle="light-content" />
        <View style={styles.dialogStyle}>
          <View style={{ width }}>
            {this.props.message.title ? (
              <DialogContainer>
                <Heading>{this.props.message.title}</Heading>
                <Paragraph>{this.props.message.paragraph}</Paragraph>
                {this.buttons()}
              </DialogContainer>
            ) : (
              <Text />
            )}
          </View>
        </View>
      </Modal>
    );
  }
}
