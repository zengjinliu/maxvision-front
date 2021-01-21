export const api = {
  login: {
    doLogin: '/api/sys/login',
    doLogout: '/api/sys/logout',
    updatePwd: '/api/sys/user/updatePwd',
  },
  user:{
    userPage:'/api/sys/user/page',//分页查询用户
    addUser:'/api/sys/user/add',
    queryUserById:'/api/sys/user/id',
    delUser:'/api/sys/user/del',
    updateUser:'/api/sys/user/update',
    checkNameExit:'/api/sys/user/checkNameExist',
    queryCurrentUserPerms:'/api/sys/user/queryAllPerms',
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
  }

}

