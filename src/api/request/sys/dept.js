import ajax from "@comm/ajax";
import {api} from '@/api/url/index'


//1.获取部门树形结构信息
export const queryTreeDept= () => ajax(api.dept.queryTreeDept)
//3.删除部门
export const delDept = (deptId) => ajax(api.dept.delDept,{deptId});
//4.添加部门
export const addDept = (param) => ajax(api.dept.addDept, param, 'POST')
//5.通过部门id查询
export const queryByDeptId = (deptId) => ajax(api.dept.queryByDeptId, {deptId});
//6.通过主键修改部门
export const updateDept = (param) => ajax(api.dept.updateDept, param, 'POST');
//7.根据部门名模糊查询部门
export const queryDeptByName = (deptName) => ajax(api.dept.queryDeptByName,{deptName});