import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Camera, Permissions, Audio } from 'expo';

export default class VideoCamera extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    recording: false,
  };

  async componentDidMount() {
    const camera_permission = await Permissions.askAsync(Permissions.CAMERA);
    const camera_granted = camera_permission.status === 'granted';
    const audio_recording_permission = await Permissions.askAsync(
      Permissions.AUDIO_RECORDING,
    );
    const audio_recording_granted =
      audio_recording_permission.status === 'granted';
    if (camera_granted && audio_recording_granted) {
      Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        allowsRecordingIOS: true,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_MIX_WITH_OTHERS,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
        shouldDuckAndroid: true,
      });
      this.setState({
        hasCameraPermission: true,
      });
    }
  }

  toggleRecord() {
    this.setState({
      recording: !this.state.recording,
    });
    if (this.state.recording) {
      this.camera.stopRecording();
    } else {
      this.camera
        .recordAsync({
          quality: '480p',
          mute: true,
        })
        .then((data) => {
          this.props.onFinishedRecording(data);
        });
    }
  }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera
            style={{ flex: 1 }}
            type={this.state.type}
            ref={(ref) => {
              this.camera = ref;
            }}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}
            >
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.toggleRecord();
                }}
              >
                <Text
                  style={{ fontSize: 18, marginBottom: 10, color: 'white' }}
                >
                  {this.state.recording ? 'Stop' : 'Start'}
                </Text>
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      );
    }
  }
}
