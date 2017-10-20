const proxy = require("http-proxy-middleware")

module.exports = function expressMiddleware(router) {
  router.use(
    "/api",
    proxy({
      target: "http://gateway.hedvig.com",
      changeOrigin: true,
      pathRewrite: function(path, req) {
        return path.replace("/api", "")
      }
    })
  )
}
