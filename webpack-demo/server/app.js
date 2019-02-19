const Koa = require('koa');
const app = new Koa();
/**
 * Koa can take two different kinds of functions as middleware
 */
// async function
// app.use(async (ctx, next) => {
//   const startTime = Date.now();
//   await next();
//   const lapse = Date.now() - startTime;
//   ctx.set('X-Response-Time', `${lapse}ms`);
// });

// // common function
app.use((ctx, next) => {
  // throw new Error('something error');
  const startTime = Date.now();
  next();
  // next().then((res) => {
  //   console.log(res);
  //     ctx.body = 'hello koa';
  //   const lapse = Date.now() - startTime;
  //   ctx.set('X-Response-Time', `${lapse}ms`);
  // });
})

app.use(async (ctx, next) => {
  setTimeout(() => {
    ctx.status = 200;
    ctx.body = 'hello koa';
  }, 1000);
  return 'done';
});
app.listen(3000, () => console.log('listening at http://localhost:3000'));