import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import globals from 'rollup-plugin-node-globals';
import builtins from 'rollup-plugin-node-builtins';
import replace from 'rollup-plugin-replace';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';

const env = process.env.NODE_ENV || 'development';

export default {
  input: './src/main.jsx',
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify(env),
    }),
    babel({
      exclude: ['node_modules/**', '../node_modules/**'],
      babelrc: false,
      presets: [
        '@babel/env',
        '@babel/react',
      ],
    }),
    resolve({
      extensions: ['.js', '.jsx'],
    }),
    commonjs({
      include: ['node_modules/**', '../node_modules/**'],
      namedExports: {
        '../node_modules/react/index.js': [
          'createElement',
          'useCallback',
          'useEffect',
          'useRef',
          // styled-components
          'cloneElement',
          'createContext',
          'Component',
        ],
        '../node_modules/react-dom/index.js': [
          'render',
        ],
        'node_modules/react-is/index.js': [
          // styled-components
          'isElement',
          'isValidElementType',
          'ForwardRef',
        ],
      },
    }),
    globals(), // needed by styled-components stream
    builtins(), // needed by styled-components stream
    serve({
      contentBase: 'public',
      port: process.env.PORT || 3000,
    }),
    livereload('public'),
  ].filter(Boolean),
  output: {
    file: './public/client.js',
    format: 'iife',
    name: 'ReactScrollOnDragExamples',
    sourcemap: true,
  },
};
