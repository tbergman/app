const R = require("ramda")
import React from "react"

import { storiesOf } from "@storybook/react-native"
import { action } from "@storybook/addon-actions"
import { linkTo } from "@storybook/addon-links"

import { App } from "../../App"

import { Provider } from "react-redux"
import { configureStore, chatActions, types } from "hedvig-redux"

import nav from "../../src/reducers/nav"
import keyboardStateReducer from "../../src/reducers/keyboardState"
import { apiAndNavigateToChatSaga } from "../../src/sagas/apiAndNavigate"
import { tokenStorageSaga } from "../../src/sagas/TokenStorage"
import { navigationSaga } from "../../src/sagas/navigation"
import { logoutSaga } from "../../src/sagas/logout"
import AssetList from "../../src/containers/asset-tracker/AssetList"
import AddEditAsset from "../../src/containers/asset-tracker/AddEditAsset"
import { AssetTracker } from "../../src/components/asset-tracker/AssetNavigator"
import AnimatedLogo from "../../src/components/AnimatedLogo"
import VideoExample from "../../src/components/VideoExample"
import { default as ChatContainer } from "../../src/containers/Chat"
import { ChatModalNavigator } from "../../src/components/navigation/base"
import MultipleSelectInput from "../../src/containers/chat/MultipleSelectInput"
import { default as ChatTextInputContainer } from "../../src/containers/chat/ChatTextInput"
import ChatNumberInput from "../../src/containers/chat/ChatNumberInput"
import DateInput from "../../src/containers/chat/DateInput"
import SingleSelectInput from "../../src/containers/chat/SingleSelectInput"
import VideoInput from "../../src/containers/chat/VideoInput"
import PhotoInput from "../../src/containers/chat/PhotoInput"
import AudioInput from "../../src/containers/chat/AudioInput"
import Dashboard from "../../src/containers/dashboard/Dashboard"
import Offer from "../../src/containers/dashboard/Offer"
import Profile from "../../src/containers/Profile"
import { Carousel } from "../../src/components/Carousel"
import { showChatAction } from "../../src/actions/baseNavigation"

import { ConnectedReduxBaseNavigator } from "../../src/containers/navigation/navigation"

import { theme } from "hedvig-style"
import { ThemeProvider } from "styled-components"
import WithAssets from "../../src/components/WithAssets"

/*
A Provider that doesn't re-render if you change the `store` prop.
*/
class StorybookProvider extends React.Component {
  shouldComponentUpdate() {
    return false
  }

  render() {
    return (
      <WithAssets>
        <ThemeProvider theme={theme}>
          <Provider store={this.props.store}>{this.props.children}</Provider>
        </ThemeProvider>
      </WithAssets>
    )
  }
}

storiesOf("App", module).add("The whole app", () => <App />)

let timestamp = 1507042098159

const MOCK_MESSAGES = {
  "1": {
    id: "message.hello",
    timestamp: 1,
    header: {
      fromId: 1,
      responsePath: "/response"
    },
    body: {
      type: "single_select",
      text: "Single select",
      choices: [
        {
          type: "selection",
          text: "Jag vill ha en ny",
          selected: false
        },
        {
          type: "link",
          text: "I want to see my assets",
          view: "AssetTracker"
        },
        {
          type: "link",
          text: "I want to see my offer",
          view: "Dashboard"
        },
        {
          type: "link",
          text: "Launch the calendar",
          appUrl: "calshow://"
        },
        {
          type: "link",
          text: "Launch a webview",
          webUrl: "http://hedvig.com"
        }
      ]
    }
  },
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
  "3": {
    id: "message.getname",
    timestamp: 3,
    header: {
      fromId: 1,
      responsePath: "/response"
    },
    body: {
      type: "hero",
      text: "I'm a hero",
      imageUri: "http://via.placeholder.com/300x150"
    }
  }
}

