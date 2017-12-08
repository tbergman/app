import React from "react"
import { View, Text, Dimensions } from "react-native"
import PopupDialog, {
  SlideAnimation,
  DialogTitle
} from "react-native-popup-dialog"
import { theme } from "hedvig-style"
import {
  TextContainer,
  Heading,
  Paragraph,
  ButtonsContainer
} from "./styles/dialog"
import { DialogButton } from "./Button"

/**
 * Props:
 * * `message`, ex: {title: "<some title>", paragraph: "<some paragraph>"}
 * * `dismissButtonTitle`, ex: "Confirm"
 * * `dismissButtonOnPress`, ex: () => console.log("Confirm pressed")
 * * `confirmButtonTitle`, ex: "Cancel"
 * * `confirmButtonOnPress`, ex: () => console.log("Cancel pressed")
 */
export default class Dialog extends React.Component {
  componentDidUpdate() {
    if (this.props.message.title) {
      this.popupDialog.show()
    } else {
      this.popupDialog.dismiss()
    }
  }

  close() {
    this.popupDialog.dismiss()
    this.props.emptyDialog()
  }

  confirmButtonPressed() {
    this.props.confirmButtonPressed()
    this.close()
  }

  dismissButtonPressed() {
    this.props.dismissButtonPressed()
    this.close()
  }

  buttons() {
    let title = this.props.message.dismissButtonTitle || "Ok"
    dismissButton = (
      <DialogButton title={title} onPress={() => this.dismissButtonPressed()} />
    )
    let confirmButton
    if (this.props.message.confirmButtonTitle) {
      confirmButton = (
        <DialogButton
          title={this.props.message.confirmButtonTitle}
          onPress={() => this.confirmButtonPressed()}
          borderRight={true}
        />
      )
    }

    return (
      <ButtonsContainer>
        {dismissButton}
        {confirmButton}
      </ButtonsContainer>
    )
  }

  render() {
    let window = Dimensions.get("window")
    let width = window.width - 2 * theme.mobile.margin.big
    return (
      <PopupDialog
        ref={popupDialog => {
          this.popupDialog = popupDialog
        }}
        dismissOnTouchOutside={false}
        width={width}
        height={0.4}
        style={{ flex: 1 }}
      >
        <TextContainer>
          <Heading>{this.props.message.title}</Heading>
          <Paragraph>{this.props.message.paragraph}</Paragraph>
        </TextContainer>
        {this.buttons()}
      </PopupDialog>
    )
  }
}
