import React from "react"
import PropTypes from "prop-types"
import { Text, Linking } from "react-native"

const TextLink = ({ to, children }) => (
  <Text
    style={{
      color: "#555555",
      textDecorationLine: "underline",
      lineHeight: 24,
    }}
    onPress={() => Linking.openURL(to)}
  >
    {children}
  </Text>
)

TextLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
}

export { TextLink }
