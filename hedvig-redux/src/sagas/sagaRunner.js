import { call, spawn, all } from "redux-saga/effects"

// See https://github.com/redux-saga/redux-saga/pull/644#issuecomment-272236599
const _runner = function*(sagas) {
  yield all(
    sagas.map(saga =>
      spawn(function*() {
        let isSyncError = false
        while (!isSyncError) {
          isSyncError = true
          try {
            setTimeout(() => (isSyncError = false))
            console.log("Starting saga", saga.name)
            yield call(saga)
            break
          } catch (e) {
            if (isSyncError) {
              throw new Error(
                saga.name +
                  " was terminated because it threw an exception on startup."
              )
            } else {
              console.warn("Caught async error in", saga.name, e)
            }
          }
        }
      })
    )
  )
}

export default _runner
