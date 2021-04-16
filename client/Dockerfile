# Build react client
FROM node:10.16-alpine

# Working directory be app
WORKDIR /usr/src/app

COPY package*.json ./

# Installing dependencies
RUN npm install --silent

RUN npm install -g mocha

# copy local files to app folder
COPY . .

EXPOSE 3000

SHELL ["npm","run","start"]