// rollup.config.js
import typescript from '@rollup/plugin-typescript';

export default {
//   input: 'src/index.ts',
  input: 'src/app.tsx',
  output: {
    dir: 'output',
    format: 'cjs'
  },
  plugins: [typescript()]
};