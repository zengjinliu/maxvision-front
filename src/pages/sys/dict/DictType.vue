<template>
  <div class="dict-area">
    <div class="search-form">
      <el-form
        :model="dictTypeForm"
        :inline="true"
        ref="dictTypeForm"
        label-width="100px"
        class="demo-form-inline"
      >
        <el-form-item label="字典名称" prop="dictName">
          <el-input v-model="dictTypeForm.dictName"></el-input>
        </el-form-item>
        <el-form-item label="字典标签" prop="dictType">
          <el-input v-model="dictTypeForm.dictType"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="doSearch"
            >搜索</el-button
          >
          <el-button type="success" @click="addOrUpdate()">添加</el-button>
          <el-button type="danger" @click="del()" :disabled="dictIds.length <= 0"
            >批量删除</el-button
          >
          <el-button type="info" @click="reset">重置</el-button>
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
        <el-table-column type="selection" align="center" width="55">
        </el-table-column>
        <el-table-column
          prop="dictName"
          label="字典名称"
          width="180"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="dictType"
          label="字典类型"
          width="180"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="remark"
          label="备注"
          width="220"
          align="center"
        ></el-table-column>
        <el-table-column
          width="180"
          prop="createTime"
          label="创建时间"
          align="center"
        ></el-table-column>
        <el-table-column fixed="right"  align="center"  label="操作">
          <template slot-scope="scope">
            <el-button
              type="info"
              size="mini"
              @click="addOrUpdate(scope.row.dictId)"
              >修改</el-button
            >
            <el-button
              type="primary"
              size="mini"
              @click="goDictData(scope.row.dictType)"
              >列表</el-button
            >
            <el-button type="danger" size="mini" @click="del(scope.row.dictId)"
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
        :current-page="this.dictTypeForm.page"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="this.dictTypeForm.rows"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
      >
      </el-pagination>

      <dict-type-add-or-update
        v-if="showDialog"
        ref="dictTypeAddOrUpdate"
        @refreshDictTypeList="page"
      />
    </div>
  </div>
</template>

<script>
import DictTypeAddOrUpdate from './DictTypeAddOrUpdate';
import { queryDictTypePage,delDictType } from "@api/sys/dict";

export default {
  name: "DictType",
  data() {
    return {
      dictTypeForm: {
        dictName: "",
        dictType: "",
        page: 1,
        rows: 10,
      },
      loading: false,
      total: 0, //总共多少条
      tableData: [],
      dictIds: [],
      showDialog: false, //是否展示添加或者修改页
    };
  },
  components: {
    DictTypeAddOrUpdate,
  },
  created() {
    //分页查询用户
    this.loading = true;
    this.page();
  },
  methods: {
    page() {
      //分页
      queryDictTypePage(this.dictTypeForm).then((res) => {
        if (res.data) {
          this.total = res.total;
          this.tableData = res.data;
        }
        this.loading = false;
      });
    },
    handleSelectionChange(val) {
      //事实监听选中的数据项
      this.dictIds = val;
    },
    del(dictId) {
      //类似Java中的map方法
      let dictIds = dictId? [dictId]: this.dictIds.map((item) => {
            return item.dictId;
          });
      console.log(dictIds);
      //删除单个用户
      this.$confirm("确定进行删除操作,是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
          delDictType(dictIds).then((res) => {
              if (res.code === 200) {
                this.$message.success("删除成功");
                this.page();
              } else {
                this.$message.error("删除失败");
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
      this.dictTypeForm.rows = rows;
      this.dictTypeForm.page = 1;
      this.page();
    },
    currentChangeHandle(val) {
      this.dictTypeForm.page = val;
      this.page();
    },
    addOrUpdate(dictId) {
      //修改
      this.showDialog = true;
      this.$nextTick(() => {
        this.$refs["dictTypeAddOrUpdate"].init(dictId);
      });
    },
    //重置
    reset() {
      this.dictTypeForm.dictName = "";
      this.dictTypeForm.dictType = "";
      this.page();
    },
    //去字典值页面(dialog)
    goDictData(dictType){
      this.$router.push('/dictData/'+dictType);
    }
  },
};
</script>

<style scoped>
.search-form {
  float: left;
}
</style>
