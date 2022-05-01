import { babel } from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

const input = 'src/index.js';
const plugins = [
  babel({ exclude: '**/node_modules/**', babelHelpers: 'bundled' }),
];

const name = 'ReactDragOnScroll';
const globals = { react: 'React' };
const external = (id) => !id.startsWith('.') && !id.startsWith('/');

export default [{
  external,
  input,
  output: [
    {
      file: 'dist/index.cjs', format: 'cjs', sourcemap: true, exports: 'named',
    },
    { file: 'dist/index.js', format: 'esm', sourcemap: true },
  ],
  plugins,
}, {
  external: Object.keys(globals),
  input,
  output: {
    file: 'dist/index.umd.js', format: 'umd', globals, name, exports: 'named',
  },
  plugins: [
    ...plugins,
    resolve(),
    commonjs(),
    terser(),
  ],
}];
