import { call, spawn, all, select } from "redux-saga/effects"

// See https://github.com/redux-saga/redux-saga/pull/644#issuecomment-272236599
const _runner = function*(sagas, raven) {
  yield all(
    sagas.map(saga =>
      spawn(function*() {
        let isSyncError = false
        while (!isSyncError) {
          isSyncError = true
          try {
            setTimeout(() => (isSyncError = false))
            yield call(saga)
            break
          } catch (e) {
            if (raven) {
              const state = yield select()
              raven.captureException(e, {extra: {user: state.user}})
            }
          }
        }
      })
    )
  )
}

export default _runner
