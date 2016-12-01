module.exports = {
  entry: './index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'vue-form-2.js'
  },
  module: {
    loaders: [
      { 
      	test: /\.js$/,
      	loader: 'babel-loader',
      	exclude: /node_modules/
      }, {
      	test: /\.jsx$/,
      	loader: 'babel-loader',
      	exclude: /node_modules/
      }
    ]
  }
}