const names = ["Peril"]
const description = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium.".repeat(
  3
)
const images = [
  "https://s-media-cache-ak0.pinimg.com/originals/ee/51/39/ee5139157407967591081ee04723259a.png",
  "https://s-media-cache-ak0.pinimg.com/originals/40/4f/83/404f83e93175630e77bc29b3fe727cbe.jpg",
  "https://s-media-cache-ak0.pinimg.com/originals/8d/1a/da/8d1adab145a2d606c85e339873b9bb0e.jpg"
]
const states = [
  "CREATED",
  "ADD_REQUESTED",
  "ADD_PENDING",
  "REMOVE_REQUESTED",
  "REMOVE_PENDING",
  "WAITING_FOR_PAYMENT",
  "NOT_COVERED",
  "COVERED"
]
const perils = [...R.range(0, 20)].map(i => {
  let state = states[i % states.length]
  return {
    title: `${names[i % names.length]} ${i + 1} ${state}`,
    key: i,
    id: i.toString(),
    state: state,
    isRemovable: ["ADD_REQUESTED", "ADD_PENDING", "COVERED"].includes(state),
    imageUrl: images[i % images.length],
    description: description.substr(0, 600 + 10 * i)
  }
})
const categories = [
  {
    title: "Du och din familj",
    description: "Brand, inbrott, vattenläcka ".repeat(3),
    perils: perils.slice(0, 7),
    iconUrl: "https://unsplash.it/70/70"
  },
  {
    title: "Boende",
    description: "Brand, inbrott, vattenläcka",
    perils: perils.slice(7, 14),
    iconUrl: "https://unsplash.it/70/70"
  },
  {
    title: "Prylar",
    description: "",
    perils: perils.slice(14, 21),
    iconUrl: "https://unsplash.it/70/70"
  }
]
const insurance = {
  currentTotalPrice: 500,
  newTotalPrice: 600,
  status: "ACTIVE",
  categories
}

