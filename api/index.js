const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// اطلاعات کانفیگ Cloudflare Worker تو:
const SERVER_ADDRESS = '190.93.246.54';
const SERVER_PORT = '8443';
const SERVER_HOST = 'ez-92e8d5.abrahem-sobhi20.workers.dev';

app.use(
  '/',
  createProxyMiddleware({
    target: `https://${SERVER_ADDRESS}:${SERVER_PORT}`,
    changeOrigin: true,
    ws: true,
    secure: false,
    pathRewrite: { '^/': '/' },
    headers: {
      'Host': SERVER_HOST,        // مهم! کلودفلر این رو چک میکنه
      'User-Agent': 'Mozilla/5.0'
    },
    followRedirects: true,
  })
);

module.exports = app;
