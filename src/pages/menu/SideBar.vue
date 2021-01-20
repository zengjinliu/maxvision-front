<template>
    <!--<div class="side-bar">
      <el-menu
        :default-active="onRoutes"
        class="sidebar-el-menu"
        :collapse="collapse"
        background-color="#334256"
        text-color="#ffffff"
        active-text-color="#20a0ff"
      >
        <el-menu-item index="info" @click="$router.push('/info')">
          <i class="el-icon-house"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        &lt;!&ndash;一级菜单&ndash;&gt;
        <el-submenu v-for="item in menus" :key="item.id" :index="item.url">
          <template slot="title">
            <i :class="item.icon"></i>
            <span>{{item.name}}</span>
          </template>
          &lt;!&ndash; 二级菜单 &ndash;&gt;
          <template v-for="itemChild in item.children">
            <el-menu-item  class="submenu" :index="itemChild.url" :key="itemChild.id" @click="go(itemChild.url)">
              <span slot="title">{{itemChild.name}}</span>
            </el-menu-item>
          </template>
        </el-submenu>
      </el-menu>
    </div>-->
  <el-menu
    class="nav-menu el-menu-vertical-demo"
    :default-active="$route.path"
    background-color="#002033"
    text-color="#fff"
    active-text-color="#ffd04b"
    router
    :collapse="collapse"
  >
    <el-menu-item index="/index" >
      <i class="el-icon-house"></i>
      <span slot="title">首页</span>
    </el-menu-item>
    <el-menu-item index="/test" >
      <i class="el-icon-house"></i>
      <span slot="title">test</span>
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

  import {getSideBar} from "@api/sys/menu";

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
      console.log(this.$route.path);
      //请求菜单
      this.requireItems();
    },
    methods: {
      requireItems() {
        let userId = this.$store.state.user.userId;
        getSideBar(userId).then(res => {
          console.log(res);
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
