const path = require("path")
const host = process.env.AGRIWORKS_API_HOST || "localhost";

module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  chainWebpack: config => {
    const apiClient = process.env.VUE_APP_API_CLIENT
    config.resolve.alias.set("api-client", path.resolve(__dirname, `src/api/${apiClient}`))
  },
  devServer: {
    proxy: `http://${host}:4000`
  },
  assetsDir: "assets",
  outputDir: "../agriworks_platform/dist/"
}
