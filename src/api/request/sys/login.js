/*
* 包含N个接口请求函数的模块
*/

import ajax from "@comm/ajax";
import {api} from '@/api/url/index'


//生成随机值uuid(方便后期拓展权限)
export function getUUID() {
  return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, c => {
    return (c === 'x' ? (Math.random() * 16 | 0) : ('r&0x3' | '0x8')).toString(16)
  })
}

//1：登录
export const doLogin = (params) => ajax(api.login.doLogin, params, 'POST');
//3.退出登录
export const doLogout = () => ajax(api.login.doLogout);
//4.修改密码
export const updatePwd = (params) => ajax(api.login.updatePwd, params, 'POST')
//5.请求验证码
export const requireMsgCode = (params) => ajax(api.login.requireMsgCode, params, 'POST')






