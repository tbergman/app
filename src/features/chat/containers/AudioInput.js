import React from 'react';
import { View, StyleSheet, Text, Platform } from 'react-native';
import Permissions from 'react-native-permissions';
import { connect } from 'react-redux';
import { AudioRecorder, AudioUtils } from 'react-native-audio';
import Sound from 'react-native-sound';
import {
  chatActions,
  uploadActions,
  dialogActions,
} from '../../../../hedvig-redux';
import {
  RecordButton,
  StopRecordingButton,
  StopRecordingAnimationButton,
} from '../../../components/Button';
import { AnimatedSingleSelectOptionButton } from '../components/Button';
import { UploadingAnimation } from '../../../components/Animation';
import {
  StyledMarginContainer,
  StyledRightAlignedOptions,
} from '../styles/chat';
import { StyledPassiveText } from '../../../components/styles/text';

import { colors } from '../../../style';

const audioPath = `${AudioUtils.DocumentDirectoryPath}/claim.aac`;

const styles = StyleSheet.create({
  preRecordingContainer: {
    flexDirection: 'row',
  },
  preRecordingText: {
    fontFamily: 'CircularStd-Book',
    color: colors.OFF_BLACK,
    fontSize: 12,
    alignSelf: 'center',
    paddingRight: 12,
    paddingBottom: 8,
  },
  playbackStatusText: {
    fontFamily: 'CircularStd-Book',
    color: colors.OFF_BLACK,
    fontSize: 14,
    marginRight: 16,
  },
});

class AudioInput extends React.Component {
  state = {
    isRecording: false,
    recordingTime: 0.0,
    isFinished: false,
  };

  componentDidMount() {
    // TODO This cant be done if we dont have permissions probably
    this.prepareRecordingPath();
    AudioRecorder.onProgress = this.onProgress;
    AudioRecorder.onFinished = this.onFinished;
  }

  prepareRecordingPath = () => {
    AudioRecorder.prepareRecordingAtPath(audioPath, {
      SampleRate: 22050,
      Channels: 1,
      AudioQuality: 'Low',
      AudioEncoding: 'aac',
      AudioEncodingBitRate: 32000,
    });
  };

  onProgress = (data) => {
    this.setState({ recordingTime: Math.floor(data.currentTime) });
  };

  onFinished = (data) => {
    if (Platform === 'ios') {
      this.finishRecording(
        data.status === 'ok',
        data.audioFileURL,
        data.audioFileSize,
      );
    }
  };

  finishRecording = (success, url) => {
    if (!success) {
      this.onError('failed to record');
      return;
    }
    this.setState({ recordingUrl: url });
  };

  onError = (err) => {
    // TODO Handle error
    console.error('Error!', err); // eslint-disable-line no-console
  };

  requestPermissions = async () => {
    if (Platform.OS !== 'android') {
      console.log('Platform was not android, returning true');
      return true;
    }

    const status = await Permissions.check('microphone');
    console.log('Status was: ', status);
    if (status !== 'authorized') {
      // TODO: Notifiy user if they need to take action
      return false;
    }
    return true;
  };

  upload = () => {
    const { recordingUrl } = this.state;
    this.props.upload(this.props.message, {
      uri: recordingUrl,
      type: `audio/x-aac`,
      fileExtension: 'aac',
    });
    this.setState({ hasSentUpload: true });
  };

  startRecording = async () => {
    const hasPermission = await this.requestPermissions();
    if (!hasPermission) {
      return;
    }
    this.setState({ isRecording: true });
    await AudioRecorder.startRecording();
  };

  stopRecording = async () => {
    const filePath = await AudioRecorder.stopRecording();
    if (Platform.OS === 'android') {
      this.finishRecording(true, filePath);
    }
    this.setState({ isRecording: false, isFinished: true });
  };

  restartRecording = () => {
    this.prepareRecordingPath();
    this.setState({ isFinished: false });
  };

  startPlayback = () => {
    const sound = new Sound(audioPath, '', (error) => {
      if (error) {
        console.log('Got error when attempting to play back: ', error);
      }
      this.setState({ isPlayingBack: true, sound });
      sound.play(this.stopPlayback);
    });
  };

  stopPlayback = () => {
    const { sound } = this.state;
    if (sound) {
      sound.stop();
    }
    this.setState({ isPlayingBack: true });
  };

  render() {
    const { message, isUploading } = this.props;
    const {
      isRecording,
      isPlayingBack,
      isFinished,
      recordingTime,
      playbackStatus,
      hasSentUpload,
    } = this.state;
    if (isPlayingBack) {
      return (
        <StyledMarginContainer>
          <StyledRightAlignedOptions>
            <Text style={styles.playbackStatusText}>{playbackStatus}</Text>
            <StopRecordingButton onPress={this.stopPlayback} />
          </StyledRightAlignedOptions>
        </StyledMarginContainer>
      );
    }

    if (isUploading || hasSentUpload) {
      return (
        <StyledMarginContainer>
          <StyledRightAlignedOptions>
            <UploadingAnimation />
          </StyledRightAlignedOptions>
        </StyledMarginContainer>
      );
    }

    if (isRecording) {
      return (
        <StyledMarginContainer>
          <StyledRightAlignedOptions>
            <StopRecordingAnimationButton onPress={this.stopRecording} />
            <StyledPassiveText>Spelar in: {recordingTime}</StyledPassiveText>
          </StyledRightAlignedOptions>
        </StyledMarginContainer>
      );
    }

    if (isFinished) {
      return (
        <StyledMarginContainer>
          <StyledRightAlignedOptions>
            <AnimatedSingleSelectOptionButton
              title="Gör om"
              onPress={this.restartRecording}
            />
          </StyledRightAlignedOptions>
          <StyledRightAlignedOptions>
            <AnimatedSingleSelectOptionButton
              title="Spela upp"
              onPress={this.startPlayback}
            />
          </StyledRightAlignedOptions>
          <StyledRightAlignedOptions>
            <AnimatedSingleSelectOptionButton
              title="Spara"
              onPress={this.upload}
            />
          </StyledRightAlignedOptions>
        </StyledMarginContainer>
      );
    }

    return (
      <StyledMarginContainer>
        <StyledRightAlignedOptions>
          <View style={styles.preRecordingContainer}>
            <Text style={styles.preRecordingText}>{message.body.text}</Text>
            <RecordButton onPress={this.startRecording} />
          </View>
        </StyledRightAlignedOptions>
      </StyledMarginContainer>
    );
  }
}

const mapStateToProps = (state) => {
  let message = state.chat.messages[0];
  return {
    message,
    currentlyUploading: state.upload.currentlyUploading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    showPermissionDialog: () =>
      dispatch(
        dialogActions.showDialog({
          title: 'Inspelning',
          paragraph:
            'Vänligen aktivera ljudinspelning för Hedvig i dina systeminställningar.',
        }),
      ),
    upload: (message, info) =>
      dispatch(
        uploadActions.upload({
          body: info,
          successActionCreator: (url) =>
            chatActions.sendChatResponse(message, {
              type: 'audio',
              url,
            }),
        }),
      ),
  };
};

const AudioInputContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AudioInput);

export default AudioInputContainer;
