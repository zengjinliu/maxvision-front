import ajax from "@comm/ajax";
import {api} from '@/api/url/index'


//1.根据当前用户获取对应的菜单
export const queryTreeMenu = (userId) => ajax(api.menu.queryTreeMenu,{userId})
//3.删除菜单
export const delMenu = (menuId) => ajax(api.menu.delMenu,{menuId});
//4.添加菜单
export const addMenu = (param) => ajax(api.menu.addMenu, param, 'POST')
//5.通过菜单id查询
export const queryByMenuId = (menuId) => ajax(api.menu.queryByMenuId, {menuId});
//6.通过主键修改菜单
export const updateMenu = (param) => ajax(api.menu.updateMenu, param, 'POST');
