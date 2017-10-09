import React from 'react';
import { View, Text, StatusBar } from 'react-native';
import { Constants } from 'expo';
import styled from "styled-components/native"
import R from "ramda"

const UnStyledStatusBar = styled.View`
  background-color: transparent
  height: 20
  justify-content: center
  align-items: center
`
// TODO: Fix height for Android maybe with Constants.statusBarHeight

const StyledMessageStatusBar = styled.View`
  background-color: white
  height: 20
  justify-content: center
  align-items: center
`

const StyledWarningStatusBar = styled.View`
  background-color: yellow
  height: 20
  justify-content: center
  align-items: center
`

const StyledErrorStatusBar = styled.View`
  background-color: #C2185B
  height: 20
  justify-content: center
  align-items: center
`

export default class MyStatusBar extends React.Component {
  static navigationOptions = {
    title: "Login"
  }

  messageExists() {
    return this.props.message || this.props.warning || this.props.error ? true : false
  }

  maybeMessage() {
    if (this.props.error) {
      return (
        <StyledErrorStatusBar>
          <Text>{this.props.error}</Text>
        </StyledErrorStatusBar>
      )
    } else if (this.props.warning) {
      return (
        <StyledWarningStatusBar>
          <Text>{this.props.warning}</Text>
        </StyledWarningStatusBar>
      )
    } else if (this.props.message) {
      return (
        <StyledMessageStatusBar>
          <Text>{this.props.message}</Text>
        </StyledMessageStatusBar>
      )
    } else {
      return (
        <UnStyledStatusBar />
      )
    }
  }

  render() {
    return (
      <View>
        {this.maybeMessage()}
        <StatusBar
          hidden={this.messageExists()}
          showHideTransition="slide"
          animated={true}
        />
      </View>
    )
  }
}
