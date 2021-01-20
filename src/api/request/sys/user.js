import ajax from "@comm/ajax";
import {api} from '@/api/url/index'


//1.分页查询用户
export const getUserPage = (param) => ajax(api.user.userPage, param, 'POST');
//2.删除用户
export const delUser = (userIds) => ajax(api.user.delUser, userIds, 'POST');
//3.检查用户名是否已存在
export const checkNameExist = (username) => ajax(api.user.checkNameExit, {username});
//4.新增用户
export const add = (param) => ajax(api.user.addUser, param, 'POST');
//5.修改用户
export const update = (param) => ajax(api.user.updateUser, param, 'POST');
//6.根据主键id查询用户
export const queryUserById = (userId) => ajax(api.user.queryUserById, {userId});
//7.获取当期用户的权限
export const getAllPerms = (userId) => ajax(api.user.queryCurrentUserPerms,{userId});
//
export const getSingature  = ()=>ajax(api.user.queryCurrentUserPerms,{userId});
