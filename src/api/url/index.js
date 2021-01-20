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
    getSideMenus:'/api/sys/menu/getNavList'
  }

}

