const { createProxyMiddleware } = require("http-proxy-middleware");
//process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'
module.exports = function (app) {
  app.use(
    createProxyMiddleware("/peerjs", {
      target: "https://localhost:9000/",
      pathRewrite: {
        "^/peerjs": "/peerjs",
      },
      secure: false
    })
  );
};