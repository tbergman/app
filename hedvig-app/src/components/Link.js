import React from "react"
import { Button } from "react-native"

const Link = ({ to, title, navigateTo }) => {
  return (
    <Button
      title={title}
      onPress={() => {
        navigateTo(to)
      }}
    />
  )
}

export default Link
