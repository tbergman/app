import React from "react"
import { Button } from "react-native"

export const Link = ({ to, title, navigateTo }) => {
  return (
    <Button
      title={title}
      onPress={() => {
        navigateTo(to)
      }}
    />
  )
}

export const ClaimLink = ({ title, createClaimAndNavigateToChat }) => {
  return (
    <Button
      title={title}
      onPress={() => {
        createClaimAndNavigateToChat()
      }}
    />
  )
}
