import React from "react"
import { StyleSheet, Text, View, TextInput } from "react-native"
import styled from "styled-components/native"
import { Link } from "../containers/Link"

const Name = styled.Text`
  font-size: 30px;
`

const Home = ({ state, sayHello }) => {
  return (
    <View style={styles.container}>
      <Text>
        Your name: <Name>{state.hello.name}</Name>
      </Text>
      <TextInput
        value={state.hello.name}
        underlineColorAndroid="transparent"
        onChangeText={text => sayHello(text)}
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          alignSelf: "stretch"
        }}
      />
      <Link to="AnotherScreen" title="Go to another screen" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "stretch",
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start"
  }
})

export default Home
