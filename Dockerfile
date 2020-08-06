FROM node:14
WORKDIR /portal
ENV AGRIWORKS_API_HOST host.docker.internal
COPY . .
RUN yarn install
EXPOSE 8080
CMD yarn serve