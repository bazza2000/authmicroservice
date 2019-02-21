FROM node:6 
# Create app directory
RUN mkdir /app
USER root
RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y  software-properties-common && \
    add-apt-repository ppa:webupd8team/java -y && \
    apt-get update && \
    echo oracle-java7-installer shared/accepted-oracle-license-v1-1 select true | /usr/bin/debconf-set-selections && \
    apt-get install -y --allow-unauthenticated oracle-java8-installer && \
    apt-get clean

WORKDIR /app
ADD wdio.conf.local.js /app/
ADD wdio.conf.js /app/
ADD package.json /app/
ADD package-lock.json /app/
COPY test /app/test
RUN ls -la

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
# If you are building your code for production
# RUN npm ci --only=production
# Bundle app source
#COPY . .  
RUN npm install
ADD test.sh .
#RUN npm test wdio.conf.local.js
#CMD [ "npm", "test", "wdio.conf.local.js" ]
CMD ["/bin/sh", "-c", "/app/test.sh"]


