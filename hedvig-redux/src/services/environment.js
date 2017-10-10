var _baseURL = "http://gateway.hedvig.com"
if (process.env.REACT_NATIVE_BASE_URL !== undefined) {
  _baseURL = process.env.REACT_NATIVE_BASE_URL
} else if (process.env.REACT_APP_BASE_URL !== undefined) {
  _baseURL = process.env.REACT_APP_BASE_URL
}

export const baseURL = _baseURL
