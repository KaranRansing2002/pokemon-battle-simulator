FROM node

WORKDIR /pokemon-backend

COPY package.json package.json
COPY package-lock.json package-lock.json

COPY . .

RUN npm install

ENTRYPOINT [ "node", "App.js" ]


