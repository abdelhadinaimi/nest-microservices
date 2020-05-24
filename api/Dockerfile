FROM node:12
# RUN mkdir /app/apiservice
WORKDIR /app/apiservice

COPY package.json package-lock.json /app/apiservice/

# RUN npm cache clean --force && npm install -g npm@latest && npm install --no-optional
RUN npm install --no-optional

COPY . /app/apiservice

RUN npm run build

CMD [ "npm", "start" ]