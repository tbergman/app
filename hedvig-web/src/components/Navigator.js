import React from "react"
import { Route } from "react-router-dom"
import { ConnectedRouter, routerMiddleware } from "react-router-redux"
import createHistory from "history/createBrowserHistory"

import Dialog from "../containers/Dialog"

import Landing from "./Landing"
import Chat from "../containers/Chat"
import Offer from "../containers/Offer"
// import Dashboard from "../containers/Dashboard"
// import Profile from "../containers/Profile"
import Legal from "../components/static/Legal"
import AboutUs from "../components/static/AboutUs"
import Contact from "../components/static/Contact"
import FAQ from "../components/static/FAQ"
import Jobs from "../components/static/Jobs"
import Press from "../components/static/Press"
import Logout from "../components/Logout"

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
      <Route exact path="/" component={Landing} />
      <Route path="/chat" component={Chat} />
      <Route path="/offer" component={Offer} />
      {/* <Route path="/dashboard" component={Dashboard} />
      <Route path="/profile" component={Profile} /> */}
      <Route path="/legal" component={Legal} />
      <Route path="/about-us" component={AboutUs} />
      <Route path="/contact" component={Contact} />
      <Route path="/faq" component={FAQ} />
      <Route path="/jobs" component={Jobs} />
      <Route path="/press" component={Press} />

      <Route path="/logout" component={Logout} />
    </div>
  </ConnectedRouter>
)

export { Navigator, middleware as routerMiddleware }
