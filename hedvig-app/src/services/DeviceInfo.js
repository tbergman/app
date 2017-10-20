import R from "ramda"
import { Constants } from "expo"
import { Dimensions } from "react-native"

export function getDeviceInfo() {
  return {
    ...R.pick(
      [
        "appOwnership",
        "expoVersion",
        "deviceId",
        "deviceName",
        "deviceYearClass",
        "isDevice",
        "platform",
        "sessionId",
        "statusBarHeight",
        "linkingUri"
      ],
      Constants
    ),
    deviceHeight: Dimensions.get("window").height,
    deviceWidth: Dimensions.get("window").width
  }
}
