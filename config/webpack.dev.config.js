const webpack = require('webpack');

module.exports = () => {
  return {
    mode: 'development',
    devtool: 'source-map',
    devServer: {
      open: true,
      historyApiFallback: true,
      port: 8080,
      hot: true,
    },
    plugins: [new webpack.HotModuleReplacementPlugin()],
  };
};
