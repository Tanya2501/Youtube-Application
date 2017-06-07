const path = require('path');

module.exports = {
  entry: './script/app.js',
  output: {
    path: __dirname, 
    filename: 'app.bundle.js',
  },
  module: {
   loaders: [
        {
            test: path.join(__dirname, 'script'), loader: ['babel-loader', 'eslint-loader']
        },
   ]
  },
};
