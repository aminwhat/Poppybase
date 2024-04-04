FROM node:18-alpine AS base

WORKDIR /usr/src/PoppyDB

COPY package*.json ./
RUN npm ci 

COPY . .
RUN npm run build

EXPOSE 3779

CMD [ "npm", "start" ]