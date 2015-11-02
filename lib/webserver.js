/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id$
 *
 **************************************************************************/


/**
 * lib/handlers/smarty4js.js ~ 2015/02/7
 * @author wukaifang(wukaifang@baidu.com)
 *         menglingjun(menglingjun@baidu.com)
 * @version $Revision$
 * @description
 *
 **/

var fs = require('fs');
var Smarty4Js = require('smarty4js');

/**
 * smarty4js
 * 编译smarty模板成js并输出
 *
 * @param {Object=} options 参数
 * @param {string=} options.encoding 文件编码，默认utf8
 * @param {string=} options.extname 模板的拓展名，默认html
 * @param {string=} options.complieOption smarty4js 参数
 * @param {string=} options.complieOption.leftDelimiter smarty模板左定界符
 * @param {string=} options.complieOption.rightDelimiter smarty模板右定界符
 * @return {Function}
 */
module.exports = exports = function (options) {
    options = options || {};
    options.encoding = options.encoding || 'utf8';
    options.extname = options.extname || '.html';
    var complieOption = options.complieOption || {};

    var smarty4Js = new Smarty4Js();

    smarty4Js.config(complieOption);

    return function (context) {

        var requestFile = context.conf.documentRoot + context.request.pathname;

        var tplPath = requestFile.replace(/\.js$/, options.extname);

        if (fs.existsSync(tplPath)) {

            var compiler = smarty4Js.compile(fs.readFileSync(tplPath, options.encoding));

            context.content = compiler.getJsTpl();

        }
        else {
            context.status = 404;
        }

        context.start();
    };
};
