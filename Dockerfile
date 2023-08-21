FROM node:20-alpine

EXPOSE ${PORT}

WORKDIR ${WORK_DIR}

COPY package*.json .

RUN npm install && npm cache clean --force

COPY . .

RUN npm run build

CMD ["npm", "run", "start:migration:dev"]
