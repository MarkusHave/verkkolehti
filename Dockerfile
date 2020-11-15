FROM node:12

WORKDIR /usr/src/app

COPY package*.json ./

# RUN npm install
RUN npm ci --only=production

COPY . /usr/src/app

RUN npm run build

EXPOSE 8080
CMD [ "node", "server.js" ]