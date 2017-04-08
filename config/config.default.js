'use strict';

// exports.view = {
//   //defaultViewEngine: 'ejs',
//   // mapping: {
//   //   '.ejs': 'ejs',
//   // },
//   defaultViewEngine: 'nunjucks',
//   mapping: {
//     '.tpl': 'nunjucks',
//   },
// };

module.exports = appInfo => {
  const config = {
    view: {
      defaultViewEngine: 'nunjucks',
      mapping: {
        '.tpl': 'nunjucks',
        '.ejs':'ejs'
      },
    },
    spiderUrl:'https://www.npmjs.com/search',
    news:{
      pageSize: 5,
      serverUrl: 'https://hacker-news.firebaseio.com/v0',
    },
    middleware:[
      'robot'
    ],
    robot : {
      ua: [
        /Baiduspider/i,
      ]
    },
    jsonp:{
      //limit: 50,
      callback: 'callback',  //key值
      //csrf: false,
      //whiteList: /\*/,
    },
    mysql:{
      // 单数据库信息配置
      client: {
        // host
        host: '127.0.0.1',
        // 端口号
        port: '3306',
        // 用户名
        user: 'root',
        // 密码
        password: 'Yan989824',
        // 数据库名
        database: 'spider',
      },
      // 是否加载到 app 上，默认开启
      app: true,
      // 是否加载到 agent 上，默认关闭
      agent: false,
    }
  };

  // should change to your own
  config.keys = appInfo.name + '_1490612269831_6658';

  return config;
};