# Build react client
FROM node:10.16-alpine

# Latest Googgle Chrome installation package
RUN apk update && apk install -y wget

RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -

RUN sh -c 'echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list'

RUN apk update

RUN apk install -y xvfb

RUN apk install -y google-chrome-stable

RUN apk clean

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