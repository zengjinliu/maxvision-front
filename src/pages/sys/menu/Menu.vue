<template>
  <div class="menu-area">
    <div class="search-form">
      <el-form
        :model="menuForm"
        :inline="true"
        ref="menuForm"
        label-width="100px"
        class="demo-form-inline"
      >
        <el-form-item label="名称" prop="menuName">
          <el-input v-model="menuForm.menuName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" icon="el-icon-search" @click="doSearch">搜索</el-button>
          <el-button type="primary" @click="addOrUpdate('','add')">添加</el-button>
          <el-button type="info" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="container-table">
      <!--菜单列表-->
      <el-table
        :data="dataList"
        size="medium"
        row-key="id"
        v-loading="loading"
        border
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        style="width: 100%; ">
        <el-table-column prop="name"  label="名称"></el-table-column>
        <el-table-column prop="icon"   align="center" label="图标">
          <template slot-scope="scope">
            <icon-svg :name="scope.row.icon"></icon-svg>
          </template>
        </el-table-column>
        <el-table-column prop="orderNum"  align="center" label="排序号">
        </el-table-column>
        <el-table-column prop="url"  align="center"  :show-overflow-tooltip="true" label="菜单URL"></el-table-column>
        <el-table-column fixed="right"  align="center" min-width="120" label="操作">
          <template slot-scope="scope">
            <el-button type="primary"  size="mini"  @click="addOrUpdate(scope.row.id,'add')" >添加</el-button>
            <el-button type="info"   size="mini" @click="addOrUpdate(scope.row.id,'edit')" >修改</el-button>
            <el-button type="danger"  size="mini" @click="deleteHandle(scope.row)" >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <menu-add-or-update
     v-if="showDialog" 
     ref="menuAddOrUpdate" 
     @refreshMenuList="getMenuList"/>
     
  </div>

  
</template>

<script>

  import MenuAddOrUpdate from "./MenuAddOrUpdate";

  import {queryTreeMenu,delMenu,queryMenuByName} from "@api/sys/menu";

  export default {
    name: "Menu",
    data() {
      return {
        dataList: [],
        loading:false,
        showDialog: false,
        menuForm: {
          menuName: "",
        },
      }
    },
    components:{
      MenuAddOrUpdate,
    },
    created() {
      this.loading = true;
      this.getMenuList();
    },
    methods: {
      getMenuList(){
        let userId = this.$store.state.user.userId;
        queryTreeMenu(userId).then(res => {
          if (res.code === 200) {
            console.log(res.data);
            this.dataList = res.data;
          }
          this.loading = false;
        })
      },
      addOrUpdate(menuId,opt) {
        //新增或者修改
        this.showDialog = true;
        this.$nextTick(()=>{
          this.$refs['menuAddOrUpdate'].init(menuId,opt);
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
            this.$message.error('存在子菜单,不允许删除');
          } else{
            delMenu(row.id).then(res =>{
              if(res.code ===200){
                this.$message.success('删除成功')
                this.getMenuList();
              } else{
                this.$message.error('删除失败');
              }
            })
          }
        }).catch(cancel=>{})
      },
      doSearch(){
        queryMenuByName(this.menuForm.menuName).then(res=>{
          if(res.code===200){
            this.dataList = res.data;
          }
        })
      },
      reset(){
        this.menuForm.menuName = ''
        this.getMenuList();
      }
    },
  }
</script>

<style scoped>
  .container-table {
    
  }
  .search-form{
    float: left;
  }
  .add-form {
    margin-left: 20px;
    padding: 5px;
    margin-top: 20px;
  }
</style>
