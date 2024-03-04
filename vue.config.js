const { defineConfig } = require('@vue/cli-service') 
const proxysite = 'https://api.vvhan.com';
module.exports = {
  publicPath: './',

  devServer: {
   
    proxy: {
      '/wyy': {
        target: proxysite,
        changeOrigin: true,
        pathRewrite: { '^/wyy':'' },
      },
    },
    port:81
  }
}
  
