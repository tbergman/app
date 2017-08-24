import React from "react"
import { StyleSheet, Text, View, TextInput } from "react-native"
import styled from "styled-components/native"

const StyledView = styled.View`
  flex: 1;
  align-self: stretch;
  background-color: white;
  justify-content: center;
  align-items: center;
`

const AnotherScreen = () => {
  return (
    <StyledView>
      <Text>Another Screen</Text>
    </StyledView>
  )
}

export default AnotherScreen
