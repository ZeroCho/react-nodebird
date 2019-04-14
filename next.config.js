const withBundleAnalyzer = require('@zeit/next-bundle-analyzer');

module.exports = withBundleAnalyzer({
  distDir: 'build',
  analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
  analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
  bundleAnalyzerConfig: {
    server: {
      analyzerMode: 'static',
      reportFilename: '../bundles/server.html'
    },
    browser: {
      analyzerMode: 'static',
      reportFilename: '../bundles/client.html'
    }
  },
  webpack(config) {
    const { module = {} } = config;
    return {
      ...config,
      devtool: process.env.NODE_ENV === 'production' ? 'hidden-source-map' : 'eval',
      output: {
        ...config.output,
        publicPath: '/_next/',
      },
      module: {
        ...module,
        rules: [
          ...(module.rules || []),
          {
            test: /\.(ico|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: 'url-loader',
            options: {
              name: '[hash].[ext]',
              limit: 20000,
            },
          },
          {
            test: /.*?.css$/,
            loader: ['style-loader', 'css-loader']
          }
        ]
      },
    }
  },
});
