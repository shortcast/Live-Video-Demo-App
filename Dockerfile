FROM node:10

WORKDIR /integration-demo
COPY package*.json ./
RUN npm install

CMD ["npm", "start"]