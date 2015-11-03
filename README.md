edp-provider-smarty4js
===

[![NPM version](https://img.shields.io/npm/v/edp-provider-smarty4js.svg?style=flat-square)](https://npmjs.org/package/edp-provider-smarty4js) 
[![License](https://img.shields.io/npm/l/edp-provider-smarty4js.svg?style=flat-square)](./LICENSE) 

`edp` 的 `smarty4js` 支持模块，为 `webserver` 和 `build` 命令提供了预定配置

## 安装

```bash
npm install edp-provider-smarty4js --save-dev
```

## 配置

### 

创建 `edp-smarty4js-config.js` 配置

```javascript
var eps = require('edp-provider-smarty4js');

// 默认配置
eps.config({
    'left_delimiter': '{%',
    'right_delimiter': '%}'
});

module.exports = exports = eps;
```

在 `edp-webserver-config.js` 与 `edp-build-config.js` 顶部引入：

```javascript
var eps = require('./edp-smarty4js-config.js');
```

在 `edp-webserver-config.js` 对应部分添加：

```javascript
var smarty4jsHandler = eps.webserver;

exports.getLocations = function () {
    return [
        // handlers
        {
            location: /\.tpl\.js($|\?)/,
            handler: [
                smarty4jsHandler({
                    extname: '.html',
                    complieOption: eps.config()
                })
            ]
        }    
    ];
};


```

在 `edp-build-config.js` 对应部分添加：

```javascript
var Smarty4jsCompiler = eps.build;

new Smarty4jsCompiler({
    files: [
        'src/**/*.tpl.html'
    ],
    complieOption: eps.config()
});
```

搞定！

DEMO
==

```sh
git clone https://github.com/ecomfe/edp-provider-smarty4js.git
cd edp-provider-smarty4js
npm i 
cd demo
edp build
edp webserver start
```
see: <http://127.0.0.1:8868> or <http://127.0.0.1:8868/output>

相关
==

 * [smarty4js](https://github.com/ecomfe/smarty4js)
 * [edp](https://github.com/ecomfe/edp)
 * [edp-webserver](https://github.com/ecomfe/edp-webserver)
 * [edp-build](https://github.com/ecomfe/edp-build)

License
==

MIT &copy; [Baidu Inc.](./LICENSE)
