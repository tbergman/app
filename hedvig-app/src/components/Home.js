import React from "react"
import { StyleSheet, Text, View, TextInput } from "react-native"
import styled from "styled-components/native"

const Name = styled.Text`font-size: 30px;`

const Home = ({ state, sayHello }) => {
  return (
    <View style={styles.container}>
      <Text>
        Your name: <Name>{state.hello.name}</Name>
      </Text>
      <TextInput
        value={state.hello.name}
        onChangeText={text => sayHello(text)}
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          alignSelf: "stretch"
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "stretch",
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
})

export default Home
