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

  componentDidMount() {
    this._playAnimation()
  }

  render() {
    return (
      <View style={styles.animationContainer}>
        <Button title="Restart Animation" onPress={this._playAnimation} />
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
      </View>
    )
  }

  _playAnimation = () => {
    this.animation.reset()
    this.animation.play()
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
