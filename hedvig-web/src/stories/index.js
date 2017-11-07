import React from "react"

import { storiesOf } from "@storybook/react"
import { action } from "@storybook/addon-actions"
import { linkTo } from "@storybook/addon-links"

import { Provider } from "react-redux"
import { configureStore, chatActions, types } from "hedvig-redux"

import { theme } from "hedvig-style"
import { ThemeProvider } from "styled-components"

import * as TokenStorage from "../services/TokenStorage"
import { tokenStorageSaga } from "../sagas/TokenStorage"
import Chat from "../containers/Chat"

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

  render() {
    return (
      <ThemeProvider theme={theme}>
        <Provider store={this.props.store}>{this.props.children}</Provider>
      </ThemeProvider>
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
  }
}

storiesOf("Chat", module)
  .addDecorator(story => {
    let chatStore = configureStore({ additionalSagas: [tokenStorageSaga] })
    TokenStorage.getOrLoadToken(chatStore.dispatch)
    chatStore.dispatch(chatActions.getMessages())
    // chatStore.dispatch({ type: "LOADED_MESSAGES", payload: mockMessages })
    return <StorybookProvider store={chatStore}>{story()}</StorybookProvider>
  })
  .add("Chat", () => <Chat />)
