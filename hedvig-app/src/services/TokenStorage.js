import { AsyncStorage } from "react-native"
import { types } from "hedvig-redux"
import { getDeviceInfo } from "./DeviceInfo"

const TOKEN_KEY = "@hedvig:token"

export async function loadToken() {
  try {
    const value = await AsyncStorage.getItem(TOKEN_KEY)
    console.log("Loaded token from AsyncStorage:", value)
    return value
  } catch (error) {
    console.warn("Error loading token", error)
  }
}

export async function saveToken(token) {
  try {
    await AsyncStorage.setItem(TOKEN_KEY, token)
    console.log("Saved token to AsyncStorage")
  } catch (error) {
    console.warn("Error saving token", error)
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
      payload: {}
    })
  }
}
