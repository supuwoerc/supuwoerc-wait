'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')
const buildWithCDN = true; //是否排除依赖打包
const externals = { //排除打包依赖映射
    'vue': 'Vue',
    'vuex': 'Vuex',
    'vue-router': 'VueRouter',
    'element-ui': 'ELEMENT',
    'axios': 'axios',
    'moment': 'moment'
};
const buildResources = { //打包时需要加载的依赖资源
    js: [
        'https://unpkg.com/vue@2.5.21/dist/vue.min.js',
        'https://unpkg.com/vuex@3.0.1/dist/vuex.min.js',
        'https://unpkg.com/element-ui@2.4.11/lib/index.js'
    ],
    css: ['https://at.alicdn.com/t/font_1792583_5jf0jn0h7l6.css']
}
module.exports = {
    dev: {

        // Paths
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: {},

        // Various Dev Server settings
        host: 'localhost', // can be overwritten by process.env.HOST
        port: 8088, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
        autoOpenBrowser: false,
        errorOverlay: true,
        notifyOnErrors: true,
        poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-


        /**
         * Source Maps
         */

        // https://webpack.js.org/configuration/devtool/#development
        devtool: 'cheap-module-eval-source-map',

        // If you have problems debugging vue-files in devtools,
        // set this to false - it *may* help
        // https://vue-loader.vuejs.org/en/options.html#cachebusting
        cacheBusting: true,

        cssSourceMap: true
    },
    build: {
        // Template for index.html
        index: path.resolve(__dirname, '../dist/index.html'),

        // Paths
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: './',
        /**
         * Source Maps
         */
        buildWithCDN: buildWithCDN, //自己编写的插件  开启后打包向html注入CDN资源来降低打包产物大小
        externals: process.env.NODE_ENV === 'production' && buildWithCDN ? externals : {}, //打包时排除的第三方依赖  换用CDN资源
        productionSourceMap: false, //关闭生产环境的sourcemap 优化加载速度
        // https://webpack.js.org/configuration/devtool/#production
        devtool: '#source-map',

        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: true, //开启gzip压缩资源  对应的是tomcat或者Nginx也需要相关配置
        productionGzipExtensions: ['js', 'css'],

        // Run the build command with an extra argument to
        // View the bundle analyzer report after build finishes:
        // `npm run build --report`
        // Set to `true` or `false` to always turn it on or off
        bundleAnalyzerReport: process.env.npm_config_report
    },
    externals: externals,
    buildResources: buildResources
}