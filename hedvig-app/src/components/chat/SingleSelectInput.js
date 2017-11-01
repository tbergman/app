import R from "ramda"
import React from "react"
import { Text, View, TouchableOpacity, Linking } from "react-native"
import { WebBrowser } from "expo"
import { SingleSelectOptionButton } from "../Button"
import {
  StyledRightAlignedOptions,
  StyledMarginContainer
} from "../styles/chat"

const SingleSelectInput = ({
  message,
  selectChoice,
  done,
  launchModal = R.identity
}) => {
  let opts = message.body.choices.map(choice => {
    return (
      <StyledRightAlignedOptions key={choice.text}>
        <SingleSelectOptionButton
          title={choice.text}
          onPress={() => {
            if (choice.type === "selection") {
              selectChoice(message, choice)
              done(message)
            } else if (choice.type === "link" && choice.view !== null) {
              selectChoice(message, choice)
              done(message)
              launchModal(choice)
            } else if (choice.type === "link" && choice.appUrl !== null) {
              selectChoice(message, choice)
              done(message)
              Linking.openURL(choice.appUrl)
            } else if (choice.type === "link" && choice.webUrl !== null) {
              selectChoice(message, choice)
              done(message)
              WebBrowser.openBrowserAsync(choice.webUrl)
            }
          }}
        />
      </StyledRightAlignedOptions>
    )
  })
  return <StyledMarginContainer>{opts}</StyledMarginContainer>
}

export default SingleSelectInput
