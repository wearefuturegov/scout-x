# using docker image layers to save waiting for things to rebuild all the time

# base_image > build_frontend > (development | production)

FROM node:16-alpine3.17 as base_image
WORKDIR /app

# copy node files and install
FROM base_image as build_frontend
COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm ci

#  build and install all  the things for the development env
FROM build_frontend as development
# COPY --from=build_frontend ./tmp ./app
# ENTRYPOINT ["tail", "-f", "/dev/null"]
CMD ["npm", "run", "dev" ]



FROM build_frontend as build_production
COPY . ./
RUN npm run build


# this wont work because of env vars
# we could build the app each time for each platform but we need 
# to consider send-email.js functions
# FROM nginx:1.20.2-alpine as production
# ENV NODE_ENV production
# COPY --from=build_production ./app/build /usr/share/nginx/html
# COPY ./nginx.conf /etc/nginx/conf.d/default.conf
# CMD ["nginx", "-g", "daemon off;"]

# so instead we're cheating for now
FROM build_frontend as production
COPY . ./
# ENV NODE_ENV production
CMD ["npm", "run", "dev" ]
# ENTRYPOINT ["tail", "-f", "/dev/null"]


