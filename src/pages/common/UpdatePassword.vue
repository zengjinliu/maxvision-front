<template>
  <el-dialog title="修改密码" :visible.sync="visible" :append-to-body="true">
    <el-form
      :model="dataForm"
      :rules="dataRule"
      ref="dataForm"
      @keyup.enter.native="dataFormSubmit"
      label-width="80px"
    >
      <el-form-item label="账号">
        <span>{{ username }}</span>
      </el-form-item>
      <el-form-item label="原密码" prop="password">
        <el-input
          type="password"
          v-model="dataForm.password"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-input
          type="password"
          v-model="dataForm.newPassword"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input
          type="password"
          v-model="dataForm.confirmPassword"
          autocomplete="off"
        ></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { updatePwd, doLogout, checkPwd } from "@api/sys/login";

export default {
  name: "UpdatePassword",
  data() {
    let validateConfirmPassword = (rule, value, callback) => {
      if (this.dataForm.newPassword !== value) {
        callback(new Error("确认密码与新密码不一致"));
      } else {
        callback();
      }
    };
    let validPwd = (rule, value, callback) => {
      if (this.dataForm.password) {
        let pwd = this.$md5(value);
        let obj = {
          userId: this.$store.state.user.userId,
          password: pwd,
        };
        checkPwd(obj)
          .then((res) => {
            if (res.code != 200) {
              callback(new Error("原密码输入错误"));
            } else {
              callback();
            }
          })
          .catch((err) => {});
      }
    };
    return {
      visible: false,
      dataForm: {
        password: "",
        newPassword: "",
        confirmPassword: "",
      },
      dataRule: {
        password: [
          { required: true, message: "原密码不能为空", trigger: "blur" },
          { validator: validPwd, trigger: "blur", type: "password" },
        ],
        newPassword: [
          { required: true, message: "新密码不能为空", trigger: "blur" },
        ],
        confirmPassword: [
          { required: true, message: "确认密码不能为空", trigger: "blur" },
          { validator: validateConfirmPassword, trigger: "blur" },
        ],
      },
    };
  },
  computed: {
    username() {
      return this.$store.state.user.loginName;
    },
  },
  methods: {
    // 初始化
    init() {
      this.visible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].resetFields();
      });
    },
    dataFormSubmit() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          let obj = {
            userId: this.$store.state.user.userId,
            password: this.$md5(this.dataForm.newPassword),
          };
          updatePwd(obj)
            .then((res) => {
              //更新密码成功后，清楚浏览信息，并重新登录
              if (res.code === 200) {
                doLogout().then(() => {
                    //退出登陆
                    sessionStorage.clear();
                  }).then(() => {
                    this.$alert("修改成功,请重新登录", "系统提示", {
                      confirmButtonText: "重新登录",
                      showClose: false,
                      closeOnClickModal: false,
                      showCancelButton: false,
                      type: "warning",
                    }).then(() => {
                        sessionStorage.clear();
                        this.$router.push({ path: "/login" });
                      }).catch(() => {});
                  });
              }
            })
            .catch(() => {});
        }
      });
    },
  },
};
</script>

<style scoped>
</style>
