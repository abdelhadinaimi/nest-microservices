FROM node:12
# RUN mkdir /opt/app/user_service/
WORKDIR /app/userservice

COPY package.json package-lock.json /app/userservice/

RUN npm cache clean --force && npm install --no-optional

COPY . /app/userservice/
RUN npm run build
CMD [ "npm", "start" ]