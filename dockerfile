FROM node:20 AS myapp

ENV NODE_ENV=development
WORKDIR /moviesearchfrontend
COPY ./package.json /moviesearchfrontend
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine

WORKDIR /usr/share/nginx/
RUN rm -rf html
RUN mkdir html

COPY --from=myapp /moviesearchfrontend/dist /usr/share/nginx/html