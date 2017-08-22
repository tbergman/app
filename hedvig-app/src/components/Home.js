import React from "react"
import { StyleSheet, Text, View, TextInput } from "react-native"

const Home = ({ state, sayHello }) => {
  return (
    <View style={styles.container}>
      <Text>
        Your name: {state.hello.name}
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
