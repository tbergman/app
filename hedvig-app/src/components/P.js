import React from "react"
import Placeholder from "rn-placeholder"

const ImageContentPlaceholder = props => {
  return (
    <Placeholder.ImageContent
      position="left"
      hasRadius
      lineNumber={5}
      textSize={14}
      lineSpacing={5}
      color="lightgray"
      width="100%"
      lastLineWidth="30%"
      firstLineWidth="10%"
    />
  )
}

export default {
  ImageContentPlaceholder
}
