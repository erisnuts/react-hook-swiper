module.exports = function (webpack) {
  return {
    plugins: [
      require('postcss-partial-import')({ addDependencyTo: webpack }),
      require('postcss-nested')({}),
      require('iconfont-webpack-plugin')({
        resolve: webpack.webpack.resolve
      }),
      require('lost')({}),
      require('postcss-flexbugs-fixes'),
      require('postcss-custom-properties')({}),
      require('postcss-calc')({}),
      require('autoprefixer')()
    ]
  };
};
