FROM node:12.3

RUN mkdir /tmp/server && mkdir /tmp/client && mkdir -p /usr/src/app/ && mkdir -p /usr/src/app/server/ && mkdir -p /usr/src/app/client/

COPY package.json /tmp/package.json
COPY package-lock.json /tmp/package-lock.json
WORKDIR tmp
RUN npm ci
RUN cp -a /tmp/node_modules /usr/src/app/node_modules/

COPY server/package.json /tmp/server/package.json
COPY server/package-lock.json /tmp/server/package-lock.json
WORKDIR /tmp/server
RUN npm ci
RUN cp -a /tmp/server/node_modules /usr/src/app/server/node_modules/

COPY client/package.json /tmp/client/package.json
COPY client/package-lock.json /tmp/client/package-lock.json
WORKDIR /tmp/client
RUN npm ci
RUN cp -a /tmp/client/node_modules /usr/src/app/client/node_modules/

# Working directory for application
WORKDIR /usr/src/app
COPY . /usr/src/app
EXPOSE 8080
CMD ["make", "deploy-no-install"]
