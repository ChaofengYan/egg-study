'use strict';

let cheerio = require('cheerio');

module.exports = app => {
  class HomeController extends app.Controller {
    * index(ctx) {

      //this.ctx.body = 'hi, egg';
      //yield app.mysql.insert('list', { img: 'Hello World' });
      
      const result = yield this.ctx.curl(app.config.spiderUrl,{
        dataType: 'text',
        agent: false,
        httpsAgent: false,
      });
      ctx.status = result.status;
      ctx.set(result.headers);
      //console.dir(result.data);
      let $ = cheerio.load(result.data);

      $('title').text('ceshi');
      console.dir($('#imgid'));

      ctx.body = $.html();

      //this.ctx.body = html;
      //yield app.mysql.query('INSERT INTO list (img) VALUES ("test00")');
      //this.ctx.body = yield app.mysql.query('SELECT * FROM list');
    }
    * test() {
      const dataList = {
        list: [
          { id: 1, title: 'this is news 1', url: '/news/1' },
          { id: 2, title: 'this is news 2', url: '/news/2' }
        ]
      };
      yield this.ctx.render('news/list.ejs',dataList);
    }
    * jsonp() {
      this.ctx.body = {test:123};
    }
  }
  return HomeController;
};
