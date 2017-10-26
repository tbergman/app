import React from "react"
import { Text } from "react-native"
import { DangerZone } from "expo"
const { Lottie } = DangerZone

export default class LoadingIndicator extends React.Component {
  render() {
    if (this.props.loadingMessages && this.props.avatar.data) {
      return (
        <Lottie
          ref={animation => {
            animation ? animation.play() : null
          }}
          style={{
            // TODO: Load from avatar data when we get sane input
            // height: this.props.avatar.height,
            // width: this.props.avatar.width,
            height: 100,
            width: 300,
            backgroundColor: "transparent"
          }}
          source={this.props.avatar.data}
        />
      )
    } else {
      // TODO: Show a loader here if necessary?
      // return <Text>Loading...</Text>
      return null
    }
  }
}
