import React from "react"
import { Text, View, TouchableOpacity, CameraRoll } from "react-native"
import { Video } from "expo"

export default class VideoPlayer extends React.Component {
  save() {
    CameraRoll.saveToCameraRoll(this.props.file.uri)
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Video
          source={this.props.file}
          rate={1.0}
          volume={1.0}
          muted={false}
          resizeMode="cover"
          shouldPlay
          isLooping
          style={{ flex: 10, alignSelf: "stretch" }}
        />
        <TouchableOpacity
          style={{
            flex: 1,
            alignSelf: "flex-end",
            alignItems: "center"
          }}
          onPress={() => {
            this.save()
          }}
        >
          <Text style={{ fontSize: 18, marginBottom: 10 }}>Save</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
