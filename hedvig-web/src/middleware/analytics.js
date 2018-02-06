import { createMiddleware } from "redux-beacon"
import { GoogleAnalytics } from "redux-beacon/targets/google-analytics"

const pageView = action => {
  return {
    hitType: 'pageview',
    page: action.payload.pathname
  }
}

const ctaClick = action => {
  return {
    hitType: 'event',
    eventCategory: 'cta button',
    eventAction: 'click',
    eventLabel: action.payload.location
  }
}

const eventsMap = {
  "@@router/LOCATION_CHANGE": pageView,
  "ANALYTICS/CTA_CLICK": ctaClick
}

const middleware = createMiddleware(eventsMap, GoogleAnalytics)

export default middleware
