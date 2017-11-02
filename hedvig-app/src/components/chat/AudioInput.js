import R from "ramda"
import React from "react"
import { View, Text, Button } from "react-native"
import { Audio, Permissions } from "expo"
import {
  RecordButton,
  StopRecordingButton,
  StopRecordingAnimationButton,
  SingleSelectOptionButton
} from "../Button"
import { UploadingAnimation } from "../Animation"
import {
  StyledMarginContainer,
  StyledRightAlignedOptions
} from "../styles/chat"
import { StyledPassiveText } from "../styles/text"
import { emitScrollToEndEvent } from "../../services/MessageListScroll"

export default class AudioInput extends React.Component {
  state = {
    isRecording: false,
    recordingInstance: null,
    permissionGranted: null,
    recordingStatus: { isDoneRecording: false },
    sound: null,
    playbackStatus: null,
    isPlaying: false
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log("State change", prevState, this.state)
    setTimeout(() => emitScrollToEndEvent(), 200)
  }

  onRecordingStatusUpdate(status) {
    console.log("Recording status update", status)
    this.setState({ recordingStatus: status })
  }

  async getPermissions() {
    console.log("Getting audio recording permissions")
    const { status } = await Permissions.getAsync(Permissions.AUDIO_RECORDING)
    console.log("Audio recording permissions:", status)
    try {
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        allowsRecordingIOS: true,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DUCK_OTHERS,
        shouldDuckAndroid: true,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS
      })
      this.setState({ permissionGranted: status === "granted" })
    } catch (error) {
      console.warn("Audio.setAudioModeAsync error", error)
      this.setState({ permissionGranted: false })
    }
  }

  async askPermissions() {
    console.log("Asking for audio recording permissions")
    let askResult = await Permissions.askAsync(Permissions.AUDIO_RECORDING)
    console.log("Audio recording permissions:", askResult)
    if (askResult.status !== "granted") {
      this.props.showPermissionDialog()
    }
    this.setState({ permissionGranted: askResult.status === "granted" })
  }

  async startRecordingAudio(message) {
    try {
      console.log("Creating and preparing recorder")
      const recordingInstance = new Audio.Recording()
      recordingInstance.setProgressUpdateInterval(100)
      recordingInstance.setOnRecordingStatusUpdate(
        this.onRecordingStatusUpdate.bind(this)
      )
      if (this.state.sound) {
        this.state.sound.setOnPlaybackStatusUpdate(null)
        await this.state.sound.unloadAsync()
      }
      await this.setState({
        recordingInstance,
        sound: null,
        playbackStatus: null,
        isPlaying: false
      })
      let prepareResult = await this.state.recordingInstance.prepareToRecordAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      )
      console.log("Audio recording prepare result", prepareResult)
      this.setState({ isRecording: true })
      console.log("Starting recording!")
      await this.state.recordingInstance.startAsync()
    } catch (error) {
      this.setState({ isRecording: false })
      console.warn("Audio recording error:", error)
    }
  }

  async stopRecordingAudio(message) {
    let status = await this.state.recordingInstance.stopAndUnloadAsync()
    console.log("Stopping status", status)
    this.setState({ isRecording: false })
    console.log("Finished recording!", status)
  }

  async onPlaybackStatusUpdate(playbackStatus) {
    this.setState({ playbackStatus })
    console.log("Playback status", playbackStatus)
    if (
      playbackStatus.isPlaying &&
      (playbackStatus.didJustFinish === true ||
        playbackStatus.positionMillis === playbackStatus.durationMillis)
    ) {
      this.stopPlayback()
    }
  }

  async startPlayback() {
    // Need to set allowsRecordingIOS to false to allow playback using the loud speakers
    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DUCK_OTHERS,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS
    })
    let soundToPlay
    if (!this.state.sound) {
      let { sound } = await this.state.recordingInstance.createNewLoadedSound()
      this.setState({ sound })
      soundToPlay = sound
    } else {
      soundToPlay = this.state.sound
    }
    soundToPlay.setProgressUpdateIntervalAsync(100)
    soundToPlay.setVolumeAsync(1.0)
    soundToPlay.setOnPlaybackStatusUpdate(
      this.onPlaybackStatusUpdate.bind(this)
    )
    soundToPlay.playAsync()
    this.setState({ isPlaying: true })
  }

  async stopPlayback() {
    // Flip allowsRecordingIOS to true to allow recording
    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      allowsRecordingIOS: true,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DUCK_OTHERS,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS
    })
    // NOTE: for some reason pause + setPosition works but `stopAsync` doesn't!
    await this.state.sound.pauseAsync()
    await this.state.sound.setPositionAsync(0)
    this.setState({ isPlaying: false })
  }

  upload() {
    // TODO: Send correct type and extension for Android
    this.props.upload(this.props.message, {
      uri: this.state.recordingInstance.getURI(),
      type: "audio/caf",
      fileExtension: "caf"
    })
  }

  render() {
    let message = this.props.message
    if (this.state.permissionGranted === null) {
      this.getPermissions()
    }
    let content
    if (!this.state.permissionGranted) {
      content = (
        <Button
          onPress={() => this.askPermissions()}
          title="Give Hedvig permission to record"
        />
      )
    } else if (
      !this.state.isRecording &&
      !this.state.recordingStatus.isDoneRecording
    ) {
      content = (
        <StyledRightAlignedOptions>
          <RecordButton onPress={() => this.startRecordingAudio(message)} />
        </StyledRightAlignedOptions>
      )
    } else if (this.state.isRecording) {
      content = (
        <StyledRightAlignedOptions>
          <StopRecordingAnimationButton
            onPress={() => this.stopRecordingAudio(message)}
          />
          <StyledPassiveText style={{ marginRight: 16 }}>
            Recording:{" "}
            {(this.state.recordingStatus.durationMillis / 1000.0).toFixed(0)} s
          </StyledPassiveText>
        </StyledRightAlignedOptions>
      )
    }

    let playbackControls
    let maybePlaybackStatus
    if (this.state.sound && this.state.isPlaying) {
      if (this.state.playbackStatus) {
        maybePlaybackStatus = (
          <StyledPassiveText style={{ marginRight: 16 }}>
            Playing:{" "}
            {(this.state.playbackStatus.positionMillis / 1000).toFixed(0)} /{" "}
            {(this.state.playbackStatus.durationMillis / 1000).toFixed(0)} s
          </StyledPassiveText>
        )
      }
      playbackControls = (
        <StyledRightAlignedOptions>
          <StopRecordingButton onPress={this.stopPlayback.bind(this)} />
          {maybePlaybackStatus}
        </StyledRightAlignedOptions>
      )
    }

    let maybePlayback
    if (
      this.state.recordingInstance &&
      this.state.recordingStatus.isDoneRecording &&
      !this.state.isPlaying &&
      !this.props.currentlyUploading
    ) {
      maybePlayback = (
        <View>
          <StyledRightAlignedOptions>
            <SingleSelectOptionButton
              title="Re-record"
              onPress={() => this.startRecordingAudio()}
            />
          </StyledRightAlignedOptions>
          <StyledRightAlignedOptions>
            <SingleSelectOptionButton
              title="Start playback"
              onPress={() => this.startPlayback()}
            />
          </StyledRightAlignedOptions>
          <StyledRightAlignedOptions>
            <SingleSelectOptionButton
              title="Upload"
              onPress={this.upload.bind(this)}
            />
          </StyledRightAlignedOptions>
        </View>
      )
    }

    let maybeUploading
    if (this.props.currentlyUploading) {
      // TODO: Replace with animation
      maybeUploading = (
        <StyledRightAlignedOptions>
          <UploadingAnimation />
        </StyledRightAlignedOptions>
      )
    }
    return (
      <StyledMarginContainer>
        {content}
        {maybePlayback}
        {playbackControls}
        {maybeUploading}
      </StyledMarginContainer>
    )
  }
}
