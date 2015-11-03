/**
 * @file smarty4js 处理器
 * @author wukaifang(wukaifang@baidu.com),
 *         menglingjun(menglingjun@baidu.com)
 *
 */

var extend = require('xtend');
var Smarty4Js = require('smarty4js');

/**
 * smarty4jsCompiler instance
 *
 * @type {Object}
 */
var smarty4jsCompiler = {};

/**
 * 处理器名称
 *
 * @type {string}
 */
smarty4jsCompiler.name = 'Smarty4jsCompiler';

/**
 * 构建处理
 *
 * @param {FileInfo} file 文件信息对象
 * @param {ProcessContext} processContext 构建环境对象
 * @param {Function} callback 处理完成回调函数
 */
smarty4jsCompiler.process = function (file, processContext, callback) {

    var smarty4Js = this.smarty4Js;

    if (!this.smarty4jsInited) {

        smarty4Js.config(this.complieOption);

        var regExt = new RegExp('.' + file.extname + '$');

        /**
         * 替换路径后缀名为 js
         *
         * @param  {stirng} path 原路径
         * @return {stirng}      js 路径
         */
        this.rePath = function (path) {
            return path.replace(regExt, '.js');
        };

        this.smarty4jsInited = true;
    }

    var rePath = this.rePath;

    var FileInfo = file.constructor;

    var fileConfig = {
        path: rePath(file.path),
        outputPath: rePath(file.outputPath),
        fullPath: rePath(file.fullPath),
        extname: 'js',
        data: smarty4Js.compile(file.data).getJsTpl()
    };

    var jsFile = new FileInfo(fileConfig);

    // 加入到 processContext
    processContext.addFile(jsFile);

    callback();

};

/**
 * smarty4js 处理器
 *
 * @constructor
 * @param {Object} options 初始化参数
 * @param {string} options.files 匹配文件
 * @param {string=} options.complieOption smarty4js 参数
 * @param {string=} options.complieOption.left_delimiter smarty模板左定界符
 * @param {string=} options.complieOption.right_delimiter smarty模板右定界符
 */
function Smarty4jsCompiler(options) {

    /* eslint-disable fecs-camelcase */

    return extend(
        smarty4jsCompiler, {
            smarty4Js: new Smarty4Js(),
            files: ['src/**/*.tpl.html'],
            complieOption: {
                left_delimiter: '{%',
                right_delimiter: '%}'
            }
        },
        options
    );

    /* eslint-enable fecs-camelcase */

}

module.exports = exports = Smarty4jsCompiler;
