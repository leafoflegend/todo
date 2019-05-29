FROM node:12.3

# Working directory for application
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN npm install

WORKDIR /usr/src/app/server
RUN npm install

# Copy application and start
WORKDIR /usr/src/app
EXPOSE 3000
CMD ["make", "deploy"]
