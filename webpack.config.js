const path = require('path');

module.exports = {
  "output": {
    "filename": "main.js",
    "path": path.resolve(__dirname, 'dist'),
  },
  "module": {
    "rules": [
      {
        "use": {
          "loader": "babel-loader",
          "options": {
            "presets": [
              "babel-preset-env",
              "babel-preset-react"
            ]
          }
        },
        "exclude": /node_modules/,
        "test": /\.js$/
      }
    ]
  },
  "entry": {
    "index": "./src/index.js"
  },
  "mode": 'development',
};