const http = require('http');
const compose = require('koa-compose');

module.exports = class Application {
  constructor() {
    this.middleware = [];
  }

  use(fn) {
    if (typeof fn !== 'function') {
      throw new Error('middleware must be a function!');
    }
    this.middleware.push(fn);
    return this; // support adding middleware by chain style
  }

  listen(...args) {
    return http.createServer(this.callback()).listen(...args);
  }

  callback() {
    const fn = compose(this.middleware);

    const handleRequest = function(req, res) {
      const ctx = {
        req,
        res,
      }; // create koa context
      return this.handleRequest(ctx, fn);
    }
    return handleRequest;
  }

  handleRequest() {
    // default response status equal 404
    ctx.res.stat
  }
}