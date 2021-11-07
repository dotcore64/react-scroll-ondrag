module.exports = ({ env }) => ({
  presets: [
    ['@babel/env', {
      ...(env('test') ? {
        targets: {
          browsers: ['chrome >= 60', 'firefox >= 56'], // Test in these browsers is enough
        }
      } : {}),
    }],
    env('test') && ['@babel/react', { runtime: 'automatic' }],
  ].filter(Boolean),
  plugins: [
    'dev-expression',
    env('test') && ['istanbul', { exclude: ['test/**'] }],
  ].filter(Boolean),
});
