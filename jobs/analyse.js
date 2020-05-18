process.env.NODE_ENV = 'production'

const webpack = require('webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const webpackConfigProd = require('react-scripts/config/webpack.config')('production')
const chalk = require('chalk')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')

const green = text => {
  return chalk.green.bold(text)
}

webpackConfigProd.plugins.push(new BundleAnalyzerPlugin())

webpackConfigProd.plugins.push(
  new ProgressBarPlugin({
    format: `${green('analyzing...')} ${green('[:bar]')}${green('[:percent]')}${green('[:elapsed seconds]')} - :msg`,
  }),
)

webpack(webpackConfigProd, (err, stats) => {
  if (err || stats.hasErrors()) {
    console.error(err)
  }
})