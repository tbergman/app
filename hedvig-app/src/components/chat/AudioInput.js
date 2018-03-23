import React from 'react';
import { Audio, Permissions } from 'expo';
import { View } from 'react-native';
import {
  RecordButton,
  StopRecordingButton,
  StopRecordingAnimationButton,
  SingleSelectOptionButton,
} from '../Button';
import { UploadingAnimation } from '../Animation';
import {
  StyledMarginContainer,
  StyledRightAlignedOptions,
} from '../styles/chat';
import { StyledSmallText } from '../styles/text';
import { StyledPassiveText } from '../styles/text';

export default class AudioInput extends React.Component {
  state = {
    isRecording: false,
    recordingInstance: null,
    permissionGranted: null,
    recordingStatus: { isDoneRecording: false },
    sound: null,
    playbackStatus: null,
    isPlaying: false,
    hasSentUpload: false,
  };

  componentDidMount() {
    Permissions.getAsync(Permissions.AUDIO_RECORDING).then(status =>
      this.setState({ permissionGranted: status.status === 'granted' }),
    );
  }

  onRecordingStatusUpdate(status) {
    this.setState({ recordingStatus: status });
  }

  async askPermissions() {
    const askResult = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    if (askResult.status !== 'granted') {
      this.props.showPermissionDialog();
    }
    this.setState({ permissionGranted: askResult.status === 'granted' });
    return askResult.status === 'granted';
  }

  async startRecordingAudio() {
    if (!this.state.permissionGranted) {
      const askResult = await this.askPermissions();
      if (!askResult) {
        this.setState({ isRecording: false });
        return;
      }
    }
    try {
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        allowsRecordingIOS: true,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DUCK_OTHERS,
        shouldDuckAndroid: true,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
      });
      await this.setState({
        recordingStatus: { ...this.state.recordingStatus, durationMillis: 0 },
      });
      const recordingInstance = new Audio.Recording();
      recordingInstance.setProgressUpdateInterval(100);
      recordingInstance.setOnRecordingStatusUpdate(
        this.onRecordingStatusUpdate.bind(this),
      );
      if (this.state.sound) {
        this.state.sound.setOnPlaybackStatusUpdate(null);
        await this.state.sound.unloadAsync();
      }
      await this.setState({
        recordingInstance,
        sound: null,
        playbackStatus: null,
        isPlaying: false,
      });
      await this.state.recordingInstance.prepareToRecordAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY,
      );
      this.setState({ isRecording: true });
      await this.state.recordingInstance.startAsync();
    } catch (error) {
      this.setState({ isRecording: false });
    }
  }

  async stopRecordingAudio() {
    await this.state.recordingInstance.stopAndUnloadAsync();
    this.setState({ isRecording: false });
  }

  async onPlaybackStatusUpdate(playbackStatus) {
    this.setState({ playbackStatus });
    if (
      playbackStatus.isPlaying &&
      (playbackStatus.didJustFinish === true ||
        playbackStatus.positionMillis === playbackStatus.durationMillis)
    ) {
      this.stopPlayback();
    }
  }

  async startPlayback() {
    // Need to set allowsRecordingIOS to false to allow playback using the loud speakers
    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DUCK_OTHERS,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
    });
    let soundToPlay;
    if (!this.state.sound) {
      let { sound } = await this.state.recordingInstance.createNewLoadedSound();
      this.setState({ sound });
      soundToPlay = sound;
    } else {
      soundToPlay = this.state.sound;
    }
    soundToPlay.setProgressUpdateIntervalAsync(100);
    soundToPlay.setVolumeAsync(1.0);
    soundToPlay.setOnPlaybackStatusUpdate(
      this.onPlaybackStatusUpdate.bind(this),
    );
    soundToPlay.playAsync();
    this.setState({ isPlaying: true });
  }

  async stopPlayback() {
    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      allowsRecordingIOS: true,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DUCK_OTHERS,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
    });
    // NOTE: for some reason pause + setPosition works but `stopAsync` doesn't!
    await this.state.sound.pauseAsync();
    await this.state.sound.setPositionAsync(0);
    this.setState({ isPlaying: false });
  }

  upload() {
    const uri = this.state.recordingInstance.getURI();
    const uriParts = uri.split('.');
    const extension = uriParts[uriParts.length - 1];
    this.props.upload(this.props.message, {
      uri: this.state.recordingInstance.getURI(),
      type: `audio/x-${extension}`,
      fileExtension: extension,
    });
    this.setState({ hasSentUpload: true });
  }

  render() {
    // TODO Refactor this entire method
    const content = (
      <StyledRightAlignedOptions>
        {!this.state.isRecording ? (
          <View style={{ flexDirection: 'row' }}>
            {!this.state.recordingStatus.isDoneRecording ? (
              <StyledSmallText
                style={{
                  alignSelf: 'center',
                  paddingRight: 12,
                  paddingBottom: 8,
                }}
              >
                {this.props.message.body.text}
              </StyledSmallText>
            ) : null}
            <RecordButton
              onPress={() => this.startRecordingAudio(this.props.message)}
            />
          </View>
        ) : (
          <View>
            <StopRecordingAnimationButton
              onPress={() => this.stopRecordingAudio(this.props.message)}
            />
            <StyledPassiveText>
              Spelar in:{' '}
              {(this.state.recordingStatus.durationMillis / 1000.0).toFixed(0)}{' '}
              s
            </StyledPassiveText>
          </View>
        )}
      </StyledRightAlignedOptions>
    );

    let playbackControls;
    let maybePlaybackStatus;
    if (this.state.sound && this.state.isPlaying) {
      if (this.state.playbackStatus) {
        maybePlaybackStatus = (
          <StyledPassiveText style={{ marginRight: 16 }}>
            Spelar:{' '}
            {(this.state.playbackStatus.positionMillis / 1000).toFixed(0)} /{' '}
            {(this.state.playbackStatus.durationMillis / 1000).toFixed(0)} s
          </StyledPassiveText>
        );
      }
      playbackControls = (
        <StyledRightAlignedOptions>
          <StopRecordingButton onPress={this.stopPlayback.bind(this)} />
          {maybePlaybackStatus}
        </StyledRightAlignedOptions>
      );
    }

    let maybePlayback;
    if (
      this.state.recordingInstance &&
      this.state.recordingStatus.isDoneRecording &&
      !this.state.isPlaying &&
      !this.props.currentlyUploading &&
      !this.state.hasSentUpload
    ) {
      maybePlayback = (
        <View>
          <StyledRightAlignedOptions>
            <SingleSelectOptionButton
              title="Gör om"
              onPress={() => this.startRecordingAudio()}
            />
          </StyledRightAlignedOptions>
          <StyledRightAlignedOptions>
            <SingleSelectOptionButton
              title="Spela upp"
              onPress={() => this.startPlayback()}
            />
          </StyledRightAlignedOptions>
          <StyledRightAlignedOptions>
            <SingleSelectOptionButton
              title="Spara"
              onPress={this.upload.bind(this)}
            />
          </StyledRightAlignedOptions>
        </View>
      );
    }

    let maybeUploading;
    if (this.props.currentlyUploading || this.state.hasSentUpload) {
      // TODO: Replace with animation
      maybeUploading = (
        <StyledRightAlignedOptions>
          <UploadingAnimation />
        </StyledRightAlignedOptions>
      );
    }
    return (
      <StyledMarginContainer>
        {content}
        {maybePlayback}
        {playbackControls}
        {maybeUploading}
      </StyledMarginContainer>
    );
  }
}
