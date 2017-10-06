import React from "react"
import VideoCamera from "./VideoCamera"
import VideoPlayer from "./VideoPlayer"

export default class VideoExample extends React.Component {
  state = {
    recordedFile: null
  }

  render() {
    return this.state.recordedFile ? (
      <VideoPlayer file={this.state.recordedFile} />
    ) : (
      <VideoCamera
        onFinishedRecording={recordedFile =>
          this.setState({
            recordedFile
          })}
      />
    )
  }
}
