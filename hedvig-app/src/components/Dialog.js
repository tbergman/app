import React from "react"
import { View, Text, Button } from "react-native"
import PopupDialog, { SlideAnimation, DialogTitle } from 'react-native-popup-dialog'


export default class Dialog extends React.Component {

  componentDidUpdate() {
    if (this.props.message.title) {
      this.popupDialog.show()
    }
  }

  close() {
    this.props.emptyDialog()
    this.popupDialog.dismiss()
  }

  button() {
    return(
      // bottom: 0 has a small goes slightly over the dialog bottom
      <View style={{
        position: "absolute",
        bottom: 1
      }}>
        <Button
          title="Ok"
          onPress={() => this.close()}
        />
      </View>
    )
  }

  render() {
    return (
      <PopupDialog
        ref={(popupDialog) => { this.popupDialog = popupDialog }}
        dialogTitle={<DialogTitle title={this.props.message.title || "No title"} />}
        style={{flex: 1}}
      >
        <View style={{ alignItems: "center", padding: 20, flex: 1 }}>
          <Text>{this.props.message.paragraph}</Text>
          {this.button()}
        </View>
      </PopupDialog>
    )
  }
}
