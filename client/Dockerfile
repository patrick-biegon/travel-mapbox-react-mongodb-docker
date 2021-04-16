# Build react client
FROM node:10.16-alpine

# Latest Googgle chromium installation package
RUN apk update && apk add wget --no-cache

RUN apk update

RUN apk add xvfb

RUN apk add chromium

RUN rm -fr /root/tmp

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