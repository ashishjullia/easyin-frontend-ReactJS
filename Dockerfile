FROM node:10-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY ./easyIn/package*.json ./

USER node

RUN npm install

COPY --chown=node:node ./easyIn .

EXPOSE 8080

CMD [ "npm", "run", "start" ]