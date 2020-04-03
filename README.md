<p align="center">
    <a href="https://outpost-staging.herokuapp.com/">
        <img src="https://github.com/wearefuturegov/scout-x/blob/master/public/scout.png?raw=true" width="350px" />               
    </a>
</p>
  
<p align="center">
    <em>Service directories done right</em>         
</p>

---

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

It's suitable for [any static host](https://facebook.github.io/create-react-app/docs/deployment), such as Netlify.

Run the `npm run build` command and then serve the `/build` folder.

## Configuration

- `API_HOST`: the location of the API where service data can be read.
