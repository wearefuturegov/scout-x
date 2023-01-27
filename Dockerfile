# using docker image layers to save waiting for things to rebuild all the time

# base_image > build_frontend > (development | production)

FROM node:16-alpine3.17 as base_image
WORKDIR /app

# copy node files and install
FROM base_image as build_frontend
COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm ci


FROM build_frontend as build_production
COPY . ./
RUN npm run build


FROM nginx:1.20.2-alpine as production
ENV NODE_ENV production
COPY --from=build_production ./app/build /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]


#  build and install all  the things for the development env
FROM build_frontend as development
# COPY --from=build_frontend ./tmp ./app
# ENTRYPOINT ["tail", "-f", "/dev/null"]
CMD ["npm", "run", "dev" ]