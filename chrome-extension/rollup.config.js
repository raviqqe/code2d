import typescript from 'rollup-plugin-typescript'

export default {
  input: 'src/popup.ts',
  output: {
    file: 'dist/popup.js',
    format: 'es'
  },
  plugins: [ typescript({ typescript: require('typescript') }) ]
}
