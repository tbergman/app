import React from "react"

import { storiesOf } from "@storybook/react"
import { action } from "@storybook/addon-actions"

import { Provider } from "react-redux"
import { configureStore, chatActions, dialogActions } from "hedvig-redux"

import { MemoryRouter } from "react-router"

import { theme } from "hedvig-style"
import { ThemeProvider } from "styled-components"

import * as TokenStorage from "../services/TokenStorage"
import { tokenStorageSaga } from "../sagas/TokenStorage"
import Chat from "../containers/Chat"
import Offer from "../containers/Offer"
import Dashboard from "../containers/Dashboard"
import Landing from "../components/Landing"
import PerilDetailsCarousel from "../components/dashboard/PerilDetailsCarousel"
import PerilDetails from "../components/dashboard/PerilDetails"
import CashbackAlternativeDetails from "../containers/CashbackAlternativeDetails"
import Profile from "../containers/Profile"
import Dialog from "../containers/Dialog"
import { ButtonsExample } from "../components/Button"

import scrollPositionReducer from "../reducers/scrollPosition"
import { scrollY } from "../actions/scroll"

import perilReducer from "../reducers/peril"

import Avatar from "../components/chat/Avatar"

const R = require("ramda")
window.R = R

/*
import { Button, Welcome } from '@storybook/react/demo';

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Button', module)
  .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
  .add('with some emoji', () => <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>);
*/

/*
A Provider that doesn't re-render if you change the `store` prop.
*/
class StorybookProvider extends React.Component {
  shouldComponentUpdate() {
    return false
  }

  componentWillMount() {
    window.addEventListener("scroll", evt => {
      // console.log("Scroll position", window.scrollY)
      this.props.store.dispatch(scrollY(window.scrollY))
    })
  }

  render() {
    return (
      <MemoryRouter>
        <ThemeProvider theme={theme}>
          <Provider store={this.props.store}>{this.props.children}</Provider>
        </ThemeProvider>
      </MemoryRouter>
    )
  }
}

