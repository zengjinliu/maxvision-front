<template>
  <div class="dict-area">
    <div class="search-form">
       <i class="back" @click="back()">
        <icon-svg name="guanbi"></icon-svg>
      </i>
      <el-form
        :model="dictDataForm"
        :inline="true"
        ref="dictDataForm"
        class="demo-form-inline"
      >
        <el-form-item label="字典名称" prop="dictType">
          <el-select
            v-model="dictDataForm.dictType"
            placeholder="请选择"
            size="medium"
            filterable
            clearable
            @change="changListener"
          >
            <el-option
              v-for="item in dictTypeList"
              :key="item.dictId"
              :label="item.dictName"
              :value="item.dictType"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="字典标签" prop="dictLabel">
          <el-input v-model="dictDataForm.dictLabel"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="doSearch()"
            >搜索</el-button
          >
          <el-button
            type="success"
            v-if="HasPerms('sys_dict_data_add')"
            @click="addOrUpdate()"
            >添加</el-button
          >
          <el-button
            type="danger"
            v-if="HasPerms('sys_dict_data_del')"
            @click="del()"
            :disabled="dictCodes.length <= 0"
            >批量删除</el-button
          >
          <el-button type="info" @click="reset()">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="container-table">
      <!--字典值列表-->
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
          prop="dictLabel"
          label="字典标签"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="dictValue"
          label="字典键值"
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
              v-if="HasPerms('sys_dict_data_update')"
              @click="addOrUpdate(scope.row.dictCode)"
              >修改</el-button
            >
            <el-button
              type="danger"
              size="mini"
              v-if="HasPerms('sys_dict_data_del')"
              @click="del(scope.row.dictCode)"
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
        :current-page="this.dictDataForm.page"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="this.dictDataForm.rows"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
      >
      </el-pagination>

      <dict-data-add-or-update
        v-if="showDialog"
        ref="dictDataAddOrUpdate"
        @refreshDictDataList="page"
      />
    </div>
  </div>
</template>

<script>
import dictDataAddOrUpdate from "./DictDataAddOrUpdate";

import {
  queryDictDataPage,
  delDictData,
  queryAllDictType,
} from "@api/sys/dict";

export default {
  name: "DictData",
  data() {
    return {
      dictDataForm: {
        dictLabel: "",
        dictType: "",
        page: 1,
        rows: 10,
      },
      loading: false,
      total: 0, //总共多少条
      tableData: [],
      dictCodes: [],
      dictTypeList: [], //所有字典类型
      showDialog: false, //是否展示添加或者修改页
    };
  },
  components: {
    dictDataAddOrUpdate,
  },
  created() {
    this.loading = true;
    //查询所有字典类型
    queryAllDictType()
      .then((res) => {
        if (res.data) {
          this.dictTypeList = res.data;
        }
      })
      .then(() => {
        this.dictDataForm.dictType = this.$route.params.dictType;
        this.page();
      });
  },
  methods: {
    //分页
    page() {
      queryDictDataPage(this.dictDataForm).then((res) => {
        if (res.data) {
          this.total = res.total;
          this.tableData = res.data;
        }
        this.loading = false;
      });
    },
    //监听选中的数据项
    handleSelectionChange(val) {
      this.dictCodes = val;
    },
    //删除
    del(dictCode) {
      //类似Java中的map方法
      let dictCodes = dictCode
        ? [dictCode]
        : this.dictCodes.map((item) => {
            return item.dictCode;
          });
      console.log(dictCodes);
      //删除单个用户
      this.$confirm("确定进行删除操作,是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delDictData(dictCodes)
            .then((res) => {
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
    //条件搜索
    doSearch() {
      this.page();
    },
    //监听下来框变化
    changListener(dictType) {
      this.dictDataForm.dictType = dictType;
      this.page();
    },
    sizeChangeHandle(rows) {
      this.dictDataForm.rows = rows;
      this.dictDataForm.page = 1;
      this.page();
    },
    currentChangeHandle(val) {
      this.dictDataForm.page = val;
      this.page();
    },
    addOrUpdate(dictCode) {
      //修改
      this.showDialog = true;
      this.$nextTick(() => {
        this.$refs["dictDataAddOrUpdate"].init(
          dictCode,
          this.dictDataForm.dictType
        );
      });
    },
    //重置
    reset() {
      this.dictDataForm.dictLabel = "";
      this.page();
    },
    //返回
    back() {
      this.$router.push("/dict");
    },
  },
};
</script>

<style scoped>

</style>
