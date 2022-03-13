FROM node:16-alpine AS build

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

# OPERATION CACHING WHILE PREVIOUS FILES REMAIN THE SAME
RUN yarn

COPY . ./

RUN yarn build

FROM node:16-alpine AS production

ENV NODE_ENV=production

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn --prod

COPY --from=development /usr/src/app/build ./build

EXPOSE 3000

CMD ["yarn", "start"]