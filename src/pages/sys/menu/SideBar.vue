<template>
  <div class="sidbar-container">
    <div class="sidebar-title">
      <h1 class="title" v-if="!collapse">{{ systemTitle }}</h1>
    </div>
    <div class="sidebar-area">
      <el-menu
        class="nav-menu el-menu-vertical-demo"
        :default-active="$route.path"
        background-color="#002033"
        text-color="#fff"
        active-text-color="#ffd04b"
        router
        :collapse="collapse"
      >
        <el-menu-item index="/home">
          <icon-svg name="index"></icon-svg>
          <span slot="title">首页</span>
        </el-menu-item>
        <!--一级菜单-->
        <el-submenu v-for="item in menus" :key="item.id" :index="item.url">
          <template slot="title">
            <icon-svg :name="item.icon"></icon-svg>
            <span>{{ item.name }}</span>
          </template>
          <!-- 二级菜单 -->
          <template v-for="itemChild in item.children">
            <el-menu-item
              class="submenu"
              style="padding-left:55px"
              :index="itemChild.url"
              :key="itemChild.id"
            >
              <span slot="title">{{ itemChild.name }}</span>
            </el-menu-item>
          </template>
        </el-submenu>
      </el-menu>
    </div>
  </div>
</template>

<script>
import { queryTreeMenu } from "@api/sys/menu";

export default {
  name: "SideBar",
  props: ["collapse"],
  data() {
    return {
      menus: [],
      systemTitle: "智能审讯监管平台",
    };
  },
  created() {
    console.log('----------------->sidebar');
    //请求菜单
    this.requireItems();
  },
  methods: {
    requireItems() {
      let user = JSON.parse(sessionStorage.getItem("user"));
      this.menus = user.menus;
      // let userId = this.$store.state.user.userId;
      // queryTreeMenu(userId).then((res) => {
      //   if (res.code === 200) {
      //     this.menus = res.data;
      //   }
      // });
    },
  },
};
</script>

<style scoped>
.sidbar-container {
  height: 100%;
}

.el-menu {
  border-right: none;
  list-style: none;
  position: relative;
  margin: 0;
  padding-left: 0;
  background-color: #fff;
}
.sidebar-title {
  height: 60px;
  width: 180px;
}
.title {
  display: inline-block;
  margin: 0;
  font-weight: 600;
  line-height: 60px;
  font-size: 14px;
  vertical-align: middle;
  color: #fff;
}

.sidebar-area {
  width: 180px;
  height: calc(100% - 60px);
  overflow-x: hidden;
  overflow-y: scroll;
}

.sidebar-area::-webkit-scrollbar {
  display: none;
}
.sidebar-area > ul {
  height: 100%;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 180px;
  min-height: 100%;
}
.horizontal-collapse-transition {
  transition: 0s width ease-in-out, 0s padding-left ease-in-out,
    0s padding-right ease-in-out;
}

.el-submenu,
.el-menu-item {
  text-align: left;
}

.aside::-webkit-scrollbar {
  display: none;
}
.el-submenu .el-menu-item {
  min-width: 180px;

}
.title {
  text-align: center;
  font-size: 1.3vw;
}
</style>
