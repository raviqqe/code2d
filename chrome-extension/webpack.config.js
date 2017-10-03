module.exports = {
  entry: {
    popup: './src/popup.ts',
    'content-script': './src/content-script.ts'
  },
  output: {
    filename: 'dist/[name].js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    loaders: [
      { test: /\.ts$/, loader: 'ts-loader' }
    ]
  }
}
