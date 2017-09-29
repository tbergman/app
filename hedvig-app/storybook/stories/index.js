import React from "react"

import { storiesOf } from "@storybook/react-native"
import { action } from "@storybook/addon-actions"
import { linkTo } from "@storybook/addon-links"

import { Provider } from "react-redux"
import { configureStore, chatActions } from "hedvig-redux"

import nav from "../../src/reducers/nav"
import AppNavigator from "../../src/containers/AppNavigator"
import Profile from "../../src/components/Profile"
import AnimatedLogo from "../../src/components/AnimatedLogo"
// import VideoExample from "../../src/components/VideoExample"
import { default as ChatComponent } from "../../src/components/Chat"
import { default as ChatContainer } from "../../src/containers/Chat"

import { BaseNavigator } from "../../src/components/navigation/base"
import { ConnectedReduxBaseNavigator } from "../../src/containers/navigation/navigation"

/*
A Provider that doesn't re-render if you change the `store` prop.
*/
class StorybookProvider extends React.Component {
  shouldComponentUpdate() {
    return false
  }

  render() {
    return (
      <Provider store={this.props.store}>
        {this.props.children}
      </Provider>
    )
  }
}

storiesOf("Hedvig", module)
  .addDecorator(story => {
    const hedvigStore = configureStore({ additionalReducers: { nav } })
    window.hedvigStore = hedvigStore
    return (
      <StorybookProvider store={hedvigStore}>
        {story()}
      </StorybookProvider>
    )
  })
  .add("AppNavigator", () => <AppNavigator />)
  .add("Profile", () => <Profile />)
  .add("AnimatedLogo", () => <AnimatedLogo />)
// .add("VideoExample", () => <VideoExample />)

storiesOf("TabBar", module)
  .addDecorator(story => {
    const tabBarStore = configureStore({
      additionalReducers: {
        nav: (state, action) => {
          const nextState = BaseNavigator.router.getStateForAction(
            action,
            state
          )

          // Simply return the original `state` if `nextState` is null or undefined.
          return nextState || state
        }
      }
    })
    window.tabBarStore = tabBarStore
    tabBarStore.dispatch(chatActions.getMessages())
    return (
      <StorybookProvider store={tabBarStore}>
        {story()}
      </StorybookProvider>
    )
  })
  .add("TabBar", () => <ConnectedReduxBaseNavigator />)

let chatStore
storiesOf("Chat", module)
  .addDecorator(story => {
    chatStore = configureStore({ additionalReducers: { nav } })
    window.chatStore = chatStore
    return (
      <StorybookProvider store={chatStore}>
        {story()}
      </StorybookProvider>
    )
  })
  .add("Chat component", () =>
    <ChatComponent
      messages={[
        {
          header: {
            fromMe: false,
            type: "text"
          },
          body: {
            content:
              "Hej och välkommen! Det här är en demo-app. För att se nästa meddelande, tryck på detta eller något annat meddelande."
          }
        },
        {
          header: {
            fromMe: false,
            type: "text"
          },
          body: {
            content:
              "Jag är Hedvig och kommer alltid finnas tillgänglig här för dig."
          }
        },
        {
          header: {
            fromMe: false,
            type: "text"
          },
          body: {
            content:
              "Nu kommer jag förklara hur enkelt det är att försäkra sig med Hedvig."
          }
        }
      ]}
    />
  )
  .add("Chat container", () => {
    chatStore.dispatch(chatActions.getMessages())
    return <ChatContainer />
  })
  .add("Chat container, no messages", () => {
    return <ChatContainer />
  })
