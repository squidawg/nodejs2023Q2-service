FROM node:18-alpine

EXPOSE ${PORT}

WORKDIR ${WORK_DIR}

COPY package*.json .

RUN npm install

COPY . .

CMD ['npm', 'run', 'start:migration:dev']
