FROM node:23-slim

WORKDIR /app

COPY ./src ./src
COPY package.json .
COPY package-lock.json .
COPY tsconfig.json .
COPY tsup.config.ts .

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "dev"]