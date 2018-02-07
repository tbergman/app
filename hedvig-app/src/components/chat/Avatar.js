import React from "react"
import { Animated } from "react-native"
import { DangerZone } from "expo"
const { Lottie } = DangerZone

// TODO PropType validation
export default class Avatar extends React.Component {
  state = {
    progress: new Animated.Value(0)
  }

  play() {
    Animated.timing(this.state.progress, {
      toValue: 1,
      duration: this.props.avatar.duration
    }).start()
  }

  render() {
    if (this.props.avatar.data) {
      return (
        <Lottie
          ref={() => this.play()}
          style={{
            height: this.props.avatar.height,
            width: this.props.avatar.width,
            backgroundColor: "transparent"
          }}
          source={this.props.avatar.data}
          progress={this.state.progress}
        />
      )
    } else {
      return null
    }
  }
}
