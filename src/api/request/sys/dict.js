import ajax from "@comm/ajax";
import {api} from '@/api/url/index'

//1.分页查询所有字典类型表数据
export const queryDictTypePage = (param) => ajax(api.dictType.dictTypePage, param, 'POST');
//2.新增字典类行
export const addDictType = (param) => ajax(api.dictType.dictTypeAdd, param, 'POST');
//3.修改字典类型
export const updateDictType = (param) => ajax(api.dictType.dictTypeUpdate, param, 'POST');
//4.根据id查询字典类型
export const queryDictTypeById = (dictId) => ajax(api.dictType.dictTypeId, {dictId});
//5.删除字典类型
export const delDictType = (dictIds) => ajax(api.dictType.dictTypeDel, dictIds,'POST');
//6.根据字典类型id查出所有字典值
export const queryAllDictType = () => ajax(api.dictType.queryAllDictType);

//7.分页查询字典值
export const queryDictDataPage = (param) => ajax(api.dictData.dictDataPage, param, 'POST');
//8.删除字典值
export const delDictData = (dictCodes) => ajax(api.dictData.dictDataDel, dictCodes,'POST');
//9.修改字典值
export const updateDictData = (param) => ajax(api.dictData.dictDataUpdate, param, 'POST');
//10.查询字典值
export const queryDictDataByDictCode = (dictCode) => ajax(api.dictData.dictDataId, {dictCode});
//11.新增字典值
export const addDictData = (param) => ajax(api.dictData.dictDataAdd, param, 'POST');