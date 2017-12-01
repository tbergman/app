const express = require("express")
const request = require("request")
const cors = require("cors")
const app = express()
app.use(cors())

const API_URL = "http://gateway.hedvig.com"
const PORT = 5000

app.use("/", function(req, res) {
  console.log(`${req.method} ${req.url}`)
  var url = API_URL + req.url
  req.pipe(request(url)).pipe(res)
})

app.listen(PORT, () => {
  console.log(`Proxying ${API_URL} on 0.0.0.0:${PORT}`)
})
