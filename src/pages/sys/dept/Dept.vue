<!--  -->
<template>
  <div class="menu-area">
    <div class="search-form">
      <el-form
        :model="deptForm"
        :inline="true"
        ref="deptForm"
        label-width="100px"
        class="demo-form-inline"
      >
        <el-form-item label="部门名称" prop="deptName">
          <el-input v-model="deptForm.deptName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" icon="el-icon-search" @click="doSearch">搜索</el-button>
          <el-button type="primary" v-if="HasPerms('sys_dept_add')" @click="addOrUpdate('','add')">添加</el-button>
          <el-button type="info" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="container-table">
      <!--部门列表-->
      <el-table
        :data="deptList"
        size="medium"
        row-key="id"
        v-loading="loading"
        border
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        style="width: 100%; ">
        <el-table-column prop="name" label="部门名称"></el-table-column>
        <el-table-column prop="nodeData.phone" align="center"  label="电话"></el-table-column>
        <el-table-column prop="nodeData.email" align="center"  label="邮箱"></el-table-column>
        <el-table-column prop="nodeData.leader" align="center"  label="负责人"></el-table-column>
        <el-table-column prop="nodeData.orderNum" align="center"  label="排序号"></el-table-column>
        <el-table-column fixed="right"  align="center" min-width="120" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" v-if="HasPerms('sys_dept_add')" @click="addOrUpdate(scope.row.id,'add')" >添加</el-button>
            <el-button type="info" size="mini" v-if="HasPerms('sys_dept_update')" @click="addOrUpdate(scope.row.id,'edit')" >修改</el-button>
            <el-button type="danger" size="mini" v-if="HasPerms('sys_dept_del')" @click="deleteHandle(scope.row)" >删除</el-button>
          </template>
        </el-table-column>  
      </el-table>
    </div>
    <dept-add-or-update
     v-if="showDialog" 
     ref="deptAddOrUpdate" 
     @refreshDeptList="queryDeptList"/>
     
  </div>
</template>

<script>
  import DeptAddOrUpdate from "./DeptAddOrUpdate";
import {queryTreeDept,delDept,queryDeptByName} from "@api/sys/dept";
  export default {
    name: "Dept",
    data() {
      return {
        deptList: [],
        loading:false,
        showDialog: false,
        deptForm: {
          deptName: "",
        },
      }
    },
    components:{
      DeptAddOrUpdate,
    },
    created() {
      this.loading = true;
      this.queryDeptList();
    },
    methods: {
      queryDeptList(){
        queryTreeDept().then(res => {
          if (res.code === 200) {
            this.deptList = res.data;
          }
          this.loading = false;
        })
      },
      addOrUpdate(deptId,opt) {
        //新增或者修改
        this.showDialog = true;
        this.$nextTick(()=>{
          this.$refs['deptAddOrUpdate'].init(deptId,opt);
        })
      },
      deleteHandle(row) {
        //删除
        this.$confirm('确定进行删除操作,是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
          if(row.children.length>0){
            this.$message.error('存在子部门,不允许删除');
          } else{
            delDept(row.id).then(res =>{
              if(res.code ===200){
                this.$message.success('删除成功')
                this.queryDeptList();
              } else{
                this.$message.error('删除失败');
              }
            })
          }
        }).catch(cancel=>{})
      },
      doSearch(){
        queryDeptByName(this.deptForm.deptName).then(res=>{
          if(res.code===200){
            this.deptList = res.data;
          }
        })
      },
      //重置
      reset(){
        this.deptForm.deptName = '';
        this.queryDeptList();
      }
    },
  }

</script>
<style  scoped>
 .search-form{
    float: left;
  }
</style>