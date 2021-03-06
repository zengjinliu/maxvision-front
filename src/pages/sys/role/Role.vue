<template>
  <div class="role-area">
    <div class="search-form">
      <el-form
        :model="roleForm"
        :inline="true"
        ref="roleForm"
        class="demo-form-inline"
      >
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="roleForm.roleName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" icon="el-icon-search" @click="doSearch()"
            >搜索</el-button
          >
          <el-button
            type="primary"
            v-if="HasPerms('sys_role_add')"
            @click="addOrUpdate()"
            >添加</el-button
          >
          <el-button
            type="danger"
            @click="del()"
            v-if="HasPerms('sys_role_del')"
            :disabled="roleIds.length <= 0"
            >批量删除</el-button
          >
          <el-button type="info" @click="reset()">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="container-table">
      <!--角色列表-->
      <el-table
        v-loading="loading"
        :data="tableData"
        size="medium"
        :stripe="true"
        border
        @selection-change="handleSelectionChange"
        style="width: 100%"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column
          prop="roleName"
          label="名称"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="createTime"
          label="创建日期"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="remark"
          label="备注"
          align="center"
        ></el-table-column>
        <el-table-column fixed="right" align="center" label="操作">
          <template slot-scope="scope">
            <el-button
              type="info"
              size="mini"
              v-if="HasPerms('sys_role_update')"
              @click="addOrUpdate(scope.row.roleId)"
              >修改</el-button
            >
            <el-button
              type="danger"
              v-if="HasPerms('sys_role_del')"
              size="mini"
              @click="del(scope.row.roleId)"
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
        :current-page="this.roleForm.page"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="this.roleForm.rows"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
      >
      </el-pagination>
    </div>
    <role-add-or-update
      v-if="showAddOrUpdate"
      ref="roleAddOrUpdate"
      @refreshList="page"
    ></role-add-or-update>
  </div>
</template>

<script>
import RoleAddOrUpdate from "./RoleAddOrUpdate";

import { queryRolePage, delRole } from "@api/sys/role";

export default {
  name: "Role",
  data() {
    return {
      roleForm: {
        roleId: "",
        roleName: "",
        page: 1,
        rows: 10,
      },
      roleIds: [],
      loading: false,
      total: 0, //总共多少条
      tableData: [],
      showAddOrUpdate: false, //是否展示添加或者修改页
      roleId: "",
    };
  },
  components: {
    RoleAddOrUpdate,
  },
  created() {
    //分页查询用户
    this.loading = true;
    this.page();
  },
  methods: {
    page() {
      //分页
      queryRolePage(this.roleForm).then((res) => {
        if (res.data) {
          this.total = res.total;
          this.tableData = res.data;
        }
        this.loading = false;
      });
    },
    handleSelectionChange(val) {
      //事实监听选中的数据项
      this.roleIds = val;
    },
    del(roleId) {
      //类似Java中的map方法
      let roleIds = roleId
        ? [roleId]
        : this.roleIds.map((item) => {
            return item.roleId;
          });
      //删除角色
      this.$confirm("确定进行删除操作,是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delRole(roleIds)
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
      this.ruleForm.rows = rows;
      this.ruleForm.page = 1;
      this.page();
    },
    currentChangeHandle(val) {
      this.ruleForm.page = val;
      this.page();
    },
    addOrUpdate(roleId) {
      //修改
      this.showAddOrUpdate = true;
      this.$nextTick(() => {
        this.$refs["roleAddOrUpdate"].init(roleId);
      });
    },
    //重置
    reset() {
      this.roleForm.roleName = "";
      this.page();
    },
  },
};
</script>

<style scoped>

</style>
