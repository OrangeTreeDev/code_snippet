const send = require('koa-send');
const Koa = require('koa');
const app = new Koa();

// console.log(process.env.NODE_ENV);

app.use(async (ctx) => {
  await send(ctx, ctx.path, {
    root: __dirname,
    index: 'index.html'
  });
});

app.listen(3000);