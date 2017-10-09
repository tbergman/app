const R = require("ramda")
import React from "react"

import { storiesOf } from "@storybook/react-native"
import { action } from "@storybook/addon-actions"
import { linkTo } from "@storybook/addon-links"

import { Provider } from "react-redux"
import { configureStore, chatActions, types } from "hedvig-redux"

import nav from "../../src/reducers/nav"
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
import VideoInput from "../../src/containers/chat/VideoInput"
import PhotoInput from "../../src/containers/chat/PhotoInput"
import Dashboard from "../../src/containers/dashboard/Dashboard"
import Profile from "../../src/containers/Profile"

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
    tabBarStore.dispatch({
      type: "LOADED_MESSAGES",
      payload: {
        "1": {
          id: "message.hello",
          timestamp: 1,
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
                view: "AssetTracker"
              },
              {
                type: "link",
                text: "Launch the calendar",
                appUrl: "calshow://"
              },
              {
                type: "link",
                text: "Launch a webview",
                webUrl: "http://threadsafestudio.com"
              }
            ]
          }
        }
        // "2": {
        //   id: "message.getname",
        //   timestamp: 2,
        //   header: {
        //     fromId: 1,
        //     responsePath: "/response"
        //   },
        //   body: {
        //     type: "video",
        //     content: "Record a video"
        //   }
        // }
      }
    })
    return (
      <StorybookProvider store={tabBarStore}>
        {story()}
      </StorybookProvider>
    )
  })
  .add("TabBar", () => <ConnectedReduxBaseNavigator />)

const messages = {
  "1": {
    id: "message.hello",
    timestamp: 1,
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
  "2": {
    id: "message.getname",
    timestamp: 2,
    header: {
      fromId: 1,
      responsePath: "/response"
    },
    body: {
      type: "text",
      content: "Enter some text"
    }
  },
  "3": {
    id: "message.getname",
    timestamp: 3,
    header: {
      fromId: 1,
      responsePath: "/response"
    },
    body: {
      type: "number",
      content: "Enter a number"
    }
  },
  "4": {
    id: "message.hello",
    timestamp: 4,
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
  "5": {
    id: "message.getname",
    timestamp: 5,
    header: {
      fromId: 1,
      responsePath: "/response"
    },
    body: {
      type: "datepicker",
      content: "Select a date."
    }
  },
  "6": {
    id: "message.getname",
    timestamp: 6,
    header: {
      fromId: 1,
      responsePath: "/response"
    },
    body: {
      type: "video",
      content: "Record a video"
    }
  },
  "7": {
    id: "message.getname",
    timestamp: 7,
    header: {
      fromId: 1,
      responsePath: "/response"
    },
    body: {
      type: "photo_upload",
      content: "Upload a photo"
    }
  }
}

const dashboard = {
  insurance: {
    fire: {
      state: "waiting_for_payment",
      included_in_base_package: false
    },
    theft: {
      state: "disabled",
      included_in_base_package: false
    },
    waterleak: {
      state: "waiting_for_signing", // any of "disabled", "waiting_for_signing", "waiting_for_payment", "enabled"
      included_in_base_package: true
    },
    current_total_price: 0,
    new_total_price: 500
  }
}

storiesOf("Chat input widgets", module)
  .addDecorator(story => {
    const chatStore = configureStore({
      initialState: {
        chat: { messages: R.sortBy(R.path(["timestamp"]), R.values(messages)) }
      },
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
    return <ChatTextInputContainer messageIndex={1} />
  })
  .add("ChatNumberInput container", () => {
    return <ChatNumberInput messageIndex={2} />
  })
  .add("DateInput container", () => {
    return <DateInput messageIndex={4} />
  })
  .add("SingleSelectInput container", () => {
    return <SingleSelectInput messageIndex={3} />
  })
  .add("VideoInput container", () => {
    return <VideoInput messageIndex={5} />
  })
  .add("PhotoInput container", () => {
    return <PhotoInput messageIndex={6} />
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
R.values(messages).forEach(m =>
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

storiesOf("Dashboard", module)
  .addDecorator(story => {
    const dashboardStore = configureStore({ additionalReducers: { nav } })
    window.dashboardStore = dashboardStore
    return (
      <StorybookProvider store={dashboardStore}>
        {story()}
      </StorybookProvider>
    )
  })
  .add("Dashboard", () => <Dashboard />)

storiesOf("Profile", module)
  .addDecorator(story => {
    const profileStore = configureStore({ additionalReducers: { nav } })
    window.profileStore = profileStore
    return (
      <StorybookProvider store={profileStore}>
        {story()}
      </StorybookProvider>
    )
  })
  .add("Profile", () => <Profile />)
