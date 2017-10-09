import R from "ramda"
import React from "react"
import { TouchableOpacity, Text, Image } from "react-native"
import { Permissions, ImagePicker } from "expo"
import styled from "styled-components/native"

const StyledView = styled.View`border: solid 1px black;`

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
    <StyledView>
      <TouchableOpacity
        onPress={() => getAndUploadImage("camera", message, upload)}
      >
        <Text>Take a photo</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => getAndUploadImage("picker", message, upload)}
      >
        <Text>Choose a photo</Text>
      </TouchableOpacity>
    </StyledView>
  )
}

const sendPhotoLink = (message, reset, done) => {
  return (
    <StyledView>
      <Image source={{ uri: message._inputValue }} style={{ height: 200 }} />
      <TouchableOpacity onPress={() => reset(message)}>
        <Text>Reset</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => done(message)}>
        <Text>Send</Text>
      </TouchableOpacity>
    </StyledView>
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