const mockMessages = {
  "2154": {
    globalId: 2154,
    id: "message.begin",
    header: {
      messageId: 2154,
      fromId: 1,
      responsePath: "/response",
      timeStamp: 1510063363225,
      loadingIndicator: "loader",
      avatarName: "h_symbol",
      pollingInterval: 2000,
      editAllowed: false
    },
    body: {
      type: "bankid_collect",
      referenceId: "1337",
      id: 2154,
      text: "BankID collect",
      imageURL: null,
      imageWidth: null,
      imageHeight: null
    },
    timestamp: "2017-11-07T14:02:43.225Z"
  },
  "2155": {
    globalId: 2155,
    id: "message.begin",
    header: {
      messageId: 2154,
      fromId: 123,
      responsePath: "/response",
      timeStamp: 1510063363225,
      loadingIndicator: "loader",
      avatarName: "h_symbol",
      pollingInterval: 2000,
      editAllowed: false
    },
    body: {
      type: "text",
      referenceId: "1337",
      id: 2154,
      text: "BankID collect",
      imageURL: null,
      imageWidth: null,
      imageHeight: null
    },
    timestamp: "2017-11-07T14:02:43.225Z"
  },
  "2156": {
    globalId: 2156,
    id: "message.file",
    header: {
      messageId: 2155,
      fromId: 1,
      responsePath: "/response",
      timeStamp: 1510063363225,
      loadingIndicator: "loader",
      avatarName: "h_symbol",
      pollingInterval: 2000,
      editAllowed: false
    },
    body: {
      type: "file",
      id: 2155,
      text: "Upload a file!",
      imageURL: null,
      imageWidth: null,
      imageHeight: null
    },
    timestamp: "2017-11-21T14:02:43.225Z"
  },
  // "2157": {
  //   globalId: 2157,
  //   id: "message.getname",
  //   timestamp: 2156,
  //   header: {
  //     fromId: 1,
  //     responsePath: "/response"
  //   },
  //   body: {
  //     type: "date_picker",
  //     text: "Select a date.",
  //     date: "2013-02-04T22:44:30.652Z"
  //   }
  // },
  "2158": {
    id: "message.hello",
    timestamp: 2158,
    header: {
      fromId: 1,
      responsePath: "/response"
    },
    body: {
      type: "multiple_select",
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
  "2159": {
    id: "message.textinput",
    globalId: 2159,
    timestamp: 2159,
    header: {
      fromId: 1,
      responsePath: "/response"
    },
    body: {
      type: "text",
      text: "Type something"
    }
  }
}

storiesOf("Chat", module)
  .addDecorator(story => {
    let chatStore = configureStore({
      additionalSagas: [tokenStorageSaga],
      additionalReducers: { scroll: scrollPositionReducer }
    })
    TokenStorage.getOrLoadToken(chatStore.dispatch)
    // chatStore.dispatch(chatActions.getMessages())
    chatStore.dispatch(chatActions.getAvatars())
    chatStore.dispatch({ type: "LOADED_MESSAGES", payload: mockMessages })
    return <StorybookProvider store={chatStore}>{story()}</StorybookProvider>
  })
  .add("Chat", () => <Chat />)

/* --------------------- INSURANCE ------------------------------------------ */

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
const perils = [...R.range(0, 50)].map(i => {
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
    perils: perils.slice(0, 15),
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

storiesOf("Offer", module)
  .addDecorator(story => {
    let offerStore = configureStore({
      additionalSagas: [tokenStorageSaga],
      additionalReducers: { scroll: scrollPositionReducer, peril: perilReducer }
    })
    offerStore.dispatch({
      type: "LOADED_INSURANCE",
      payload: insurance
    })
    return <StorybookProvider store={offerStore}>{story()}</StorybookProvider>
  })
  .add("Offer", () => <Offer />)

storiesOf("Dashboard", module)
  .addDecorator(story => {
    let dashboardStore = configureStore({
      additionalSagas: [tokenStorageSaga],
      additionalReducers: { scroll: scrollPositionReducer, peril: perilReducer }
    })
    dashboardStore.dispatch({
      type: "LOADED_INSURANCE",
      payload: insurance
    })
    return (
      <StorybookProvider store={dashboardStore}>{story()}</StorybookProvider>
    )
  })
  .add("Dashboard", () => <Dashboard />)

storiesOf("Profile", module)
  .addDecorator(story => {
    let profileStore = configureStore({
      additionalSagas: [tokenStorageSaga],
      additionalReducers: { scroll: scrollPositionReducer, peril: perilReducer }
    })
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
        selectedCashbackImageUrl: "https://unsplash.it/400/400",
        selectedCashbackParagraph:
          '"Tack kära Lucas för att du bidrar till att rädda livet på fler cancerdrabbade barn"',
        selectedCashbackSignature: "Isabelle Ducellier, Generaldirektör"
      }
    })
    profileStore.dispatch({
      type: "LOADED_CASHBACK_ALTERNATIVES",
      payload: [
        {
          title: "Rädda Barnen",
          description:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.",
          selected: false,
          charity: true,
          imageUrl: "https://unsplash.it/400/200"
        },
        {
          title: "Mitt konto",
          description:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.",
          selected: true,
          charity: true,
          imageUrl: "https://unsplash.it/400/200"
        }
      ]
    })
    return <StorybookProvider store={profileStore}>{story()}</StorybookProvider>
  })
  .add("Profile", () => <Profile />)

storiesOf("PerilDetailsCarousel", module).add("PerilDetailsCarousel", () => (
  <PerilDetailsCarousel category={categories[0]} initialPerilIndex={2} />
))

storiesOf("PerilDetails", module).add("PerilDetails", () => (
  <ThemeProvider theme={theme}>
    <PerilDetails
      category={categories[0]}
      initialPerilIndex={2}
      close={action("Close pressed")}
    />
  </ThemeProvider>
))

storiesOf("Cashback Alternatives", module)
  .addDecorator(story => {
    let cashbackStore = configureStore({
      additionalSagas: [tokenStorageSaga],
      additionalReducers: { scroll: scrollPositionReducer, peril: perilReducer }
    })
    cashbackStore.dispatch({
      type: "LOADED_CASHBACK_ALTERNATIVES",
      payload: [
        {
          title: "Rädda Barnen",
          description:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.",
          selected: false,
          charity: true,
          imageUrl: "https://unsplash.it/400/200"
        },
        {
          title: "Mitt konto",
          description:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.",
          selected: true,
          charity: true,
          imageUrl: "https://unsplash.it/400/200"
        }
      ]
    })
    return (
      <StorybookProvider store={cashbackStore}>{story()}</StorybookProvider>
    )
  })
  .add("Cashback Alternatives", () => <CashbackAlternativeDetails />)

storiesOf("Dialog", module)
  .addDecorator(story => {
    let dialogStore = configureStore({
      additionalSagas: [tokenStorageSaga],
      additionalReducers: { scroll: scrollPositionReducer }
    })
    TokenStorage.getOrLoadToken(dialogStore.dispatch)
    dialogStore.dispatch(
      dialogActions.showDialog({
        title: "Återställ konversation?",
        paragraph: "Är du säker på att du vill återställa konverstationen?",
        confirmButtonTitle: "Ja",
        dismissButtonTitle: "Nej",
        onConfirm: action("Confirm pressed"),
        onDismiss: action("Dismiss pressed")
      })
    )
    return <StorybookProvider store={dialogStore}>{story()}</StorybookProvider>
  })
  .add("Dialog", () => <Dialog />)

storiesOf("Landing", module)
  .addDecorator(story => {
    let landingStore = configureStore({
      additionalSagas: [tokenStorageSaga],
      additionalReducers: { scroll: scrollPositionReducer }
    })
    TokenStorage.getOrLoadToken(landingStore.dispatch)
    // landingStore.dispatch({ type: "LOADED_MESSAGES", payload: mockMessages })
    return <StorybookProvider store={landingStore}>{story()}</StorybookProvider>
  })
  .add("Landing", () => <Landing />)

storiesOf("Buttons", module)
  .addDecorator(story => {
    return <ThemeProvider theme={theme}>{story()}</ThemeProvider>
  })
  .add("ButtonsExample", () => <ButtonsExample />)

storiesOf("Avatar", module).add("Avatar", () => {
  let avatarData = {
    data: require("./lottie_example.json"),
    height: 90,
    width: 315
  }
  return <Avatar avatar={avatarData} />
})
