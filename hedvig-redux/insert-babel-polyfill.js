var fs = require("fs")

let input = fs.readFileSync("./src/index.js")
let output = `import "babel-polyfill"\n\n${input}`
fs.writeFile("./src/index.js", output, function(err) {
  if (err) {
    console.error(err)
  }
})
