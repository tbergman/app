var fs = require("fs")

const currentPackage = require("./package.json")
currentPackage.main = "build/index.js"

let output = JSON.stringify(currentPackage, null, 4)
fs.writeFile("./package.json", output, function(err) {
  if (err) {
    return console.error(err)
  }
})
