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
    queryTreeMenu:'/api/sys/menu/queryTreeMenu',//根据用户id查询所有菜单
    queryByMenuId:'/api/sys/menu/id',
    updateMenu:'/api/sys/menu/update',
    delMenu:'/api/sys/menu/del',
    addMenu:'/api/sys/menu/add'
  }

}

