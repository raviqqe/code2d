module.exports = {
  entry: {
    background: './src/background.ts',
    'content-script': './src/content-script.tsx'
  },
  output: {
    filename: 'dist/[name].js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    loaders: [
      { test: /\.tsx?$/, loader: 'ts-loader' }
    ]
  }
}
