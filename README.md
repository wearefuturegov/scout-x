<p align="center">
    <a href="https://outpost-staging.herokuapp.com/">
        <img src="https://github.com/wearefuturegov/scout-x/blob/develop/public/scout.png?raw=true" width="350px" />               
    </a>
</p>
  
<p align="center">
    <em>Service directories done right</em>         
</p>

---

<p align="center">
   <img src="https://github.com/wearefuturegov/scout-x/raw/develop/docs/examples.jpg?raw=true" width="750px" />     
</p>
<p align="center">
   <em>Example screens from the app</em>         
</p>

---

![CI](https://github.com/wearefuturegov/scout-x/workflows/CI/badge.svg) [![Netlify Status](https://api.netlify.com/api/v1/badges/27801f71-59f2-4186-9587-9a2669e7edb2/deploy-status)](https://app.netlify.com/sites/hungry-wozniak-46471f/deploys)

🚨 **This is BETA software. Please file an issue for any bugs** 🚨

## ❓ What is it?

A simple API-driven front-end for local authority service directories and local offers.

It's intended for use with [Outpost](https://github.com/wearefuturegov/outpost) and its [API service](https://github.com/wearefuturegov/outpost-api-service/), but, with some tweaks, could consume any API that follows the [Open Community standard](https://opencommunity.org.uk/).

## 🧱 How it's made

Scout is a modular application that can be run either as a single page application or embedded as part of another application or content management system.

It's a client-rendered React module, originally built on [create-react-app](https://create-react-app.dev/).

The pinboard feature uses localstorage, and it has one email-sending function that is intended to run on [Netlify functions](https://www.netlify.com/products/functions/).

## 🧙‍♂️ Serverless functions

To test out the email-sending function locally you'll need to install [Netlify Dev](https://www.netlify.com/products/dev/) and use `netlify dev` to start the app instead.

It should be on port 8888.

## 💻 Running it locally

This repository is setup as a monorepo and uses the `yarn` package manager to manage the workspaces.

**./packages/**

```
/scout/
  The main scout package
```

**./examples/**

```
/examples-embed/
  How to run Scout as an embedded application

/examples-standalone/
  How to run Scout as a single page application
  (SPA)
```

In order to get started developing with this application

```sh
# checkout scout and cd into directory
git clone git@github.com:wearefuturegov/scout-x.git && cd scout-x


# install dependencies
yarn install


# Start scout module dev process
yarn workspace @outpost-platform/scout run dev


# Start up some example environments to view scout module in action
yarn workspace example-standalone run dev
yarn workspace example-embed run dev

```

## 🌎 Running it on the web

### Single page application

[![Deploy](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/wearefuturegov/scout-x)

It's suitable for [any static host](https://facebook.github.io/create-react-app/docs/deployment), such as Netlify.

Run the `npm run build` command and then serve the `/build` folder.

If you want to use the built-in email sending function, you'll _need_ to host it on Netlify.

### Embedded into another application or CMS

## 🧬 Configuration

## 🧪 Tests and linting
