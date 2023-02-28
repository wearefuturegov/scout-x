<p align="center">
    <a href="https://outpost-staging.herokuapp.com/">
        <img src="https://github.com/wearefuturegov/scout-x/blob/master/public/scout.png?raw=true" width="350px" />               
    </a>
</p>
  
<p align="center">
    <em>Service directories done right</em>         
</p>

---

<p align="center">
   <img src="https://github.com/wearefuturegov/scout-x/raw/master/docs/examples.jpg?raw=true" width="750px" />     
</p>
<p align="center">
   <em>Example screens from the app</em>         
</p>

---

![CI](https://github.com/wearefuturegov/scout-x/workflows/CI/badge.svg)

[![Netlify Status](https://api.netlify.com/api/v1/badges/27801f71-59f2-4186-9587-9a2669e7edb2/deploy-status)](https://app.netlify.com/sites/hungry-wozniak-46471f/deploys)

🚨 **This is BETA software. Please file an issue for any bugs** 🚨

A simple API-driven front-end for local authority service directories and local offers.

It's intended for use with [Outpost](https://github.com/wearefuturegov/outpost) and its [API service](https://github.com/wearefuturegov/outpost-api-service/), but, with some tweaks, could consume any API that follows the [Open Community standard](https://opencommunity.org.uk/).

## 🧱 How it's made

It's a client-rendered React app, built on [create-react-app](https://create-react-app.dev/).

The pinboard feature uses localstorage, and it has one email-sending function that is intended to run on [Netlify functions](https://www.netlify.com/products/functions/).

## 💻 Running it locally

### Using docker

```sh
git clone git@github.com:wearefuturegov/scout-x.git && cd scout-x

# build the image - if using for the first time
docker build --tag test-scout:development --target development .


# run the image in local environment
docker run -p 3003:3000 --name test-scout -v $(pwd):/app:cached -i -d test-scout:development

# access the site
open http://localhost:3003/
```

### Locally

You need Node.js and `npm` installed, plus an API for Scout to consume data from.

First, clone the repo:

```
npm install
npm run dev
```

Before building, it will attempt to grab the latest version of the collection, category and SEND needs filters if there's an appropriate datasource available.

It'll be on **localhost:3000**.

### Serverless functions

To test out the email-sending function locally you'll need to install [Netlify Dev](https://www.netlify.com/products/dev/) and use `netlify dev` to start the app instead.

It should be on port 8888.

## 🌎 Running it on the web

[![Deploy](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/wearefuturegov/scout-x)

It's suitable for [any static host](https://facebook.github.io/create-react-app/docs/deployment), such as Netlify.

Run the `npm run build` command and then serve the `/build` folder.

If you want to use the built-in email sending function, you'll _need_ to host it on Netlify.

## 🧬 Configuration

You can configure it using a `.env` file locally. Run `cp .env.example .env` to make a fresh one.

| Variable                               | Description                                                                                                                                   | Example                                     | Required?                                                     |
| -------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- | ------------------------------------------------------------- |
| `REACT_APP_THEME`                      | Which version of scout are we deploying, generic or other                                                                                     | generic, BFIS, BOD                          | Yes, for theme switching                                      |
| `REACT_APP_API_HOST`                   | The location of the API where service data can be read                                                                                        | https://example.com/api/v1                  | Yes                                                           |
| `REACT_APP_GOOGLE_CLIENT_KEY`          | Needs the Google Places, Maps Javascript and Maps Static APIs enabled                                                                         |                                             | Yes, for map features                                         |
| `REACT_APP_GOOGLE_STATIC_MAPS_API_KEY` | Separate API key restricted to Static API and specific urls                                                                                   |                                             | Yes, for map features                                         |
| `REACT_APP_GA_PROPERTY_ID`             | Google Analytics property ID                                                                                                                  | UA-00000-1                                  | No                                                            |
| `REACT_APP_FEEDBACK_URL`               | The URL to a form where users can submit feedback about the service                                                                           | https://example.com                         | Yes, for feedback form links                                  |
| `REACT_APP_OUTPOST_REGISTER_URL`       | The URL to where users can register to the related outpost install                                                                            | https://example.com                         | Yes, for users to be able to register                         |
| `REACT_APP_OUTPOST_LOGIN_URL`          | The URL to where users can sign in to the related outpost install                                                                             | https://example.com                         | Yes, for users to be able to sign in and manage their service |
| `REACT_APP_FILTERS_DATASOURCE`         | A non-standard API endpoint, to grab data about taxonomies and SEND needs to populate filters on app boot                                     | https://example.com/api/v1                  | No                                                            |
| `NOTIFY_API_KEY`                       | Your API key for [Notify](notifications.service.gov.uk/)                                                                                      |                                             | Yes, for email features                                       |
| `NOTIFY_TEMPLATE_ID`                   | The ID of a Notify email template to use                                                                                                      |                                             | Yes, for email features                                       |
| `EMAIL_HOST`                           | URLs in emails will be built using this host.                                                                                                 | https://example.com                         | Yes, for email features                                       |
| `REACT_APP_TARGETS`                    | If you have created directories in outpost set this field to fetch for those you want to display here, otherwise all services will be fetched | bfis,bod                                    | No                                                            |
| `REACT_APP_SITE_URL`                   | The site url - used for the /public html files needing a canonical url for best SEO (set automatically if using netlify)                      | `https://github.com/wearefuturegov/scout-x` | Yes                                                           |

## 🧪 Tests and linting

It uses Prettier to enforce code style, along with Jest for unit tests and Cypress for integration/UI tests.

Make sure you have the server running before you run the Cypress tests. You can run all the tests with:

```
npm test
```

You can lint with:

```
npm run lint
```
