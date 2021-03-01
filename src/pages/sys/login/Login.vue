<template>
  <div class="login-container">
    <div class="login-area">
      <i class="title">
        <img src="../../../assert/img/sys/logo.png" />
      </i>
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
        <el-form-item prop="rememberMe" class="remember">
          <el-checkbox size="small" v-model="user.rememberMe">记住密码</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button
            :loading="loading"
            class="login-btn"
            type="primary"
            @click="login()"
          >
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="footer">
      <span>Copyright © 2021 maxvision All Rights Reserved.</span>
    </div>
  </div>
</template>

<script>
import { doLogin } from "@api/sys/login";
import Cookies from "js-cookie";
import { encrypt, decrypt } from "@/utils/RSA";

export default {
  name: "Login",
  data() {
    return {
      user: {
        username: "",
        password: "",
        rememberMe: false,
      },
      loading: false,
      rules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.getCookie();
  },
  methods: {
    //获取记住我
    getCookie() {
      const username = Cookies.get("username");
      const password = Cookies.get("password");
      const rememberMe = Cookies.get("rememberMe");
      this.user = {
        username: username === undefined ? this.user.username : username,
        password: password === undefined ? this.user.password : decrypt(password),
        rememberMe: rememberMe === undefined ? false : Boolean(rememberMe),
      };
    },
    //登录
    login() {
      this.$refs["loginForm"].validate((valid) => {
        if (valid) {
          this.loading = true;
          //记住密码功能
          if (this.user.rememberMe) {
            Cookies.set("username", this.user.username, { expires: 30 });
            Cookies.set("password", encrypt(this.user.password), { expires: 30 });
            Cookies.set("rememberMe", this.user.rememberMe, { expires: 30 });
          } else {
            Cookies.remove("username");
            Cookies.remove("password");
            Cookies.remove("rememberMe");
          }
          //对密码进行MD5加密
          this.user.password = this.$md5(this.user.password);

          doLogin(this.user)
            .then((res) => {
              if (res.code === 200) {
                const data = res.data;
                const user = data.user;
                let userInfo = {
                  loginName: user.loginName,
                  userName: user.userName,
                  userId: user.userId,
                  perms: data.perms,
                  menus: data.menuTree,
                };
                this.$store.dispatch("saveUserInfo", userInfo);
                sessionStorage.setItem("user", JSON.stringify(userInfo));
                this.$router.replace("/home");
              } else {
                this.loading = false;
              }
            })
            .catch(() => {
              this.loading = false;
            });
        }
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
.login-area {
  min-width: 300px;
  background-color: #fff;
}

.login-form {
  background-color: #ffffff;
  padding: 30px 40px 0px 40px;

  min-width: 250px;
}
.login-btn {
  width: 100%;
}
.remember {
  float: left;
}

.footer {
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: black;
  font-family: Arial;
  font-size: 12px;
  letter-spacing: 1px;
}
</style>

