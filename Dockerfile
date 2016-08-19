FROM node:latest

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Set environment variables
ENV DOCKER_EMAIL $DOCKER_EMAIL
ENV DOCKER_PASS $DOCKER_PASS
ENV DOCKER_REPO $DOCKER_REPO
ENV DOCKER_USER $DOCKER_USER
ENV BV_KEY $BV_KEY
ENV MS_KEY $MS_KEY
ENV WATSON_TONE_URL $WATSON_TONE_URL
ENV WATSON_TONE_USERNAME $WATSON_TONE_USERNAME
ENV WATSON_TONE_PASSWORD $WATSON_TONE_PASSWORD
ENV WATSON_STT_URL $WATSON_STT_URL
ENV WATSON_STT_USERNAME $WATSON_STT_USERNAME
ENV WATSON_STT_PASSWORD $WATSON_STT_PASSWORD
ENV STORMPATH_API_KEY_ID $STORMPATH_API_KEY_ID
ENV STORMPATH_CLIENT_APIKEY_ID $STORMPATH_CLIENT_APIKEY_ID
ENV STORMPATH_API_KEY_SECRET $STORMPATH_API_KEY_SECRET
ENV STORMPATH_CLIENT_APIKEY_SECRET $STORMPATH_CLIENT_APIKEY_SECRET
ENV STORMPATH_APPLICATION_HREF $STORMPATH_APPLICATION_HREF
ENV STORMPATH_URL $STORMPATH_URL

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

# Bundle app source
COPY . /usr/src/app

EXPOSE 8128
CMD [ "npm", "build" ]
CMD [ "node", "server.js" ]
