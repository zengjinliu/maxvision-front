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
          <el-button type="success" >查询</el-button>
          <el-button type="primary" @click="addOrUpdate('','add')">添加</el-button>
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
        <el-table-column prop="name" header-align="center" min-width="100" label="名称"></el-table-column>
        <el-table-column prop="icon" header-align="center" min-width="100" align="center" label="图标">
          <template slot-scope="scope">
            <i :class="scope.row.icon"></i>
          </template>
        </el-table-column>
        <el-table-column prop="nodeData" header-align="center" min-width="100" align="center" label="排序号">
           <template slot-scope="scope">
            <i :class="scope.row.orderNum"></i>
          </template>
        </el-table-column>
        <el-table-column prop="url" header-align="center" align="center" min-width="100" :show-overflow-tooltip="true" label="菜单URL"></el-table-column>
        <el-table-column fixed="right" header-align="center" align="center" min-width="120" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="addOrUpdate(scope.row.id,'add')" >添加</el-button>
            <el-button type="info" size="mini" @click="addOrUpdate(scope.row.id,'edit')" >修改</el-button>
            <el-button type="danger" size="mini" @click="deleteHandle(scope.row.id)" >删除</el-button>
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

  import {queryTreeMenu,delMenu} from "@api/sys/menu";

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
      deleteHandle(menuId) {
        //删除
        this.$confirm('确定进行删除操作,是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
          deleteMenu(menuId).then(res =>{
            if(res.code ===200){
              this.$message.success('删除成功')
              this.getMenuList();
            } else{
              this.$message.error(res.msg);
            }
          })
        })

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
