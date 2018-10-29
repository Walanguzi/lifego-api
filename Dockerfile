# Dockerfile
# The FROM directive sets the Base Image for subsequent instructions
FROM debian:jessie

# Replace shell with bash so we can source files
RUN rm /bin/sh && ln -s /bin/bash /bin/sh
# Set environment variables
ENV appDir /

# Run updates and install deps
RUN apt-get update

# Install needed deps and clean up after
RUN apt-get install -y -q --no-install-recommends \
    apt-transport-https \
    build-essential \
    ca-certificates \
    curl \
    g++ \
    gcc \
    git \
    make \
    nginx \
    sudo \
    wget \
    && rm -rf /var/lib/apt/lists/* \
    && apt-get -y autoclean

ENV NVM_DIR /usr/local/nvm
ENV NODE_VERSION 8.9.0

# Install nvm with node and npm
RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.26.0/install.sh | bash \
    && source $NVM_DIR/nvm.sh \
    && nvm install $NODE_VERSION \
    && nvm alias default $NODE_VERSION \
    && nvm use default

# Set up our PATH correctly so we don't have to long-reference npm, node, &c.
ENV NODE_PATH $NVM_DIR/versions/node/v$NODE_VERSION/lib/node_modules
ENV PATH $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH

# Set the work directory
RUN mkdir -p /
WORKDIR ${appDir}

# Add our package.json and install *before* adding our application files
ADD package.json ./
ADD wait-for-it.sh ./

RUN chmod +x ./wait-for-it.sh

ENTRYPOINT ["./wait-for-it.sh", "postgres:5432", "--", "./wait-for-it.sh", "mongodb:27017", "--", "node", "app.js"]

RUN npm i

RUN npm install -g nodemon

# Add application files
ADD . /

# ...
#Expose the port
EXPOSE 3002

CMD ["node", "app.js"]
