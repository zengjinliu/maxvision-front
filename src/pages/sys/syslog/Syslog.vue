<template>
  <div class="user-area">
    <div class="search-form">
      <el-form
        :model="dataForm"
        :inline="true"
        ref="dataForm"
        class="demo-form-inline"
      >
        <el-form-item label="登陆账户" prop="loginName">
          <el-input v-model="dataForm.loginName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" icon="el-icon-search" @click="doSearch()"
            >搜索</el-button
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
        style="width: 100%"
      >
        <el-table-column
          prop="loginName"
          label="登陆账户"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="ipaddr"
          label="登陆ip"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="loginTime"
          label="登陆时间"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="status"
          label="登陆状态"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="os"
          label="操作系统"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="browser"
          label="浏览器类型"
          align="center"
        ></el-table-column>

        <el-table-column fixed="right" align="center" label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="operateDetail(scope.row.loginId)"
              >操作日志</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!--分页-->
      <el-pagination
        class="page-area"
        background
        @size-change="sizeChangeHandle"
        @current-change="currentChangeHandle"
        :current-page="this.dataForm.page"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="this.dataForm.rows"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { loginInfoPage } from "@api/sys/login";

export default {
  data() {
    return {
      dataForm: {
        loginName: "",
        page: 1,
        rows: 10,
      },
      loading: false,
      total: 0, //总共多少条
      tableData: [],
      showAddOrUpdate: false, //是否展示添加或者修改页
    };
  },
  components: {},
  created() {
    //分页查询用户
    this.loading = true;
    this.page();
  },
  methods: {
    page() {
      //分页
      loginInfoPage(this.dataForm)
        .then((res) => {
          if (res.data) {
            this.total = res.total;
            this.tableData = res.data;
          }
          this.loading = false;
        })
        .catch((err) => {});
    },
    doSearch() {
      //条件搜索
      this.page();
    },
    sizeChangeHandle(rows) {
      this.dataForm.rows = rows;
      this.dataForm.page = 1;
      this.page();
    },
    currentChangeHandle(val) {
      this.dataForm.page = val;
      this.page();
    },
    //操作日志详情
    operateDetail(loginId) {
        this.$router.push({path: '/operate', query: {loginId: loginId}});
    },
    //重置
    reset() {
      this.dataForm.loginName = "";
      this.page();
    },
  },
};
</script>

<style scoped>
</style>
