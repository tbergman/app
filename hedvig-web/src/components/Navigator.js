import React from "react"
import { Route, Switch } from "react-router-dom"
import { ConnectedRouter, routerMiddleware } from "react-router-redux"
import createHistory from "history/createBrowserHistory"

import Dialog from "../containers/Dialog"

import Landing from "./Landing"
import Chat from "../containers/Chat"
import Offer from "../containers/Offer"
import AboutUs from "../components/static/AboutUs"
import Logout from "../components/Logout"
import FAQ from "./static/FAQ";
import Legal from "./static/Legal";
import WaitListPage from "./WaitListPage"
import NotFound from "./NotFound"
import Contact from "./static/Contact"
import Terms from "./static/Terms"

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()
history.listen((location, action) => {
  window.scrollTo(0, 0)
})

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history)

const Navigator = () => (
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
        <Route path="/offer" component={Offer} />
        <Route path="/about-us" component={AboutUs} />
        <Route path="/FAQ" component={FAQ} />
        <Route path="/legal" component={Legal} />
        <Route path="/contact" component={Contact} />
        <Route path="/terms" component={Terms} />

        <Route path="/waitlist/:id" component={WaitListPage} />

        <Route path="/logout" component={Logout} />

        <Route component={NotFound} />
      </Switch>
    </div>
  </ConnectedRouter>
)

export { Navigator, middleware as routerMiddleware }
