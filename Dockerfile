# BUILD
# docker build -t frontend:0.1.0-alpine .
# RUN
# docker run -d -p 80:80 frontend:0.1.0-alpine

FROM node:18-alpine3.15 as build

ENV REACT_APP_BACKEND_BASE_URL=http://localhost:3800
ENV REACT_APP_API_URL=http://localhost:3002

COPY . /opt/app
COPY . .

WORKDIR /opt/app

RUN npm install

RUN npm run build

FROM nginx:1.23.2-alpine

COPY --from=build /opt/app/build /usr/share/nginx/html