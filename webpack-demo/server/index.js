const Koa = require('koa');
const koaWebpack = require('koa-webpack');
const webpackDevConfig = require('../build/webpack.dev.conf');

const app = new Koa();
const koaWebpackMiddle = await koaWebpack({ config: webpackDevConfig });
app.use(koaWebpackMiddle);

app.listen(3000, () => console.log('is listening on http://127.0.0.1:3000'));