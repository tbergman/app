import { AsyncStorage } from "react-native"
import { types } from "hedvig-redux"
import { getDeviceInfo } from "./DeviceInfo"

const TOKEN_KEY = "@hedvig:token"

export async function loadToken() {
  try {
    const value = await AsyncStorage.getItem(TOKEN_KEY)
    return value
  } catch (error) {
    throw new Error("Error loading token", error)
  }
}

export async function saveToken(token) {
  try {
    await AsyncStorage.setItem(TOKEN_KEY, token)
  } catch (error) {
    throw new Error("Error saving token", error)
  }
}

export async function getOrLoadToken(dispatch) {
  let token = await loadToken()
  if (token) {
    dispatch({
      type: types.VALIDATE_TOKEN,
      payload: token
    })
  } else {
    dispatch({
      type: types.AUTHENTICATE,
      payload: {deviceInfo: getDeviceInfo()}
    })
  }
}
