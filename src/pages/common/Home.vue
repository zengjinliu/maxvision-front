<template>
  <el-container class="layout-container">
    <el-aside :width="collapse ? '60px' : '180px'">
      <side-bar :collapse="collapse" />
    </el-aside>
    <el-container>
      <el-header class="header">
        <div class="tools">
          <i
            :class="{
              'el-icon-s-fold': collapse,
              'el-icon-s-unfold': !collapse,
            }"
            @click="toolsClick()"
          ></i>
          <i class="el-icon-rank" @click="handleFullScreen"></i>
         
        </div>
        <el-dropdown>
          <div class="avatar-wrap">
            <span>{{ loginName }}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="modifyPassword()"
              >修改密码</el-dropdown-item
            >
            <el-dropdown-item @click.native="logout()">退出 </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main class="main">
        <!-- 子路由出口 -->
        <router-view />
      </el-main>
      <update-password v-if="showDialog" ref="updatePassword"></update-password>
    </el-container>
  </el-container>
</template>

<script>
import SideBar from "@views/sys/menu/SideBar";
import UpdatePassword from "./UpdatePassword";

import { doLogout } from "@api/sys/login";

export default {
  name: "Home",
  data() {
    return {
      collapse: false, //收缩侧边栏
      fullScreen: false, //全屏
      showDialog: false, //展示修改密码弹窗
    };
  },
  computed: {
    loginName() {
      return this.$store.state.user.loginName;
    },
  },

  components: {
    SideBar,
    UpdatePassword,
  },
  created() {},
  methods: {
    logout() {
      doLogout()
        .then(() => {
          //退出登陆
          sessionStorage.clear();
        })
        .then(() => {
          this.$router.push("/login");
        });
    },
    //全屏处理(处理浏览器兼容问题)
    handleFullScreen() {
      let element = document.documentElement;
      if (this.fullScreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
          element.msRequestFullscreen();
        }
      }
      this.fullScreen = !this.fullScreen;
    },
    //修改密码
    modifyPassword() {
      this.showDialog = true;

      this.$nextTick(() => {
        this.$refs.updatePassword.init();
      });
    },
    //收缩菜单
    toolsClick() {
      this.collapse = !this.collapse;
    },
    
  },
};
</script>

<style scoped>
.layout-container {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
.el-aside {
  background-color: rgb(0, 32, 51);
  overflow-x: hidden;
  overflow-y: hidden;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
}
.avatar-wrap {
  display: flex;
  align-items: center;
}
.avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
}
.main {
  background-color: #e9eef3;
}
.tools {
  display: flex;
  width: 100px;
}
.tools i {
  font-size: 25px;
  margin-right: 20px;
}
</style>
