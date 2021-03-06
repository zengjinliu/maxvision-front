/*入口js*/
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import '@/assert/css/main.css'
import store from './store/index'
import Bus from './api/common/bus'
import {Auth} from './api/common/auth'
import Echart from 'echarts'
import './icons'; // icon
import md5 from 'js-md5'
import '@/api/common/websocket'


//全局挂载
Vue.prototype.HasPerms = Auth;
Vue.prototype.$echarts = Echart;
Vue.prototype.$md5 = md5;
Vue.prototype.$ws = window.maxWebSocket
//全局插件引用
Vue.use(ElementUI,{ size: 'small', zIndex: 3000 })
Vue.use(Bus)



new Vue({
  el:'#app',
  render: h => h(App),
  router,
  store
})

