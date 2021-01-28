<template>
        <el-header class="header">
          <div>
            <i class="el-icon-menu" @click="handleCollapse" ></i>
            <span>审讯平台</span>
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
</template>

<script>
  import UpdatePassword from "./UpdatePassword";
  import {doLogout} from "@api/sys/login";
  import {clearLoginInfo} from "@comm/ajax";

  export default {
    name: "Header",
    data() {
      return {
        collapse:false,
        fullScreen: false,
        modifyPwd: false,
      }

    },
    created() {
      // //通过Bus进行组件之间的通讯
      // this.$bus.$emit('collapse',this.collapse);
    },
    components:{
      UpdatePassword,
    },
    computed: {
      username() {
        return this.$store.state.user.username;
      },
      pic() {
        return this.$store.state.user.pic;
      }
    },
    methods: {
      handleCollapse(){
        this.collapse = !this.collapse;
        this.$emit('child-collapse',this.collapse);
      },
      //点击全屏处理(浏览器兼容处理)
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
      //退出登录
      logout() {
        this.$confirm(`确定进行[退出]操作`,'提示',{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
          doLogout();
          //清除cookie信息
          clearLoginInfo();
        })
      },
      //修改密码
      handleModifyPwd(){
        this.modifyPwd = true;
        this.$nextTick(() => {
          this.$refs.updatePwd.init()
        })
      }
    }
  }
</script>

<style scoped>
  .header {
    position: relative;
    background-color: #253041;
    box-sizing: border-box;
    width: 100%;
    height: 50px;
    font-size: 22px;
    color: #ffffff;
  }

  .collapse-btn {
    float: left;
    padding: 0 21px;
    cursor: pointer;
    line-height: 50px;
  }

  .header .logo {
    position: relative;
    float: left;
    line-height: 50px;
    left: 20px;
  }

  .tools {
    float: left;
    display: flex;
    height: 50px;
    align-items: center;
    margin-left: 70px;
  }

  .fullscreen-btn {
    transform: rotate(45deg);
    margin-right: 5px;
    font-size: 30px;

  }

  .header-right {
    float: right;
    padding-right: 50px;
    display: flex;
    height: 50px;
    align-items: center;
  }

  .user-avator {
    margin: 10px;

  }

  .user-avator img {
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  .el-dropdown-link {
    color: #ffffff;
    cursor: pointer;
  }

  .el-icon-arrow-down {
    font-size: 12px;
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
</style>
