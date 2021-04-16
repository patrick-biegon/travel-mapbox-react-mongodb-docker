# Build react client
FROM node:latest

# Latest Google chrome installation package
RUN apt-get update && apt-get install -y wget

RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -

RUN sh -c 'echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list'

RUN apt-get update

RUN apt-get install -y google-chrome-stable

RUN apt-get clean

RUN rm -fr /root/tmp

# Working directory be app
WORKDIR /usr/src/app

#Install mocha and selenium for tests
RUN npm install -g npm@7.10.0

RUN npm config set unsafe-perm true

RUN npm install -g mocha

RUN npm install -g selenium-webdriver

RUN npm uninstall -g chromedriver

RUN npm install -g chromedriver

COPY package*.json ./

# Installing dependencies

RUN npm install -f

# copy local files to app folder
COPY . .

EXPOSE 3000

SHELL ["npm","run","start"]