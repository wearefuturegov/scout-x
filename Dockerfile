# using docker image layers to save waiting for things to rebuild all the time

# base_image > build_frontend > (development | production)

FROM node:16-alpine3.17 as base_image


# copy node files and install
FROM base_image as build_frontend
COPY ./package.json ./tmp/package.json
COPY ./package-lock.json ./tmp/package-lock.json
RUN cd /tmp && \
    npm install
WORKDIR /app

#  build and install all  the things for the development env
FROM build_frontend as development
COPY --from=build_frontend ./tmp ./app
EXPOSE 3000
CMD ["npm", "run", "dev" ]


FROM build_frontend as production
COPY --from=build_frontend ./tmp ./
COPY . /app
RUN npm install -g serve
RUN npm run build 
EXPOSE 3000
CMD ["serve", "-s", "build", "-l", "3000"]
