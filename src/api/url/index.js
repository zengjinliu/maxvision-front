import { queryMenuByName } from "../request/sys/menu";

export const api = {
  login: {//登陆模块
    doLogin: '/api/sys/login',//登陆
    doLogout: '/api/sys/logout',//登出
    updatePwd: '/api/sys/user/updatePwd',//修改密码
  },
  user:{//用户模块
    userPage:'/api/sys/user/page',//分页查询用户
    addUser:'/api/sys/user/add', //添加用户
    queryUserById:'/api/sys/user/id',//根据id查询用户
    delUser:'/api/sys/user/del',//删除用户
    updateUser:'/api/sys/user/update',//更新用户
    checkNameExit:'/api/sys/user/checkNameExist',//校验登陆账户名是否已经存在
    queryCurrentUserPerms:'/api/sys/user/queryAllPerms',//查询用户的所有权限
  },
  menu:{//菜单模块
    queryTreeMenu:'/api/sys/menu/queryTreeMenu',//根据用户id查询所有树形菜单
    queryByMenuId:'/api/sys/menu/id',//根据主键查询菜单
    updateMenu:'/api/sys/menu/update',//修改菜单
    delMenu:'/api/sys/menu/del',//删除菜单
    addMenu:'/api/sys/menu/add',//新增菜单,
    queryMenuByName: '/api/sys/menu/queryByMenuName'//更具菜单名查询
  },
  role: {//角色模块
    rolePage:'/api/sys/role/page',//分页查询角色
    addRole:'/api/sys/role/add',//新增角色
    delRole:'/api/sys/role/del',//删除角色
    updateRole:'/api/sys/role/update',//修改角色
    queryByRoleId:'/api/sys/role/id',//根据角色id查询
    queryAllRole:'/api/sys/role/queryAllRole'//查询所有角色
  },
  dept:{//部门模块
    queryTreeDept:'/api/sys/dept/queryTreeDept',//根据用户id查询所有树形部门
    queryByDeptId:'/api/sys/dept/id',//根据主键查询部门
    updateDept:'/api/sys/dept/update',//修改部门
    delDept:'/api/sys/dept/del',//删除部门
    addDept:'/api/sys/dept/add',//新增部门
    queryDeptByName:'/api/sys/dept/queryByDeptName'//根据部门名称查询部门
  },
  post:{//岗位模块
    postPage:'/api/sys/post/page',//分页查询岗位
    addPost:'/api/sys/post/add', //添加岗位
    queryPostById:'/api/sys/post/id',//根据d查询岗位
    delPost:'/api/sys/post/del',//删除岗位
    updatePost:'/api/sys/post/update',//更新岗位
    queryAllPost:'/api/sys/post/queryAllPost',//获取所有岗位
  },
  dictType:{//字典类型模块
    dictTypePage:'/api/sys/dict/type/page',//分页查询字典类型
    dictTypeDel:'/api/sys/dict/type/del',//删除字典类型
    dictTypeUpdate:'/api/sys/dict/type/update',//修改字典类型
    dictTypeAdd:'/api/sys/dict/type/add',//增加字典类型
    dictTypeId:'/api/sys/dict/type/id',//根据id查询字典类型
    queryAllDictType:'/api/sys/dict/type/queryAll',//查询所有字典类型
  },
  dictData:{//字典值模块
    dictDataPage:'/api/sys/dict/data/page',//分页查询字典值
    dictDataDel:'/api/sys/dict/data/del',//删除字典值
    dictDataUpdate:'/api/sys/dict/data/update',//更新字典值
    dictDataAdd:'/api/sys/dict/data/add',//新增字典值
    dictDataId:'/api/sys/dict/data/id',// 更具id查询字典值
  }

}

