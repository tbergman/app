import React from "react"
import { Text, View, TouchableOpacity } from "react-native"

const SingleSelectInput = ({ message, done }) => {
  let opts = message.body.choices.map(choice => {
    return (
      <TouchableOpacity
        key={choice.text}
        onPress={() => {
          done(message, choice)
        }}
      >
        <Text>
          {choice.text}
        </Text>
      </TouchableOpacity>
    )
  })
  return (
    <View>
      {opts}
    </View>
  )
}

export default SingleSelectInput
