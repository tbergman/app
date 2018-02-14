import React from "react"
import { Route, Switch } from "react-router-dom"
import { ConnectedRouter, routerMiddleware } from "react-router-redux"
import createHistory from "history/createBrowserHistory"

import Dialog from "../containers/Dialog"

// import Offer from "../containers/Offer"
import { Landing, Chat, AboutUs, Logout, Legal, Contact, Terms, WaitList, NotFound } from "../features/loadables"

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()
history.listen((location, action) => {
  window.scrollTo(0, 0)
})

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history)

const Router = () => (
  <ConnectedRouter history={history}>
    <div
      style={{
        height: "100%"
      }}
    >
      <Dialog />
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/chat" component={Chat} />
        <Route path="/about-us" component={AboutUs} />
        <Route path="/legal" component={Legal} />
        <Route path="/contact" component={Contact} />
        <Route path="/terms" component={Terms} />

        <Route path="/waitlist/:id" component={WaitList} />

        <Route path="/logout" component={Logout} />

        <Route component={NotFound} />
      </Switch>
    </div>
  </ConnectedRouter>
)

export { Router, middleware as routerMiddleware }
