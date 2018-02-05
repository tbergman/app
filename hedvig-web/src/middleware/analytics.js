import { createMiddleware } from "redux-beacon"
import { GoogleAnalytics } from "redux-beacon/targets/google-analytics"

const pageView = action => {
  return {
    hitType: 'pageview',
    page: action.payload.pathname
  }
}

const eventsMap = {
  "@@router/LOCATION_CHANGE": pageView
}

const middleware = createMiddleware(eventsMap, GoogleAnalytics)

export default middleware
