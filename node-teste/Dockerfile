FROM node:15

WORKDIR /usr/src/app

#RUN chown -R usr/src/app:usr/src/app /usr/src/app
RUN mkdir /usr/src/app -p && touch /usr/src/app/index.php
COPY package.json ./
COPY *.js ./

EXPOSE 3000

RUN cd /usr/src/app && \
    npm install express --save

#RUN npm install mysql --save
#CMD ["node", "index.js"]