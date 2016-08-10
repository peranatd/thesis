FROM node:argon

# Install required packages
RUN apt-get update && apt-get install -y \
libresample1-dev

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

# Bundle app source
COPY . /usr/src/app

EXPOSE 8128
CMD [ "npm", "build" ]
CMD [ "node", "server.js" ]