let tabBarStore
storiesOf("Navigation", module)
  .addDecorator(story => {
    tabBarStore = configureStore({
      additionalReducers: { nav, keyboard: keyboardStateReducer },
      additionalSagas: [
        apiAndNavigateToChatSaga,
        tokenStorageSaga,
        navigationSaga,
        logoutSaga
      ]
    })
    window.tabBarStore = tabBarStore
    tabBarStore.dispatch({
      type: "AUTHENTICATE",
      payload: { ssn: Math.floor(Math.random() * 100000).toString() }
    })
    return <StorybookProvider store={tabBarStore}>{story()}</StorybookProvider>
  })
  .add("TabBar", () => {
    tabBarStore.dispatch(showChatAction())
    tabBarStore.dispatch({
      type: "LOADED_MESSAGES",
      payload: MOCK_MESSAGES
    })
    tabBarStore.dispatch({
      type: "LOADED_INSURANCE",
      payload: insurance
    })
    return <ConnectedReduxBaseNavigator />
  })

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
      text: "Multiple select",
      choices: [
        {
          text: "Jag vill ha 1",
          selected: false
        },
        {
          text: "Jag vill ha 2",
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
      text: "Enter some text"
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
      text: "Enter a number"
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
      text: "Single select",
      choices: [
        {
          type: "selection",
          text: "Jag vill ha 1"
        },
        {
          type: "selection",
          text: "Jag vill ha 2"
        },
        {
          type: "link",
          text: "Take me to the dashboard",
          view: "Dashboard"
        },
        {
          type: "link",
          text: "Show me my offer",
          view: "Offer"
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
      type: "date_picker",
      text: "Select a date.",
      date: "2013-02-04T22:44:30.652Z"
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
  },
  "8": {
    id: "message.getname",
    timestamp: 8,
    header: {
      fromId: 1,
      responsePath: "/response"
    },
    body: {
      type: "audio",
      content: "Upload audio"
    }
  }
}

storiesOf("Chat input widgets", module)
  .addDecorator(story => {
    const chatStore = configureStore({
      initialState: {
        chat: { messages: R.sortBy(R.path(["timestamp"]), R.values(messages)) }
      },
      additionalReducers: { nav, keyboard: keyboardStateReducer },
      additionalSagas: [
        apiAndNavigateToChatSaga,
        tokenStorageSaga,
        navigationSaga,
        logoutSaga
      ]
    })
    chatStore.dispatch({
      type: types.AUTHENTICATE,
      payload: { ssn: "191212121212" }
    })
    // chatStore.dispatch(chatActions.getMessages())
    return <StorybookProvider store={chatStore}>{story()}</StorybookProvider>
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
  .add("AudioInput container", () => {
    return <AudioInput messageIndex={7} />
  })

// Chat Histories
let chatHistoryStore
const chatHistoryStoryBase = storiesOf(
  "Chat histories",
  module
).addDecorator(story => {
  chatHistoryStore = configureStore({
    initialState: {
      chat: { messages: [], loadingMessages: false, avatars: {} },
      keyboard: { currentState: { state: null } }
    },
    additionalReducers: { nav, keyboard: keyboardStateReducer },
    additionalSagas: [
      apiAndNavigateToChatSaga,
      tokenStorageSaga,
      navigationSaga
    ]
  })
  return (
    <StorybookProvider store={chatHistoryStore}>{story()}</StorybookProvider>
  )
})
R.values(messages).forEach(m =>
  chatHistoryStoryBase.add(`${m.body.type} message`, () => {
    chatHistoryStore.dispatch({ type: "LOADED_MESSAGES", payload: [m] })
    // chatHistoryStore.dispatch(showChatAction())
    return <ChatModalNavigator />
  })
)

storiesOf("Chat Backend IO", module)
  .addDecorator(story => {
    const chatBackendIOStore = configureStore({
      additionalReducers: { nav, keyboard: keyboardStateReducer },
      additionalSagas: [
        apiAndNavigateToChatSaga,
        tokenStorageSaga,
        navigationSaga,
        logoutSaga
      ]
    })
    chatBackendIOStore.dispatch({
      type: "AUTHENTICATE",
      payload: { ssn: Math.floor(Math.random() * 100000).toString() }
    })
    chatBackendIOStore.dispatch(chatActions.getMessages())
    return (
      <StorybookProvider store={chatBackendIOStore}>
        {story()}
      </StorybookProvider>
    )
  })
  .add("Chat", () => <ChatContainer />)

storiesOf("Asset Tracker", module)
  .addDecorator(story => {
    const assetStore = configureStore({
      additionalReducers: { nav, keyboard: keyboardStateReducer },
      additionalSagas: [
        apiAndNavigateToChatSaga,
        tokenStorageSaga,
        navigationSaga,
        logoutSaga
      ]
    })
    assetStore.dispatch({
      type: "AUTHENTICATE",
      payload: { ssn: Math.floor(Math.random() * 100000).toString() }
    })
    assetStore.dispatch({
      type: "LOADED_ASSETS",
      payload: [
        {
          id: "d38f4da4-8fb8-421d-bd1f-fd22ad7b1fd0",
          includedInBasePackage: false,
          photoUrl: "https://unsplash.it/40/40",
          receiptUrl: null,
          registrationDate: "2017-10-31",
          state: "PENDING",
          title: "Kdöd"
        },
        {
          id: "b4b722d7-e837-4311-b37e-2167320f6402",
          includedInBasePackage: false,
          photoUrl: "https://unsplash.it/40/40",
          receiptUrl: null,
          registrationDate: "2017-10-31",
          state: "PENDING",
          title: "Köksdörren"
        }
      ]
    })
    return <StorybookProvider store={assetStore}>{story()}</StorybookProvider>
  })
  .add("AssetList", () => <AssetList />)
  .add("AddEditAsset", () => <AddEditAsset />)
  .add("AssetTracker", () => <AssetTracker />)

storiesOf("Components", module)
  .addDecorator(story => {
    const hedvigStore = configureStore({
      additionalReducers: { nav, keyboard: keyboardStateReducer },
      additionalSagas: [
        apiAndNavigateToChatSaga,
        tokenStorageSaga,
        navigationSaga,
        logoutSaga
      ]
    })
    window.hedvigStore = hedvigStore
    return <StorybookProvider store={hedvigStore}>{story()}</StorybookProvider>
  })
  .add("Profile", () => <Profile />)
  .add("AnimatedLogo", () => <AnimatedLogo />)
  .add("VideoExample", () => <VideoExample />)

storiesOf("Dashboard", module)
  .addDecorator(story => {
    const dashboardStore = configureStore({
      additionalReducers: { nav, keyboard: keyboardStateReducer },
      additionalSagas: [
        apiAndNavigateToChatSaga,
        tokenStorageSaga,
        navigationSaga,
        logoutSaga
      ]
    })
    window.dashboardStore = dashboardStore
    dashboardStore.dispatch({
      type: "LOADED_INSURANCE",
      payload: insurance
    })
    return (
      <StorybookProvider store={dashboardStore}>{story()}</StorybookProvider>
    )
  })
  .add("Dashboard", () => <Dashboard />)
  .add("Offer", () => <Offer />)

let profileStore
storiesOf("Profile", module)
  .addDecorator(story => {
    profileStore = configureStore({
      additionalReducers: { nav, keyboard: keyboardStateReducer },
      additionalSagas: [
        apiAndNavigateToChatSaga,
        tokenStorageSaga,
        navigationSaga,
        logoutSaga
      ]
    })
    window.profileStore = profileStore
    return <StorybookProvider store={profileStore}>{story()}</StorybookProvider>
  })
  .add("Profile", () => {
    profileStore.dispatch({
      type: "LOADED_USER",
      payload: {
        name: "Anakin Skywalker",
        firstName: "Anakin",
        lastName: "Skywalker",
        familyMembers: ["Padmé Amidala", "Luke Skywalker"],
        age: 26,
        email: "anakkin@skywalk.er",
        address: "Krukmakargatan 5",
        livingAreaSqm: 48,
        safetyIncreasers: ["brandvarnare", "säkerhetsdörr", "gallergrind"],
        maskedBankAccountNumber: "XXXX XXXX 1234",
        paymentStatus: "ACTIVE",
        nextPaymentDate: 1507042098159,
        selectedCashback: "Rädda Barnen",
        selectedCashbackParagraph:
          '"Tack kära Lucas för att du bidrar till att rädda livet på fler cancerdrabbade barn"',
        selectedCashbackSignature: "Isabelle Ducellier, Generaldirektör"
      }
    })
    return <Profile />
  })

const carouselItems = [
  {
    title: "Carousel Item 1",
    description: "trololol ".repeat(100),
    imageUrl: "https://unsplash.it/400/400"
  },
  {
    title: "Carousel Item 2",
    description: "omgomgomg ".repeat(100),
    imageUrl: "https://unsplash.it/400/400"
  },
  {
    title: "Carousel Item 3",
    description: "whywhywhy ".repeat(100),
    imageUrl: "https://unsplash.it/400/400"
  },
  {
    title: "Carousel Item 4",
    description: "readmeplz ".repeat(100),
    imageUrl: "https://unsplash.it/400/400"
  }
]
storiesOf("Carousel", module)
  .addDecorator(story => {
    dashboardStore = configureStore({
      additionalReducers: { nav, keyboard: keyboardStateReducer },
      additionalSagas: [
        apiAndNavigateToChatSaga,
        tokenStorageSaga,
        navigationSaga,
        logoutSaga
      ]
    })
    return (
      <StorybookProvider store={dashboardStore}>{story()}</StorybookProvider>
    )
  })
  .add("Carousel", () => {
    const navigation = {
      state: { params: { title: "Carousel Demo", items: carouselItems } }
    }
    return <Carousel navigation={navigation} />
  })
