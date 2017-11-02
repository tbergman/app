import React from "react"
import { DisabledAnimationButton } from "./Button"

export const UploadingAnimation = () => (
  <DisabledAnimationButton
    animationModule={require("../../assets/animations/hedvig_uploading_animation.json")}
  />
)
