import React from "react"
import { Animated, Text } from "react-native"
import { DangerZone } from "expo"
const { Lottie } = DangerZone

export default class Avatar extends React.Component {
  state = {
    progress: new Animated.Value(0)
  }

  componentDidMount() {
    this.state.progress.addListener(progress => {
      // console.log("Animation progress", progress.value)
      if (progress.value === 1) {
        console.log("Animation ended")
        this.props.animationEnded()
      }
    })
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
            // TODO: Load from avatar data when we get sane input
            // height: this.props.avatar.height,
            // width: this.props.avatar.width,
            height: 100,
            width: 300,
            backgroundColor: "transparent"
          }}
          source={this.props.avatar.data}
          progress={this.state.progress}
        />
      )
    } else {
      // TODO: Show a loader here if necessary?
      // return <Text>Loading...</Text>
      return null
    }
  }
}
