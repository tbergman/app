import React from "react"
import { Permissions, ImagePicker } from "expo"
import { SingleSelectOptionButton } from "../Button"
import {
  StyledMarginContainer,
  StyledRightAlignedOptions
} from "../styles/chat"

const getPermissions = async () => {
  await Permissions.askAsync(Permissions.CAMERA)
}

const getAndUploadImage = async (mode, message, upload) => {
  let imageData
  if (mode === "camera") {
    imageData = await ImagePicker.launchCameraAsync({
      // allowsEditing: true
    })
  } else if (mode === "picker") {
    imageData = await ImagePicker.launchImageLibraryAsync({
      // allowsEditing: true
    })
  }
  let { uri } = imageData
  upload(message, { uri, type: "image/jpeg" })
}

const choosePhotoAndUpload = (upload, message) => {
  getPermissions()
  return (
    <StyledMarginContainer>
      <StyledRightAlignedOptions>
        <SingleSelectOptionButton
          onPress={() => getAndUploadImage("camera", message, upload)}
          title="Ta en bild"
        />
      </StyledRightAlignedOptions>
      <StyledRightAlignedOptions>
        <SingleSelectOptionButton
          onPress={() => getAndUploadImage("picker", message, upload)}
          title="Välj en bild"
        />
      </StyledRightAlignedOptions>
    </StyledMarginContainer>
  )
}

const PhotoInput = ({ message, upload }) => {
  return choosePhotoAndUpload(upload, message)
}

export default PhotoInput
