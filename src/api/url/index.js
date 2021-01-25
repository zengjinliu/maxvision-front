export const api = {
  login: {
    doLogin: '/api/sys/login',//登陆
    doLogout: '/api/sys/logout',//登出
    updatePwd: '/api/sys/user/updatePwd',//修改密码
  },
  user:{
    userPage:'/api/sys/user/page',//分页查询用户
    addUser:'/api/sys/user/add', //添加用户
    queryUserById:'/api/sys/user/id',//更具id查询用户
    delUser:'/api/sys/user/del',//删除用户
    updateUser:'/api/sys/user/update',//更新用户
    checkNameExit:'/api/sys/user/checkNameExist',//校验用户名是否已经存在
    queryCurrentUserPerms:'/api/sys/user/queryAllPerms',//查询用户的所有权限
  },
  menu:{
    queryTreeMenu:'/api/sys/menu/queryTreeMenu',//根据用户id查询所有树形菜单
    queryByMenuId:'/api/sys/menu/id',//根据主键查询菜单
    updateMenu:'/api/sys/menu/update',//修改菜单
    delMenu:'/api/sys/menu/del',//删除菜单
    addMenu:'/api/sys/menu/add'//新增菜单
  },
  role: {
    rolePage:'/api/sys/role/page',//分页查询角色
    addRole:'/api/sys/role/add',//新增角色
    delRole:'/api/sys/role/del',//删除角色
    updateRole:'/api/sys/role/update',//修改角色
    queryByRoleId:'/api/sys/role/id',//根据角色id查询
    queryAllRole:'/api/sys/role/queryAllRole'//查询所有角色
  },
  dept:{
    queryTreeDept:'/api/sys/dept/queryTreeDept',//根据用户id查询所有树形部门
    queryByDeptId:'/api/sys/dept/id',//根据主键查询部门
    updateDept:'/api/sys/dept/update',//修改部门
    delDept:'/api/sys/dept/del',//删除部门
    addDept:'/api/sys/dept/add'//新增部门
  },

}

