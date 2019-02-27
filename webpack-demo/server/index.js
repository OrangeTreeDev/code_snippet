const path = require('path');
const Koa = require('koa');
const koaBody = require('koa-body');
const entry = require('./middleware/entry.js');
const webpackConfig= require('../build/webpack.dev.conf');

async function boot() {
  const app = new Koa();
  app.use(koaBody());
  
  const isStatic= process.env.NODE_ENV === 'production';
  const staticRoot = path.resolve(__dirname, '../dist');
  const entryMiddleware = await entry(isStatic, webpackConfig, staticRoot)
  app.use(entryMiddleware);
  
  app.listen(3000, () => console.log('app is listening on http://127.0.0.1:3000'));
}

boot();