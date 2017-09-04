import React from "react"
import { Button, StyleSheet, View } from "react-native"
import { DangerZone } from "expo"
const { Lottie } = DangerZone
import animationJson from "../animations/data.json"
window.animationJson = animationJson

export default class App extends React.Component {
  state = {
    animation: null
  }

  componentWillMount() {
    this._playAnimation()
  }

  render() {
    return (
      <View style={styles.animationContainer}>
        <Button title="Restart Animation" onPress={this._playAnimation} />
        {this.state.animation && (
          <Lottie
            ref={animation => {
              this.animation = animation
            }}
            style={{
              height: 108 * 2,
              width: 192 * 2,
              backgroundColor: "transparent"
            }}
            source={animationJson}
          />
        )}
      </View>
    )
  }

  _playAnimation = () => {
    if (!this.state.animation) {
      this._loadAnimationAsync()
    } else {
      this.animation.reset()
      this.animation.play()
    }
  }

  _loadAnimationAsync = async () => {
    this.setState({ animation: animationJson }, this._playAnimation)
  }
}

const styles = StyleSheet.create({
  animationContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white"
  },
  buttonContainer: {
    paddingTop: 20
  }
})
