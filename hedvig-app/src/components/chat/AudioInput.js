import R from "ramda"
import React from "react"
import { View, Text, Button } from "react-native"
import { Audio, Permissions } from "expo"

export default class AudioInput extends React.Component {
  state = {
    isRecording: false,
    recordingInstance: null,
    permissionGranted: null,
    recordingStatus: null,
    sound: null,
    playbackStatus: null,
    isPlaying: false
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
    } else if (!this.state.isRecording) {
      content = (
        <Button
          onPress={() => this.startRecordingAudio(message)}
          title="Start recording"
        />
      )
    } else {
      content = (
        <View>
          <Button
            onPress={() => this.stopRecordingAudio(message)}
            title="Stop recording"
          />
          <Text>
            Recording:{" "}
            {(this.state.recordingStatus.durationMillis / 1000.0).toFixed(1)} s
          </Text>
        </View>
      )
    }

    let playbackControls
    let maybePlaybackStatus
    if (this.state.sound && this.state.isPlaying) {
      if (this.state.playbackStatus) {
        maybePlaybackStatus = (
          <Text>
            Playing:{" "}
            {(this.state.playbackStatus.positionMillis /
              this.state.playbackStatus.durationMillis *
              100).toFixed(0)}{" "}
            %
          </Text>
        )
      }
      playbackControls = (
        <View>
          <Button
            title="Stop playback"
            onPress={this.stopPlayback.bind(this)}
          />
          {maybePlaybackStatus}
        </View>
      )
    }

    let maybePlayback
    if (
      this.state.recordingInstance &&
      this.state.recordingStatus.isDoneRecording &&
      !this.state.isPlaying
    ) {
      maybePlayback = (
        <View>
          <Button title="Start playback" onPress={() => this.startPlayback()} />
          <Button title="Upload" onPress={this.upload.bind(this)} />
        </View>
      )
    }
    return (
      <View style={{ flex: 1, alignSelf: "stretch" }}>
        {content}
        {maybePlayback}
        {playbackControls}
      </View>
    )
  }
}
