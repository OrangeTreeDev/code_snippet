'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1546919082149_8067';
  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.tpl': 'nunjucks',
    },
  };

  // add your config here
  // config.middleware = ['errorHandler'];

  config.security = {
    csrf: {
      enable: false
    }
  };

  config.cors = {
    origin: '*',
  };

  config.onerror = {
    all(err, ctx) {
      // console.log('all error handle');
      // console.error(err.status);
      console.error(err.message);
      // console.error(err.code);
      // console.error(err.description);
      // console.error(err);
      // ctx.status = err.status;
      // ctx.body = {code: err.code, description: err.description}
      // 在此处定义针对所有响应类型的错误处理方法
      // 注意，定义了 config.all 之后，其他错误处理方法不会再生效
      // ctx.body = 'error';
      // ctx.status = 500;
    },
    // json(err, ctx) {
    //   // json hander
    //   ctx.body = { message: 'error' };
    //   ctx.status = 500;
    // },
  };

  config.mongoose = {
    client: {
      url: 'mongodb://127.0.0.1/test',
      options: {},
    },
  };

  return config;
};
