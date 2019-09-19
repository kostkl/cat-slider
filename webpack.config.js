const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/app.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname)
  },
  devServer: {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization",
        https: true
      }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader"
      },
      { test: /\.html$/, use: "html-loader" },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {}
          }
        ]
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          "file-loader",
          {
            loader: "image-webpack-loader",
            options: {
              bypassOnDebug: true
            }
          }
        ]
      },
      { test: /\.css$/, use: ["style-loader", "css-loader"] }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    })
    // ... keep all your other plugins here...
  ]
};
