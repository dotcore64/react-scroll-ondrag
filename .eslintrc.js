module.exports = {
  extends: 'airbnb',
  env: {
    browser: true
  },
  rules: {
    'max-len': ['error', { code: 100, ignoreComments: true }],
    'import/no-extraneous-dependencies': ['error', {
      devDependencies: [
        'test/**',
        'karma.conf.js',
        'rollup.config.js',
        'examples/rollup.config.js',
      ]
    }]
  }
}
