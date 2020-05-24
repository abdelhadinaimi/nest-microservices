FROM node:12
# RUN mkdir /opt/app/media_service/
WORKDIR /app/mediaservice

COPY package.json package-lock.json /app/mediaservice/

RUN npm cache clean --force && npm install --no-optional

COPY . /app/mediaservice/

RUN npm run build
CMD [ "npm", "start" ]