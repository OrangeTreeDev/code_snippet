const Service = require('egg').Service;

class AuthorService extends Service {

  async findOne(name) {
    return this.ctx.model.Author.findOne({ name }).lean();
  }

  async save(name) {
    const author = new this.ctx.model.Author({name});
    const res = await author.save();
    console.log(res);
  }
}

module.exports = AuthorService;
