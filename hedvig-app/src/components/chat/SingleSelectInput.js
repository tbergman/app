import R from "ramda"
import React from "react"
import { Text, View, TouchableOpacity, Linking } from "react-native"
import { WebBrowser } from "expo"

const SingleSelectInput = ({ message, done, launchModal = R.identity }) => {
  let opts = message.body.choices.map(choice => {
    return (
      <TouchableOpacity
        key={choice.text}
        onPress={() => {
          if (choice.type === "selection") {
            done(message, choice)
          } else if (choice.type === "link" && choice.view !== undefined) {
            launchModal(choice)
          } else if (choice.type === "link" && choice.appUrl !== undefined) {
            Linking.openURL(choice.appUrl)
          } else if (choice.type === "link" && choice.webUrl !== undefined) {
            WebBrowser.openBrowserAsync(choice.webUrl)
          }
        }}
      >
        <Text>
          {choice.text} {choice.type === "link" ? "➡️" : null}
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
