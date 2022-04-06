FROM node:14.19-alpine

# Create app directory
WORKDIR /var/www/demo_graphql

COPY . .

RUN yarn --pure-lockfile

EXPOSE 4200

CMD yarn start
