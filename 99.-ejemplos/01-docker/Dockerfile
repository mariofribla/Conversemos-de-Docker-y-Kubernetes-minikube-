FROM ubuntu:20.04

ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update
RUN apt-get -y install npm
RUN apt-get -y install wget
RUN apt-get -y install unzip

RUN wget https://gitlab.com/sacaci.cl/reto-devops/-/archive/master/reto-devops-master.zip
RUN unzip reto-devops-master.zip

WORKDIR ./reto-devops-master

RUN npm install

RUN npm run test

EXPOSE 3000

CMD node index.js

