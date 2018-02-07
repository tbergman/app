import React from "react"
import PropTypes from "prop-types"
import { Text, Linking } from "react-native"

const TextLink = ({ to, children }) => (
  <Text
    style={{
      color: "#555555",
      textDecorationLine: "underline",
      lineHeight: 24
    }}
    hitSlop={{top: 20, bottom: 20, left: 14, right: 14}}
    onPress={() => Linking.openURL(to)}
  >
    {children}
  </Text>
)

TextLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired
}

export { TextLink }
