/**
 * @file edp-provider-smarty4js
 * @author junmer[junmer@foxmail.com]
 */

var extend = require('xtend');
var smarty4js = require('smarty4js');
var webserver = require('./lib/webserver');
var build = require('./lib/build');


/* eslint-disable fecs-camelcase */

/**
 * 默认配置
 *
 * @type {Object}
 */
var defaultConfig = {
    left_delimiter: '{%',
    right_delimiter: '%}'
};

/* eslint-enable fecs-camelcase */

/**
 * 获取／设置 配置
 *
 * @param  {Object|Stirng=} opt 设置配置
 * @return {Object}
 */
function config(opt) {

    if (!opt) {
        return defaultConfig;
    }

    if (typeof opt === 'string') {
        return defaultConfig[opt];
    }

    return extend(defaultConfig, opt);

}


module.exports = exports = {
    smarty4js: smarty4js,
    build: build,
    webserver: webserver,
    config: config
};
