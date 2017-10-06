import React from "react"
import { Text, View, TouchableOpacity } from "react-native"

const MultipleSelectInput = ({ message, onChoiceSelected, done }) => {
  let opts = message.body.choices.map(choice => {
    return (
      <TouchableOpacity
        key={choice.text}
        onPress={() => {
          onChoiceSelected(message, choice)
        }}
      >
        <Text>
          {choice.text} {choice.selected ? "✅" : "❌"}
        </Text>
      </TouchableOpacity>
    )
  })
  return (
    <View>
      {opts}
      <TouchableOpacity
        onPress={() => {
          done(message)
        }}
      >
        <Text>DONE</Text>
      </TouchableOpacity>
    </View>
  )
}

export default MultipleSelectInput
