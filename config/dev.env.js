'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',//开发环境
  BASE_URL: '"http://localhost:8082"',//前端开发地址
  BACK_URL: '"http://localhost:8081'//后端开发地址
})
