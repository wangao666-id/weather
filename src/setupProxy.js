const { createProxyMiddleware } = require('http-proxy-middleware')

// 配置代理服务器
module.exports = function (app) {
    // body
    app.use(createProxyMiddleware("/myApi", {
        target: ' https://route.showapi.com/',
        changeOrigin: true,
        pathRewrite: {
            "^/myApi": ""
        }
    }
    ))
}