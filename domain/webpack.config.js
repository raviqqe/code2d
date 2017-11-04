const path = require('path')

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    index: './index.ts',
    book: './book/index.ts'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.ts', '.js' ]
  },
  output: {
    filename: '[name]/index.js',
    path: path.resolve(__dirname, 'dist')
  }
}
