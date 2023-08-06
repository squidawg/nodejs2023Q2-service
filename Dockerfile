FROM node:18-alpine

EXPOSE 4000

WORKDIR /usr/app/src

COPY package*.json .

RUN npm install

COPY . .

CMD ["npm", "run", "start:migration:dev"]
