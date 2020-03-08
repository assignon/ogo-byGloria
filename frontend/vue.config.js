module.exports = {
  devServer: {
    proxy: {
      '^/': {
        target: 'http://ogobygloria-env.eba-p9jjxasc.us-west-2.elasticbeanstalk.com/cd',
        ws: false,
      }
    }
  },
  // outputDir must be added to Django's TEMPLATE_DIRS
  outputDir: './dist/',
  // assetsDir must match Django's STATIC_URL
  assetsDir: 'static',
}