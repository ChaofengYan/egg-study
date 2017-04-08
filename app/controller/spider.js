module.exports = app => {
  class SpiderController extends app.Controller {
    * list() {
      const ctx = this.ctx;
      const page = ctx.query.page || 1;
      const newsList = yield ctx.service.news.list(page);
      yield ctx.render('news/list.tpl', { list: newsList });
    }
    * detail() {
      const ctx = this.ctx;
      const page = ctx.query.page || 1;
      const newsList = yield ctx.service.news.list(page);
      yield ctx.render('news/list.tpl', { list: newsList });
    }
  }
  return SpiderController;
};