import React from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"

import Home from "../containers/Home"
import AnotherScreen from "./AnotherScreen"

const Navigator = () =>
  <Router>
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/another-screen" component={AnotherScreen} />
    </div>
  </Router>

export default Navigator
