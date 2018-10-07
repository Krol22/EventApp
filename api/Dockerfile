FROM node:9.11
ENV NODE_ENV prod
WORKDIR /usr/src/app
COPY . .
RUN npm install 
RUN npm install -g babel-cli
RUN npm run build
CMD node ./dist/entry.js
EXPOSE 4000
