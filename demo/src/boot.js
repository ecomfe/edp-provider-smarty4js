/**
 * @file boot
 * @author junmer
 */

define(function (require, exports, module) {

    var renderer = require('./tpl/smarty.tpl');

    var tplData = {
        dataList: [{
            title: 'hello smarty4js'
        }, {
            title: 'bye bye smarty4js'
        }]
    };

    var html = renderer.render({tplData: tplData});

    document.body.innerHTML = html;

});
