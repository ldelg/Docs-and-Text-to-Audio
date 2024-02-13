module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.resolve.fallback = {
        util: require.resolve("util/"),
        path: require.resolve("path-browserify"),
      };

      return webpackConfig;
    },
  },
};
