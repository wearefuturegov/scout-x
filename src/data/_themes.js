require("dotenv").config()
// import generic from './themes/generic';
// import bfis from './themes/bfis';
// import bod from './themes/bod';

/**
 * This file contains strings and variables for the VERSION_LABEL environmental variable.
 * Setting this variable will toggle on and off features for the different versions.
 * It also changes page titles etc
 */

const generic = {
    slug: 'generic',
    title: "Scout",
    serviceUrl: "https://scout-and-outpost.netlify.app/",
    scoutUrl: "https://scout.wearefuturegov.com",
    organisation: "FutureGov",
    organisationUrl: "https://www.wearefuturegov.com",
    tagline: "Find activities and organisations near you",
    beta: true
};

const fis = {
    slug: 'fis',
    title: "Family information service",
    serviceUrl: "https://familyinfo.buckinghamshire.gov.uk",
    scoutUrl: "https://directory.familyinfo.buckinghamshire.gov.uk",
    organisation: "Buckinghamshire Council",
    organisationUrl: "https://www.buckinghamshire.gov.uk/",
    tagline: "Find activities and organisations near you",
    beta: true
};

const bod = {
    slug: 'bod',
    title: "Online Directory",
    serviceUrl: "https://directory.buckinghamshire.gov.uk",
    scoutUrl: "https://directory.buckinghamshire.gov.uk",
    organisation: "Buckinghamshire Council",
    organisationUrl: "https://www.buckinghamshire.gov.uk/",
    tagline: "Find activities and organisations near you",
    beta: true
};


let currentVersion = [];

switch (process.env.REACT_APP_THEME.toLowerCase()) {
    case 'generic':
        currentVersion = generic;
    break;
    case 'fis':
        currentVersion = fis;
    break;
    case 'bod':
        currentVersion = bod;
    break;
    default:
        currentVersion = generic;
    break;
}

export default currentVersion;