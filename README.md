<p align="center">
    <a href="https://outpost-staging.herokuapp.com/">
        <img src="https://github.com/wearefuturegov/scout-x/blob/master/public/scout.png?raw=true" width="350px" />               
    </a>
</p>
  
<p align="center">
    <em>Service directories done right</em>         
</p>

---

[![Netlify Status](https://api.netlify.com/api/v1/badges/27801f71-59f2-4186-9587-9a2669e7edb2/deploy-status)](https://app.netlify.com/sites/hungry-wozniak-46471f/deploys)

🚨 **This is ALPHA software and not ready for use yet** 🚨

A simple API-driven front-end for local authority service directories and local offers.

It's intended for use with [Outpost](https://github.com/wearefuturegov/outpost), but can consume any API that follows the [Open Community standard](https://opencommunity.org.uk/).

It's a React app under the hood.

## Running it locally

You need Node.js and `npm` installed, plus an API for Scout to consume data from.

First, clone the repo:

```
npm install
npm run dev
```

It'll be on **localhost:3000**.

## Running it on the web

[![Deploy](https://www.netlify.com/img/deploy/button.svg)](
https://app.netlify.com/start/deploy?repository=https://github.com/wearefuturegov/scout-x)

It's suitable for [any static host](https://facebook.github.io/create-react-app/docs/deployment), such as Netlify.

Run the `npm run build` command and then serve the `/build` folder.

## Configuration

- `REACT_APP_API_HOST`: the location of the API where service data can be read.

- `REACT_APP_GOOGLE_CLIENT_KEY`: with the Google Places, Maps Javascript and Maps Static APIs enabled
