import React from "react"
import { View } from "react-native"

import Offer from "../../containers/dashboard/Offer"

const VIEW_MAPPING = {
  Offer
}

/*
  navigation.state.params contains a `link` object, in the same format
  as `single_select` choices of type `link`. The `view` attribute of this
  link object should be a key in the VIEW_MAPPING above. This View is dynamically
  created using React.createElement below.
*/

const ChatModal = ({ navigation }) => {
  let content = React.createElement(
    VIEW_MAPPING[navigation.state.params.link.view],
    { navigation }
  )
  return (
    <View style={{ flex: 1, alignSelf: "stretch" }}>
      {/* <Button
        title="Close"
        onPress={() => {
          modalClosed()
          navigation.goBack()
        }}
      /> */}
      {content}
    </View>
  )
}

export default ChatModal
