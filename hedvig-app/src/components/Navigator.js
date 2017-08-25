import { StackNavigator } from "react-navigation"
import Home from "../containers/Home"
import AnotherScreen from "../components/AnotherScreen"

const Navigator = StackNavigator({
  Home: { screen: Home },
  AnotherScreen: { screen: AnotherScreen }
})

export default Navigator
