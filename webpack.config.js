const path = require('path');

module.exports = {
    "entry": './src/index.js',
    "output": {
        "filename": "main.js",
        "path": path.resolve(__dirname, 'dist'),
    },
    "module": {
        "rules": [
            {
                "test": /\.js$/,
                "use": {
                    "loader": "babel-loader",
                    "options": {
                        "presets": [
                            "@babel/preset-env",
                            "@babel/preset-react"
                        ]
                    }
                },
                "exclude": /node_modules/,
            },
            {
                "test": /\.css$/,
                "use": ['style-loader', 'css-loader'],
              },
        ]
    },
    "mode": 'development',
    "devServer": {
        "static": './dist',
        "hot": true,
    },
};