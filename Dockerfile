FROM node:14
WORKDIR /code/agriworks_portal
ENV PATH /code/agriworks_portal/node_modules/.bin:$PATH
COPY package.json /code/agriworks_portal/package.json
COPY package-lock.json /code/agriworks_portal/package-lock.json
EXPOSE 8080
COPY . .
RUN echo 'const path = require("path")\n\nmodule.exports = {\n  "transpileDependencies": [\n    "vuetify"\n  ],\n  chainWebpack: config => {\n    const apiClient = process.env.VUE_APP_API_CLIENT\n    config.resolve.alias.set("api-client", path.resolve(__dirname, `src/api/${apiClient}`))\n  },\n  devServer: {\n    proxy: "http://backend:4000"\n  },\n  assetsDir: "assets",\n  outputDir: "../agriworks_platform/dist/"\n}' > vue.config.js
RUN yarn install
CMD yarn run serve