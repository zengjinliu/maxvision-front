<template>
  <el-container class="layout-container">
    <el-aside
      class="aside"
      width="auto"
    >
      <side-bar
      class="aside-menu"
      :collapse="collapse"
      />
    </el-aside>
    <el-container>
      <el-header class="header">
        <div>
          <i
            :class="{
              'el-icon-s-fold': collapse,
              'el-icon-s-unfold': !collapse
            }"
            @click="collapse = !collapse"
          ></i>
          <span>hello</span>
        </div>
        <el-dropdown>
          <div class="avatar-wrap">
            <img class="avatar" src="" alt="">
            <span>{{ collapse}}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>设置</el-dropdown-item>
            <el-dropdown-item
              @click.native=""
            >退出
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main class="main">
        <!-- 子路由出口 -->
        <router-view/>
      </el-main>
    </el-container>
  </el-container>

</template>

<script>
  import vHeader from "./Header";
  import SideBar from "@views/menu/SideBar";

  export default {
    name: "Home",
    data() {
      return {
        collapse: false
      }
    },

    components: {
      vHeader,
      SideBar,

    },
    created() {

    },
    methods:{

    }
  }
</script>

<style scoped>
  .layout-container {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }
  .aside{
    background-color: #d3dce6;
  }
  .aside-menu{
    height: 100%;
  }
  .header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ccc;
  }
  .avatar-wrap{
    display: flex;
    align-items: center;
  }
  .avatar{
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 10px;
  }
  .main{
    background-color: #e9eef3;
  }

</style>
