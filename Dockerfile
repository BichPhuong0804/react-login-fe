# Stage 1
FROM ubuntu:18.04
RUN apt-get update
RUN apt-get install -y iputils-ping

# Stage 2
FROM node:14-alpine as react-build
WORKDIR /app
COPY . ./
RUN yarn
RUN yarn build

# Stage 3
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=react-build /app/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
