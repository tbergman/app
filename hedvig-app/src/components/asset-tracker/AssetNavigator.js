import React from "react"
import { View } from "react-native"
import { StackNavigator } from "react-navigation"

import AssetList from "../../containers/asset-tracker/AssetList"
import AddEditAsset from "../../containers/asset-tracker/AddEditAsset"

const AssetNavigator = StackNavigator(
  {
    AssetList: {
      screen: AssetList
    },
    AddEditAsset: {
      screen: AddEditAsset
    }
  },
  {
    mode: "modal",
    headerMode: "none"
  }
)

const AssetTracker = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <AssetNavigator navigation={navigation} />
    </View>
  )
}

export { AssetNavigator, AssetTracker }
