/*路由器对象模块*/
import Vue from 'vue'
import VueRouter from 'vue-router'


//声明使用插件
Vue.use(VueRouter)

let routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: resolve => require(['@views/sys/login/Login'], resolve),
  },
  {
    path: '/home',
    component: resolve => require(['@views/common/Home'], resolve),
    children: [
      {
        path: '',
        component: resolve => require(['@views/common/HomeIndex'], resolve),
      },
      {
        path: '/index',
        component: resolve => require(['@views/common/HomeIndex'], resolve),
      },
      {
        path: '/user',
        component: resolve => require(['@views/sys/user/User'], resolve),
      },
      {
        path: '/role',
        component: resolve => require(['@views/sys/role/Role'], resolve),
      },
      {
        path: '/menu',
        component: resolve => require(['@views/sys/menu/Menu'], resolve),
      },
      {
        path: '/dept',
        component: resolve => require(['@views/sys/dept/Dept'], resolve),
      },
      {
        path: '/post',
        component: resolve => require(['@views/sys/post/Post'], resolve),
      },
      {
        path: '/dict',
        component: resolve => require(['@views/sys/dict/DictType'], resolve),
      },
      {
        path: '/dictData/:dictType',
        component: resolve => require(['@views/sys/dict/DictData'], resolve),
      },

    ]
  },
];



// const files = require.context('@views', true, /router\.js$/);

// routes.push({
//   path: '/',
//   redirect: '/home'
// });

// files.keys().forEach(key => {
//   routes = routes.concat(files(key).default);
// });

const router = new VueRouter({
  routes: routes,
  mode: 'history'
});


//路由导航守卫
router.beforeEach((to, from ,next)=>{
  
  if(to.path!="/login"){
    //校验
    const user = sessionStorage.getItem('user');
    if(user){
      next();
    } else {
      next('/login');
    }
  }else{
    next();
  }

});

export default router




