module.exports = (env) => ({
  mode: 'production',
  devtool: false,
  optimization: {
    minimize: true,
    splitChunks: {
      chunks: 'all',
    },
  },
});