import ajax from "@comm/ajax";
import {api} from '@/api/url/index'


//1.分页查询部门
export const queryPostPage = (param) => ajax(api.post.postPage, param, 'POST');
//2.删除部门
export const delPost = (postIds) => ajax(api.post.delPost, postIds, 'POST');
//3.新增部门
export const addPost = (param) => ajax(api.post.addPost, param, 'POST');
//4.修改部门
export const updatePost = (param) => ajax(api.post.updatePost, param, 'POST');
//5.根据主键id查询部门
export const queryPostById = (postId) => ajax(api.post.queryPostById, {postId});
//6.获取所有岗位
export const queryAllPost = () => ajax(api.post.queryAllPost);