'use strict';

module.exports = app => {
  const jsonp = app.jsonp();

  app.get('/jsonp', jsonp, 'home.jsonp');

  app.get('/', 'home.index');
  app.get('/test', 'home.test');
  app.get('/news', 'news.list');
};
