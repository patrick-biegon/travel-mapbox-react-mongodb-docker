# Build react client
FROM node:10.16-alpine

# Working directory be app
WORKDIR /usr/src/app

#Install mocha and selenium for tests

RUN npm config set unsafe-perm true

RUN npm install -g mocha

RUN npm install -g selenium-webdriver

COPY package*.json ./

# Installing dependencies

RUN npm install --silent

# copy local files to app folder
COPY . .

EXPOSE 3000

SHELL ["npm","run","start"]