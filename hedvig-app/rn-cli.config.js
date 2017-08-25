const path = require("path")
const blacklist = require("metro-bundler/build/blacklist")

module.exports = {
  getProjectRoots() {
    return [path.join(__dirname, ".."), __dirname]
  },
  getBlacklistRE() {
    // prettier-ignore
    return blacklist([
      /hedvig-web\/.*/,
    ])
  }
}
