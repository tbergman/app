const config = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'graphql-tag',
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          src: './src',
          assets: './assets',
        },
      },
    ],
  ],
};

if (process.env.NODE_ENV !== 'test') {
  config.plugins.push('functional-hmr');
}

module.exports = config;
