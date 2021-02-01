<template>
  <div class="user-area">
    <div class="search-form">
      <el-form
        :model="userForm"
        :inline="true"
        ref="userForm"
        label-width="100px"
        class="demo-form-inline"
      >
        <el-form-item label="姓名" prop="userName">
          <el-input v-model="userForm.userName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" icon="el-icon-search" @click="doSearch()">搜索</el-button>
          <el-button type="primary"
          v-if="HasPerms('sys_user_add')"
           @click="addOrUpdate()">添加</el-button>
          <el-button
            type="danger"
            @click="del()"
            v-if="HasPerms('sys_user_del')"
            :disabled="userIds.length <= 0"
            >批量删除</el-button
          >
          <el-button type="info" @click="reset()">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="container-table">
      <!--用户列表-->
      <el-table
        v-loading="loading"
        :data="tableData"
        :stripe="true"
        border
        size="medium"
        @selection-change="handleSelectionChange"
        style="width: 100%"
      >
        <el-table-column type="selection"  align="center" width="55"> </el-table-column>
        <el-table-column
          prop="userName"
          label="姓名"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="loginName"
          label="登陆账户"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="phonenumber"
          label="电话"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="createTime"
          label="日期"
          align="center"
        ></el-table-column>
        <el-table-column
          fixed="right"
          align="center"
          label="操作"
        >
          <template slot-scope="scope">
            <el-button
              type="info"
              size="mini"
              v-if="HasPerms('sys_user_update')"
              @click="addOrUpdate(scope.row.userId)"
              >修改</el-button>
               <!-- v-if="HasPerms('sys_user_del')" -->
            <el-button
              type="danger"
              size="mini"
             
              @click="del(scope.row.userId)"
              >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页-->
      <el-pagination
        class="page-area"
        background
        @size-change="sizeChangeHandle"
        @current-change="currentChangeHandle"
        :current-page="this.userForm.page"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="this.userForm.rows"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
      >
      </el-pagination>
    </div>

    <user-add-or-update
      v-if="showAddOrUpdate"
      ref="userAddOrUpdate"
      @refreshList="page"
    />
  </div>
</template>

<script>
import UserAddOrUpdate from "./UserAddOrUpdate";

import { getUserPage, delUser } from "@api/sys/user";
import { exportExcel } from "@comm/download";

export default {
  name: "User",
  data() {
    return {
      userForm: {
        userName: "",
        phone: "",
        page: 1,
        rows: 10,
      },
      userIds: [],
      loading: false,
      total: 0, //总共多少条
      tableData: [],
      showAddOrUpdate: false, //是否展示添加或者修改页
    };
  },
  components: {
    UserAddOrUpdate,
  },
  created() {
    //分页查询用户
    this.loading = true;
    this.page();
  },
  methods: {
    page() {
      //分页
      getUserPage(this.userForm).then((res) => {
        if (res.data) {
          this.total = res.total;
          this.tableData = res.data;
        }
        this.loading = false;
      });
    },
    handleSelectionChange(val) {
      //事实监听选中的数据项
      this.userIds = val;
    },
    del(userId) {
      //类似Java中的map方法
      let userIds = userId? [userId]: this.userIds.map((item) => {
            return item.userId;
          });
      //删除单个用户
      this.$confirm("确定进行删除操作,是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delUser(userIds)
            .then((res) => {
              if (res.code === 200) {
                this.$message.success("删除成功");
                this.page();
              }
            })
            .catch((err) => {
              this.$message.error(err);
            });
        })
        .catch(() => {});
    },
    doSearch() {
      //条件搜索
      this.page();
    },
    sizeChangeHandle(rows) {
      this.userForm.rows = rows;
      this.userForm.page = 1;
      this.page();
    },
    currentChangeHandle(val) {
      this.userForm.page = val;
      this.page();
    },
    addOrUpdate(userId) {
      //修改
      this.showAddOrUpdate = true;
      this.$nextTick(() => {
        this.$refs["userAddOrUpdate"].init(userId);
      });
    },
    //重置
    reset(){
        this.userForm.userName = '';
        this.page();
    },
    exportUserList() {
      //导出 excel
      exportExcel("/user/export", "用户列表");
    },
  },
};
</script>

<style scoped>
.search-form {
  float: left;
}
</style>
