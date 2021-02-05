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
//5.在修改密码时校验原密码是否正确
export const checkPwd = (params) =>ajax(api.login.checkPwd,params,'POST');
//6.分页查询登陆日志信息
export const loginInfoPage = (params) => ajax(api.login.loginInfoPage, params, 'POST');
//7.分页查询操作日志信息
export const operateInfoPage = (params) => ajax(api.login.operatorPage, params, 'POST');






