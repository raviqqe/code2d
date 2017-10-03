module.exports = {
  entry: './src/background.ts',
  output: {
    filename: 'dist/background.js'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    loaders: [
      { test: /\.ts$/, loader: 'ts-loader' }
    ]
  }
}
