module.exports = {
  transpileDependencies: ["vuetify"],
  configureWebpack: {
    optimization: {
      splitChunks: false,
    },
  },
  css: {
    extract: false,
  },
};
