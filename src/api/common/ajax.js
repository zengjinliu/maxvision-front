/*
ajax请求函数封装模块
  url:请求路径
  data:请求参数，默认为空(是一个对象)
  type:请求方式,默认是GET
  返回值：promise对象(异步返回的数据是：response.data)
*/

import Axios from 'axios'
import VueRouter from '../../router'
import {MessageBox, Message } from 'element-ui'


//请求地址
const axios = Axios.create({
  baseURL: process.env.BASE_URL,
  withCredentials:true,
  timeout: 3000
});
/**
 * 请求拦截
 */
axios.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error)
})

/**
 * 响应拦截
 */
axios.interceptors.response.use(res => {
  //返回错误码在请求头中
  const errorCode = res.headers.code
  if (errorCode) {
    if (errorCode === '401') {
      MessageBox.alert('登录状态已过期，者重新登录', '系统提示', {
        confirmButtonText: '重新登录',
        showClose:false,
        closeOnClickModal:false,
        showCancelButton:false,
        type: 'warning'
      }).then(() => {
        sessionStorage.clear();
        VueRouter.push({ path: '/login' });
      }).catch(() => { });
    } else if (errorCode === '403') {
      Message.error('无操作权限')
      return Promise.reject(new Error('msg')).catch(e=>{});
    }
  } else {
    const msg = res.data.msg || '';
    const code = res.data.code || 200;
    //通过了后台拦截 校验返回的数据在res.data中
    if (code === 500) {
      Message.error(msg)
      return Promise.reject(new Error(msg)).catch(e=>{});
    } else {
      return res;
    }
  }
}, error => {
  return Promise.reject(error).catch(e=>{});
})

export default function ajax(url, data = {}, type = 'GET') {
  /*高阶函数*/
  return new Promise(function (resolve, reject) {
    let promise
    if (type === "GET") {
      //准备url query参数数据
      let dataStr = '';//数据拼接字符串
      Object.keys(data).forEach(key => {
        //aes加密
        dataStr += key + '=' + data[key] + '&'
      })

      if (dataStr !== '') {
        dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
        url = url + '?' + dataStr
      }
      // 发送 get 请求
      promise = axios.get(url)
    } else {
      // 发送 post 请求
      promise = axios.post(url, data);

    }
    //成功了调用resolve
    promise.then(response => {
      if (response) {
        resolve(response.data)
      }
    }).catch(error => {
      //失败了调用reject
      reject(error);
    })
  });
}

