import React from "react"
import { Text, View } from "react-native"
import Link from "../containers/Link"
import { BaseViewStyle } from "./Styles"
import Placeholder from "rn-placeholder"

export default class Intro extends React.Component {
  static navigationOptions = {
    title: "Intro"
  }

  constructor() {
    super()
    this.state = {
      ready: false
    }
  }

  wait() {
    setTimeout(() => {
      this.setState({
        ready: true
      })
    }, 2000)
  }

  render() {
    this.wait()
    return (
      <BaseViewStyle>
        <Text>Intro</Text>

        <Placeholder.ImageContent
          position="right"
          hasRadius
          lineNumber={5}
          textSize={14}
          lineSpacing={5}
          color="#00ff00"
          width="100%"
          lastLineWidth="30%"
          firstLineWidth="10%"
          onReady={this.state.ready}
        >
          <Link to="Login" title="Login" />
        </Placeholder.ImageContent>
      </BaseViewStyle>
    )
  }
}
