'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    await this.ctx.render('home/index.html');
  }

  async echo() {
    this.ctx.logger.info('echo start');
    this.ctx.logger.info('echo request body: ', this.ctx.request.body);
    const { name } = this.ctx.request.body;
    this.ctx.status = 400;
    this.ctx.body = `hi, ${name}`;
  }

  async list() {
    this.ctx.status = 200;
    this.ctx.body = ['sun', 'song', 'li'];
  }
}

module.exports = HomeController;
