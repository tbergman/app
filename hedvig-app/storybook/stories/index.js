import React from "react"

import { storiesOf } from "@storybook/react-native"
import { action } from "@storybook/addon-actions"
import { linkTo } from "@storybook/addon-links"

import { Provider } from "react-redux"
import { configureStore, chatActions, types } from "hedvig-redux"

import nav from "../../src/reducers/nav"
import Profile from "../../src/components/Profile"
import AssetList from "../../src/containers/asset-tracker/AssetList"
import AddEditAsset from "../../src/components/asset-tracker/AddEditAsset"
import { AssetTracker } from "../../src/components/asset-tracker/AssetNavigator"
import AnimatedLogo from "../../src/components/AnimatedLogo"
import VideoExample from "../../src/components/VideoExample"
import { default as ChatComponent } from "../../src/components/Chat"
import { default as ChatContainer } from "../../src/containers/Chat"
import MultipleSelectInput from "../../src/containers/chat/MultipleSelectInput"
import { default as ChatTextInputContainer } from "../../src/containers/chat/ChatTextInput"
import ChatNumberInput from "../../src/containers/chat/ChatNumberInput"
import DateInput from "../../src/containers/chat/DateInput"
import SingleSelectInput from "../../src/containers/chat/SingleSelectInput"

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

let timestamp = 1507042098159

storiesOf("Navigation", module)
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

const messages = [
  {
    id: "message.hello",
    timestamp: ++timestamp,
    header: {
      fromId: 1,
      responsePath: "/response"
    },
    body: {
      type: "multiple_select",
      content: "Multiple select",
      choices: [
        {
          text: "Jag vill ha en ny",
          selected: false
        },
        {
          text: "Vill byta försäkring",
          selected: false
        },
        {
          text: "Varför behöver jag?",
          selected: false
        },
        {
          text: "Vem är du, Hedvig?",
          selected: false
        }
      ]
    }
  },
  {
    id: "message.getname",
    timestamp: ++timestamp,
    header: {
      fromId: 1,
      responsePath: "/response"
    },
    body: {
      type: "text",
      content: "Enter some text"
    }
  },
  {
    id: "message.getname",
    timestamp: ++timestamp,
    header: {
      fromId: 1,
      responsePath: "/response"
    },
    body: {
      type: "number",
      content: "Enter a number"
    }
  },
  {
    id: "message.hello",
    timestamp: ++timestamp,
    header: {
      fromId: 1,
      responsePath: "/response"
    },
    body: {
      type: "single_select",
      content: "Single select",
      choices: [
        {
          type: "selection",
          text: "Jag vill ha en ny"
        },
        {
          type: "link",
          text: "I want to see my assets",
          href: "/asset-tracker",
          view: "AssetTracker"
        }
      ]
    }
  },
  {
    id: "message.getname",
    timestamp: ++timestamp,
    header: {
      fromId: 1,
      responsePath: "/response"
    },
    body: {
      type: "datepicker",
      content: "Select a date."
    }
  }
]

storiesOf("Chat input widgets", module)
  .addDecorator(story => {
    const chatStore = configureStore({
      initialState: { chat: { messages } },
      additionalReducers: { nav }
    })
    chatStore.dispatch({
      type: types.AUTHENTICATE,
      payload: { ssn: "191212121212" }
    })
    // chatStore.dispatch(chatActions.getMessages())
    return (
      <StorybookProvider store={chatStore}>
        {story()}
      </StorybookProvider>
    )
  })
  .add("MultipleSelectInput container", () => {
    return <MultipleSelectInput messageIndex={0} />
  })
  .add("ChatTextInput container", () => {
    return <ChatTextInputContainer messageIndex={0} />
  })
  .add("ChatNumberInput container", () => {
    return <ChatNumberInput messageIndex={0} />
  })
  .add("DateInput container", () => {
    return <DateInput messageIndex={0} />
  })
  .add("SingleSelectInput container", () => {
    return <SingleSelectInput messageIndex={0} />
  })

// Chat Histories
let chatHistoryStore
const chatHistoryStoryBase = storiesOf(
  "Chat histories",
  module
).addDecorator(story => {
  chatHistoryStore = configureStore({
    initialState: { chat: { messages: [] } },
    additionalReducers: { nav }
  })
  return (
    <StorybookProvider store={chatHistoryStore}>
      {story()}
    </StorybookProvider>
  )
})
messages.forEach(m =>
  chatHistoryStoryBase.add(`${m.body.type} message`, () => {
    chatHistoryStore.dispatch({ type: "LOADED_MESSAGES", payload: [m] })
    return <ChatContainer />
  })
)

storiesOf("Asset Tracker", module)
  .addDecorator(story => {
    const assetStore = configureStore({ additionalReducers: { nav } })
    return (
      <StorybookProvider store={assetStore}>
        {story()}
      </StorybookProvider>
    )
  })
  .add("AssetList", () => <AssetList />)
  .add("AddEditAsset", () => <AddEditAsset />)
  .add("AssetTracker", () => <AssetTracker />)

storiesOf("Components", module)
  .addDecorator(story => {
    const hedvigStore = configureStore({ additionalReducers: { nav } })
    window.hedvigStore = hedvigStore
    return (
      <StorybookProvider store={hedvigStore}>
        {story()}
      </StorybookProvider>
    )
  })
  .add("Profile", () => <Profile />)
  .add("AnimatedLogo", () => <AnimatedLogo />)
  .add("VideoExample", () => <VideoExample />)
