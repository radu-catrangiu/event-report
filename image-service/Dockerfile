FROM node:12.14.0-stretch-slim

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm ci --only=production

# Bundle app source
COPY . .

ENV PORT=8080

EXPOSE 8080
CMD [ "npm", "start" ]