FROM node:9.10.1

RUN groupadd -r cagroup && useradd --no-log-init -r -g cagroup -d /home/causer -m causer
RUN mkdir -p /opt/mri-app-ui && chown causer /opt/mri-app-ui && chgrp cagroup /opt/mri-app-ui
USER causer
WORKDIR /opt/mri-app-ui
COPY .npmrc .
COPY package.json .
RUN npm install
COPY . .

CMD ["npm", "run", "serve"]
