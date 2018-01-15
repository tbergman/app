import Sentry from "sentry-expo"

export const sentryMiddleware = store => next => action => {
    try {
        return next(action)
    } catch (e) {
        Sentry.captureException(e, {
            extra: {
                action,
                state: store.getState()
            }
        })
    }
}