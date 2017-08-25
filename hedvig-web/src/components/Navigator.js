import React from "react"
import { Route } from "react-router-dom"
import { ConnectedRouter, routerMiddleware } from "react-router-redux"
import createHistory from "history/createBrowserHistory"

import Home from "../containers/Home"
import AnotherScreen from "./AnotherScreen"

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history)

const Navigator = () =>
  <ConnectedRouter history={history}>
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/another-screen" component={AnotherScreen} />
    </div>
  </ConnectedRouter>

export { Navigator, middleware as routerMiddleware }
