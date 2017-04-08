'use strict';

let cheerio = require('cheerio');
const co = require('co');

module.exports = app => {
  class HomeController extends app.Controller {
    async index(ctx) {

      app.mysql.query = co.wrap(app.mysql.query);

      //this.ctx.body = 'hi, egg';
      //yield app.mysql.insert('list', { img: 'Hello World' });
      
      let values='';

      async function logInOrder() {
        // 并发读取远程URL
        const textPromises = Array.from({ length: 1 }).map(async (item,index) => {
          const result = await ctx.curl(app.config.spiderUrl,{
            dataType: 'text',
            agent: false,
            timeout: 60000,  // 创建连接超时 60 秒，接收响应超时 60 秒
            httpsAgent: false,
            data:{
              q:'CHEERIO',
              page:index+1,
              ranking:'optimal'
            }
          });
          return result.data;
        });

        // 按次序输出
        for (const textPromise of textPromises) {
          const data = await textPromise;
          let $ = cheerio.load(data);

          let searchResultList = $('.search-results').find('li');

          console.dir(searchResultList.length);
          
          Array.from(searchResultList).forEach((item,index)=>{
            const name = $(item).find('.packageName').text();
            console.dir(name); 
            values+=values?`,("${name}")`:`("${name}")`;    
          });
          
        }
      }

      const isFinished = await logInOrder();

      console.dir(`INSERT INTO list (img) VALUES ${values}`);
      await app.mysql.query(`INSERT INTO list (img) VALUES ${values}`);

      this.ctx.body = 'finished !';

      // const result = await this.ctx.curl(app.config.spiderUrl,{
      //   dataType: 'text',
      //   agent: false,
      //   httpsAgent: false,
      //   data:{
      //     q:'CHEERIO',
      //     page:8,
      //     ranking:'optimal'
      //   }
      // });

      // ctx.status = result.status;
      // ctx.set(result.headers);

      // let $ = cheerio.load(result.data);

      // let searchResultList = $('.search-results').find('li');

      // console.dir(searchResultList.length);
      // Array.from(searchResultList).forEach((item)=>{
      //   console.dir($(item).find('.packageName').text());
      // });

      // $('title').text('ceshi');

      // ctx.body = $.html();

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
