import { Permissions, Notifications } from 'expo';
import { pushNotificationActions, dialogActions } from "hedvig-redux"

const PUSH_ENDPOINT = 'https://your-server.com/users/push-token';

export async function registerForPushNotificationsAsync(dispatch) {
  console.log("Will try to register for push notifications")
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  )
  let finalStatus = existingStatus

  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== 'granted') {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status
  }

  // Stop here if the user did not grant permissions
  if (finalStatus !== 'granted') {
    console.log("Push token not granted")
    dispatch(dialogActions.showDialog({title: "Notiser", paragraph: "Vänligen aktivera notiser för Hedvig i dina systeminställningar."}))
    return
  }
  console.log("Push token granted")

  // Get the token that uniquely identifies this device
  let token = await Notifications.getExpoPushTokenAsync()

  dispatch(pushNotificationActions.registerPushToken(token))
}
