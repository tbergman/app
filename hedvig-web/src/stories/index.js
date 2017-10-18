import React from "react"

import { storiesOf } from "@storybook/react"
import { action } from "@storybook/addon-actions"
import { linkTo } from "@storybook/addon-links"

import { Provider } from "react-redux"
import { configureStore, chatActions, types } from "hedvig-redux"

import { theme } from "hedvig-style"
import { ThemeProvider } from "styled-components"

import Chat from "../components/Chat"

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
        <Provider store={this.props.store}>
          {this.props.children}
        </Provider>
      </ThemeProvider>
    )
  }
}

storiesOf("Chat", module)
  .addDecorator(story => {
    let chatStore = configureStore()
    chatStore.dispatch({
      type: "AUTHENTICATE",
      payload: { ssn: Math.floor(Math.random() * 100000).toString() }
    })
    chatStore.dispatch(chatActions.getMessages())
    return (
      <StorybookProvider store={chatStore}>
        {story()}
      </StorybookProvider>
    )
  })
  .add("Chat", () => <Chat />)
