// index.js

module.exports = {
  onPreBuild({ netlifyConfig }) {
    // Modify build command's environment variables
    netlifyConfig.build.environment.REACT_APP_SITE_URL =
      process.env.DEPLOY_PRIME_URL
  },
}
