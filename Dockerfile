FROM node:12-alpine

ARG REACT_APP_API_URL=https://api.menulike.com
WORKDIR /usr/src/app

RUN npm install -g yarn --force
RUN yarn global add serve

COPY . .
RUN ./docker/install.sh
RUN yarn run build

ENV REACT_PORT=3000

EXPOSE $REACT_PORT
CMD serve -d -p $REACT_PORT -s ./build

