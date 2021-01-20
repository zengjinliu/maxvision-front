<template>
  <el-menu
    class="nav-menu el-menu-vertical-demo"
    :default-active="$route.path"
    background-color="#002033"
    text-color="#fff"
    active-text-color="#ffd04b"
    router
    :collapse="collapse"
  >
    <el-menu-item index="/home" >
      <i class="el-icon-house"></i>
      <span slot="title">首页</span>
    </el-menu-item>
    <!--一级菜单-->
    <el-submenu v-for="item in menus" :key="item.id" :index="item.url">
      <template slot="title">
        <i :class="item.icon"></i>
        <span>{{item.name}}</span>
      </template>
      <!-- 二级菜单 -->
      <template v-for="itemChild in item.children">
        <el-menu-item  class="submenu" :index="itemChild.url" :key="itemChild.id" >
          <span slot="title">{{itemChild.name}}</span>
        </el-menu-item>
      </template>
    </el-submenu>

  </el-menu>
</template>

<script>

  import {queryTreeMenu} from "@api/sys/menu";

  export default {
    name: "SideBar",
    props: ['collapse'],
    data() {
      return {
        menus: []
      }
    },
    computed: {
      onRoutes() {
        return this.$route.path.replace('/', '');
      }
    },
    created() {
      //请求菜单
      this.requireItems();
    },
    methods: {
      requireItems() {
        let userId = this.$store.state.user.userId;
        queryTreeMenu(userId).then(res => {
          if (res.code === 200) {
            this.menus = res.data;
          }
        })
      },
      go(url) {
        this.$router.push(url);
      }
    }
  }
</script>

<style scoped>
  .iconfont {
    margin-right: 10px;
    padding-left: 15px;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }

</style>
