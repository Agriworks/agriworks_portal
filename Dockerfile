FROM node:14
WORKDIR /portal
COPY package.json package.json
RUN yarn install