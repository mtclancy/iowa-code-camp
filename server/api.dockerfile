FROM node:19.7.0

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

ENTRYPOINT ["npm", "start"]