<template>
  <div class="login-container">
    <div class="login-area">
      <div class="login-head">
        <div class="login-logo">
           <img src="../../../assert/img/sys/logo.png">
        </div>
      </div>
      <el-form
        class="login-form"
        :model="user"
        :rules="rules"
        ref="loginForm"
        @keyup.enter.native="login()"
        status-icon
      >
        <el-form-item prop="username">
          <el-input v-model="user.username" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="user.password"
            type="password"
            placeholder="密码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password" class="remember">
          <el-checkbox>remember me</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button class="login-btn" type="primary" @click="login()">
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {doLogin} from "@api/sys/login";
  import {getAllPerms} from "@api/sys/user";
  import router from "@/router";

  export default {
    name: "Login",
    data() {
      return {
        user: {
          username: "",
          password: "",
        },
        rules: {
          username: [
            {required: true, message: "用户名不能为空", trigger: "blur"},
          ],
          password: [
            {required: true, message: "密码不能为空", trigger: "blur"},
          ],
        },
      };
    },
    created() {
    },
    methods: {
      login() {
        //登录
        this.$refs["loginForm"].validate((valid) => {
          if (valid) {
            doLogin(this.user).then((res) => {
              if (res.code === 200) {
                let user = {
                  loginName: res.data.loginName,
                  userName: res.data.userName,
                  userId: res.data.userId,
                };
                this.$store.dispatch("saveUserInfo", user);
                sessionStorage.setItem('user',user);
                this.$router.replace("/home");
                //登陆成功后将权限信息保存
                // this.getAllPerms();
              } else {
                this.$message.error(res.msg);
              }
            });
          }
        });
      },
      getAllPerms() {
        getAllPerms()
          .then((res) => {
            if (res.code === 200) {
              //将权限信息进行缓存
              sessionStorage.setItem("permissions", res.datas);
            }
          })
          .catch((err) => {
            router.push("/login");
          });
      },
    },
  };
</script>

<style>
  .login-container {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: url("~@/assert/img/sys/login-bj.jpg") no-repeat;
    background-size: cover; 
  }
  .login-area{
    min-width: 300px;
    background-color: #fff;
  }
  .login-header{
    display: flex;
    justify-content: center;
  }
  .login-logo{
    background: url("~@/assert/img/sys/login-bj.jpg") no-repeat;
    background-size: contain;
  }
  .login-logo img{
    display: block;
	  margin: auto;
	  height: 45px;
  }
  .login-form {
    background-color: #ffffff;
    padding: 50px 50px 10px 50px;

    min-width: 250px;
  }
  .login-btn{
    width: 100%;
  }
  .remember{
    float: left;
  }
</style>

