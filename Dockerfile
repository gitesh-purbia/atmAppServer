FROM mhart/alpine-node:8

WORKDIR /app

ADD . /app

RUN npm i

ENTRYPOINT node .


