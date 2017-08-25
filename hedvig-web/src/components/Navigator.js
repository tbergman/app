import React from "react"
import { Route } from "react-router-dom"
import { ConnectedRouter, routerMiddleware } from "react-router-redux"
import createHistory from "history/createBrowserHistory"

import Landing from "./Landing"
import Login from "./Login"
import Home from "../containers/Home"
import Onboarding from "./Onboarding"
import AddEditItem from "./AddEditItem"
import Profile from "./Profile"
import InsuranceOffer from "./InsuranceOffer"
import InventoryList from "./InventoryList"
import InsuranceList from "./InsuranceList"
import AddEditInsurance from "./AddEditInsurance"
import AnotherScreen from "./AnotherScreen"
import RegisterPayment from "./RegisterPayment"
import ChangePayment from "./ChangePayment"
import RegisterCashback from "./RegisterCashback"
import ChangeCashback from "./ChangeCashback"
import SignBankid from "./SignBankid"
import FullTerms from "./FullTerms"
import Share from "./Share"
import Dashboard from "./Dashboard"
import Claim from "./Claim"

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history)

const Navigator = () =>
  <ConnectedRouter history={history}>
    <div>
      <Route exact path="/" component={Landing} />
      <Route path="/login" component={Login} />
      <Route path="/onboarding" component={Onboarding} />
      <Route path="/add-edit-item" component={AddEditItem} />
      <Route path="/profile" component={Profile} />
      <Route path="/insurance-offer" component={InsuranceOffer} />
      <Route path="/inventory-list" component={InventoryList} />
      <Route path="/insurance-list" component={InsuranceList} />
      <Route path="/add-edit-insurance" component={AddEditInsurance} />
      <Route path="/another-screen" component={AnotherScreen} />
      <Route path="/register-payment" component={RegisterPayment} />
      <Route path="/change-payment" component={ChangePayment} />
      <Route path="/register-cashback" component={RegisterCashback} />
      <Route path="/change-cashback" component={ChangeCashback} />
      <Route path="/sign-bankid" component={SignBankid} />
      <Route path="/full-terms" component={FullTerms} />
      <Route path="/share" component={Share} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/claim" component={Claim} />
    </div>
  </ConnectedRouter>

export { Navigator, middleware as routerMiddleware }
