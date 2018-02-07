import * as R from "ramda"
import React from "react"
import { TouchableOpacity, Text } from "react-native"
import styled from "styled-components/native"

const StyledView = styled.View`border: solid 1px black;`

const VideoInput = ({ launchVideoRecorder = R.identity }) => {
  return (
    <StyledView>
      <TouchableOpacity onPress={launchVideoRecorder}>
        <Text>Record a video</Text>
      </TouchableOpacity>
    </StyledView>
  )
}

export default VideoInput
