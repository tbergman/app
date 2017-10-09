import React from "react"
import { View, Text } from "react-native"

import { AssetTracker } from "../../components/asset-tracker/AssetNavigator"
import VideoExample from "../../components/VideoExample"

const VIEW_MAPPING = {
  AssetTracker,
  VideoExample
}

/*
  navigation.state.params contains a `link` object, in the same format
  as `single_select` choices of type `link`. The `view` attribute of this
  link object should be a key in the VIEW_MAPPING above. This View is dynamically
  created using React.createElement below.
*/
const ChatModal = ({ navigation }) => {
  let content = React.createElement(
    VIEW_MAPPING[navigation.state.params.link.view]
  )
  return (
    <View style={{ flex: 1, alignSelf: "stretch" }}>
      {content}
    </View>
  )
}

export default ChatModal
