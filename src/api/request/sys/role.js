import ajax from "@comm/ajax";
import {api} from '@/api/url/index'

//1.分页查询
export const queryRolePage = (param) => ajax(api.role.rolePage, param, 'POST');
//2.新增角色
export const addRole = (param) => ajax(api.role.addRole, param, 'POST');
//3.删除角色
export const delRole = (param) => ajax(api.role.delRole, param, 'POST')
//4.根据角色主键查询
export const queryByRoleId = (roleId) => ajax(api.role.queryByRoleId,{roleId});
//修改角色
export const updateRole = (param) => ajax(api.role.updateRole,param,'POST');
//获取所有的角色
export const queryAllRole = () => ajax(api.role.queryAllRole);
