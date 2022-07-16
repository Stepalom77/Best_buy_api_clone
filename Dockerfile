FROM node:16.16.0-alpine3.16

WORKDIR /Imdb_clone
COPY package*.json ./
RUN npm install --production

USER node
COPY . .

EXPOSE 2000

CMD ["node", "/Imdb_clone/app.js"]