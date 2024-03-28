ARG NODE_ENV=production



FROM node:16-alpine3.17 as base_image

ARG NODE_ENV
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/build/app
EXPOSE 3000

COPY ./package.json /usr/build/app/package.json
COPY ./package-lock.json /usr/build/app/package-lock.json


FROM base_image as development_base
ARG NODE_ENV
ENV NODE_ENV=${NODE_ENV}
RUN npm install

FROM development_base as production_base
ARG NODE_ENV
ENV NODE_ENV=${NODE_ENV}
RUN npm install serve
COPY . /usr/build/app
# RUN npm run build 


#  build and install all  the things for the development env
FROM development_base as development
ARG NODE_ENV
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/app
COPY --chown=node:node --from=development_base /usr/build/app/node_modules ./node_modules
USER node
CMD ["npm", "run", "dev" ]


FROM production_base as production
ARG NODE_ENV
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/app


COPY --chown=node:node --from=production_base /usr/build/app/node_modules ./node_modules
# COPY --chown=node:node --from=production_base /usr/build/app/build ./build
# COPY --chown=node:node --from=production_base . /usr/src/app
# USER node
CMD ["tail", "-f", "/dev/null"]
# CMD ["serve", "-s", "build", "-l", "3000"]
