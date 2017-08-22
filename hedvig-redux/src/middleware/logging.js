const loggingMiddleware = ({dispatch}) => next => action => {
  console.log("ACTION", action)
  return next(action)
}

module.exports = loggingMiddleware
