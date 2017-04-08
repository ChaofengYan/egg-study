'use strict';

// had enabled by egg
// exports.static = true;

exports.nunjucks = {
  enable: true,
  package: 'egg-view-nunjucks'
};

exports.ejs = {
  enable: true,
  package: 'egg-view-ejs'
};

exports.jsonp = {
  enable: true,
  package: 'egg-jsonp',
};

exports.mysql = {
  enable: true,
  package: 'egg-mysql',
};

exports.proxyagent = {
  enable: true,
  package: 'egg-development-proxyagent',
};