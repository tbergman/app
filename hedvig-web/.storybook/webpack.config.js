const path = require("path")
const Dotenv = require("dotenv-webpack")

module.exports = {
  plugins: [new Dotenv({ path: path.resolve(__dirname, "./.env") })],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  }
}
