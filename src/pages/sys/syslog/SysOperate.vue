<template>
  <div class="user-area">
    <div class="search-form">
      <i class="back" @click="back()">
        <icon-svg name="guanbi"></icon-svg>
      </i>
      <el-form
        :model="dataForm"
        :inline="true"
        ref="dataForm"
        class="demo-form-inline"
      >
        <el-form-item label="操作行为" prop="operAction">
          <el-input v-model="dataForm.operAction"></el-input>
        </el-form-item>
        <el-form-item label="请求时间" prop="operAction">
          <el-date-picker
            v-model="date"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="selectTime"
          >
          </el-date-picker>
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
          prop="operAction"
          label="操作行为"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="operTime"
          label="操作时间"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="operParam"
          label="请求参数"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="operName"
          label="操作人员"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="operUrl"
          label="操作路径"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="requestMethod"
          label="请求方式"
          align="center"
        ></el-table-column>
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
import { operateInfoPage } from "@api/sys/login";

export default {
  data() {
    return {
      dataForm: {
        operAction: "",
        starTime: null,
        endTime: null,
        loginId: "",
        page: 1,
        rows: 10,
      },
      date: [],
      loading: false,
      total: 0, //总共多少条
      tableData: [],
      showAddOrUpdate: false, //是否展示添加或者修改页
    };
  },
  components: {},
  created() {
    //分页查询用户
    this.dataForm.loginId = this.$route.query.loginId;
    this.loading = true;
    this.page();
  },
  methods: {
    page() {
      //分页
      operateInfoPage(this.dataForm)
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
    //重置
    reset() {
      this.dataForm.operAction = "";
      this.date = null;
      this.dataForm.starTime = null;
      this.dataForm.endTime = null;
      this.page();
    },
    //选定时间
    selectTime() {
      if (this.date) {
        this.dataForm.starTime = this.date[0];
        this.dataForm.endTime = this.date[1];
      }
    },
    //返回
    back() {
      this.$router.push("/syslog");
    },
  },
};
</script>

<style scoped>

</style>
