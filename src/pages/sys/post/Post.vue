<template>
  <div class="post-area">
    <div class="search-form">
      <el-form
        :model="postForm"
        :inline="true"
        ref="postForm"
        label-width="100px"
        class="demo-form-inline"
      >
        <el-form-item label="岗位名称" prop="postName">
          <el-input v-model="postForm.postName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" icon="el-icon-search" @click="doSearch()"
            >搜索</el-button
          >
          <el-button
            type="primary"
            v-if="HasPerms('sys_post_add')"
            @click="addOrUpdate()"
            >添加</el-button
          >
          <el-button
            type="danger"
            v-if="HasPerms('sys_post_del')"
            @click="del()"
            :disabled="postIds.length <= 0"
            >批量删除</el-button
          >
          <el-button type="info" @click="reset()">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="container-table">
      <!--岗位列表-->
      <el-table
        v-loading="loading"
        :data="postData"
        :stripe="true"
        border
        size="medium"
        @selection-change="handleSelectionChange"
        style="width: 100%"
      >
        <el-table-column type="selection" align="center"> </el-table-column>
        <el-table-column
          prop="postName"
          label="岗位名称"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="postCode"
          label="岗位编码"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="remark"
          label="备注"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          align="center"
        ></el-table-column>
        <el-table-column
          fixed="right"
          align="center"
          min-width="120"
          label="操作"
        >
          <template slot-scope="scope">
            <el-button
              type="info"
              size="mini"
              v-if="HasPerms('sys_post_update')"
              @click="addOrUpdate(scope.row.postId)"
              >修改</el-button
            >
            <el-button
              type="danger"
              v-if="HasPerms('sys_post_del')"
              size="mini"
              @click="del(scope.row.postId)"
              >删除</el-button
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
        :current-page="this.postForm.page"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="this.postForm.rows"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
      >
      </el-pagination>
    </div>

    <post-add-or-update
      v-if="showAddOrUpdate"
      ref="postAddOrUpdate"
      @refreshList="page"
    />
  </div>
</template>

<script>
import PostAddOrUpdate from "./PostAddOrUpdate";

import { queryPostPage, delPost } from "@api/sys/post";

export default {
  name: "Post",
  data() {
    return {
      postForm: {
        postName: "",
        page: 1,
        rows: 10,
      },
      postIds: [],
      loading: false,
      total: 0, //总共多少条
      postData: [],
      showAddOrUpdate: false, //是否展示添加或者修改页
    };
  },
  components: {
    PostAddOrUpdate,
  },
  created() {
    //分页查询部门
    this.loading = true;
    this.page();
  },
  methods: {
    page() {
      //分页
      queryPostPage(this.postForm).then((res) => {
        if (res.data) {
          this.total = res.total;
          this.postData = res.data;
        }
        this.loading = false;
      });
    },
    handleSelectionChange(val) {
      //事实监听选中的数据项
      this.postIds = val;
    },
    del(postId) {
      //类似Java中的map方法
      let postIds = postId
        ? [postId]
        : this.postIds.map((item) => {
            return item.postId;
          });
      //删除单个部门
      this.$confirm("确定进行删除操作,是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delPost(postIds)
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
      this.postForm.rows = rows;
      this.postForm.page = 1;
      this.page();
    },
    currentChangeHandle(val) {
      this.postForm.page = val;
      this.page();
    },
    addOrUpdate(postId) {
      //修改
      this.showAddOrUpdate = true;
      this.$nextTick(() => {
        this.$refs["postAddOrUpdate"].init(postId);
      });
    },
    //重置
    reset() {
      this.postForm.postName = "";
      this.page();
    },
  },
};
</script>

<style scoped>
.search-form {
  float: left;
}
</style>
