import R from "ramda"
import React from "react"
import { View, Text, Image } from "react-native"
import { Permissions, ImagePicker } from "expo"
import { SingleSelectOptionButton } from "../Button"
import { StyledMarginRightContainer, StyledRightAlignedOptions } from "../styles/chat"

const getPermissions = async () => {
  await Permissions.getAsync(Permissions.CAMERA)
}

const getAndUploadImage = async (mode, message, upload) => {
  let imageData
  if (mode === "camera") {
    imageData = await ImagePicker.launchCameraAsync({
      allowsEditing: true
    })
  } else if (mode === "picker") {
    imageData = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true
    })
  }
  let { uri } = imageData
  upload(message, { uri, type: "image/jpeg" })
}

const choosePhotoAndUpload = (upload, message) => {
  getPermissions()
  return (
    <StyledMarginRightContainer>
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
    </StyledMarginRightContainer>
  )
}

const sendPhotoLink = (message, reset, done) => {
  return (
    <View>
      <Image source={{ uri: message._inputValue }} style={{ height: 200 }} />
      <TouchableOpacity onPress={() => reset(message)}>
        <Text>Reset</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => done(message)}>
        <Text>Send</Text>
      </TouchableOpacity>
    </View>
  )
}

const PhotoInput = ({ message, upload, reset, done }) => {
  if (!message._inputValue) {
    return choosePhotoAndUpload(upload, message)
  } else {
    return sendPhotoLink(message, reset, done)
  }
}

export default PhotoInput
