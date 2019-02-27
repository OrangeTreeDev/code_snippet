const compose = require('koa-compose');
const koaWebpack = require('koa-webpack');
const serve = require('koa-static');
const logger = require('../util/logger');

module.exports = async (isStatic, config, root) => {
  const middlewares = [];
  async function errorHandle (ctx, next) {
    try {
      await next();
    } catch(e) {
      ctx.status = 500;
      ctx.body = 'Internal Server Error';
    }
  }
  
  async function httpLogger(ctx, next) {
    const hasBody = Object.keys(ctx.request.body).length !== 0;
    if (hasBody) {
      logger.info('http', `${ctx.method} ${ctx.url} -body %o`, ctx.request.body);
    } else {
      logger.info('http', `${ctx.method} ${ctx.url}`);
    }
    await next();
  }
  middlewares.push(errorHandle, httpLogger);

  if (isStatic) {
    // Static file serving middleware, gzip file and set cache-control
    middlewares.push(serve(root, {
      maxage: 30 * 24 * 60 * 60 * 1000, // cache 30d
    }));
  } else {
    // Development and Hot Module Reload Middleware 
    const webpackMiddleware = await koaWebpack({ config });
    middlewares.push(webpackMiddleware);
  }
  return compose(middlewares);
}

