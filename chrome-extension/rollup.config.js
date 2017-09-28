import typescript from 'rollup-plugin-typescript'

export default {
  input: 'popup.ts',
  output: {
    file: 'popup.js',
    format: 'es'
  },
  plugins: [ typescript({ typescript: require('typescript') }) ]
}
