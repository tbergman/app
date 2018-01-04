import React from "react"
import { View, Text } from "react-native"
import { DangerZone } from "expo"
const { Lottie } = DangerZone

export default class LoadingIndicator extends React.Component {
  render() {
    if (this.props.loadingMessages && this.props.avatar.data) {
      return (
        <View
          style={{
            height: this.props.avatar.height,
            width: this.props.avatar.width
            // borderWidth: 1,
            // borderColor: "black"
          }}
        >
          <Lottie
            ref={animation => animation ? animation.play() : null}
            style={{
              height: this.props.avatar.height,
              width: this.props.avatar.width,
              backgroundColor: "transparent"
            }}
            loop={true}
            source={this.props.avatar.data}
          />
        </View>
      )
    } else {
      // TODO: Show a loader here if necessary?
      // return <Text>Loading...</Text>
      return null
    }
  }
}
