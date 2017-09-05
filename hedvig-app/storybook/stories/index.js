import React from "react"
import { Text } from "react-native"

import { storiesOf } from "@storybook/react-native"
import { action } from "@storybook/addon-actions"
import { linkTo } from "@storybook/addon-links"

import { Provider } from "react-redux"
import { configureStore } from "hedvig-redux"

import Button from "./Button"
import CenterView from "./CenterView"
import Welcome from "./Welcome"

import nav from "../../src/reducers/nav"
import AppNavigator from "../../src/containers/AppNavigator"
import Profile from "../../src/components/Profile"
import AnimatedLogo from "../../src/components/AnimatedLogo"

// storiesOf("Welcome", module).add("to Storybook", () =>
//   <Welcome showApp={linkTo("Button")} />
// )
//
// storiesOf("Button", module)
//   .addDecorator(getStory =>
//     <CenterView>
//       {getStory()}
//     </CenterView>
//   )
//   .add("with text", () =>
//     <Button onPress={action("clicked-text")}>
//       <Text>Hello Button</Text>
//     </Button>
//   )
//   .add("with some emoji", () =>
//     <Button onPress={action("clicked-emoji")}>
//       <Text>😀 😎 👍 💯</Text>
//     </Button>
//   )

const store = configureStore({ additionalReducers: { nav } })

storiesOf("Hedvig", module)
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .add("AppNavigator", () => <AppNavigator />)
  .add("Profile", () => <Profile />)
  .add("AnimatedLogo", () => <AnimatedLogo />)
