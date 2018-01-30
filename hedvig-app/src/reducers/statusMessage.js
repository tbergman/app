import Toast from "react-native-root-toast"
import { types } from "hedvig-redux"

export default (state = {}, action) => {
  switch (action.type) {
    case types.STATUS_MESSAGE:
      Toast.show(action.message, {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
      })
      return state
    default:
      return state
  }
}
