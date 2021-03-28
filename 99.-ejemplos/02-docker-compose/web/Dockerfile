FROM dckejem1:1

ENV DEBIAN_FRONTEND noninteractive

WORKDIR /reto-devops-master

RUN npm install basic-auth
RUN npm install express
RUN npm install 

COPY web/index.js /reto-devops-master

RUN npm run test

EXPOSE 3000
CMD node index.js

