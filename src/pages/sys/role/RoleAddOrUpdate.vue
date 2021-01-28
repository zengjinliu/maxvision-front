<template>
  <el-dialog :title="!roleForm.roleId ? '新增' : '修改'"
             :visible.sync="dialogShow"
             :append-to-body="true"
             @open="openDialog"
             >

    <el-form ref="roleForm" :model="roleForm"
             :rules="roleFormRule" label-width="80px"
             @keyup.enter.native="doAddOrUpdateRole()"
    >

      <el-form-item label="角色名称" prop="roleName">
        <el-input v-model="roleForm.roleName"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input type="textarea" :rows="2" v-model="roleForm.remark"></el-input>
      </el-form-item>
      <!--树形控件-->
      <el-form-item label="菜单树">
        <el-tree
          :check-strictly="checkStrictly"
          :data="treeData"
          show-checkbox
          default-expand-all
          node-key="id"
          ref="menuTree"
          highlight-current
          :props="defaultProps">
        </el-tree>
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogShow = false">取 消</el-button>
      <el-button type="primary" @click="doAddOrUpdateRole()">确 定</el-button>
    </div>

  </el-dialog>
</template>

<script>

  import {queryTreeMenu} from "@api/sys/menu";
  import {addRole, queryByRoleId, updateRole} from "@api/sys/role";

  export default {
    name: "RoleAddOrUpdate",
    data() {
      return {
        roleForm: {
          roleId: '',
          roleName: '',
          remark: '',
          menuId:'' 
        },
        roleFormRule: {
          roleName: [
            {required: true, message: '角色名称不能为空', trigger: 'blur'}
          ]
        },
        defaultProps: {
          children: 'children',
          label: 'name',
        },
        dialogShow: false,
        treeData: [],
        checkStrictly:false,

      }
    },
    created() {
      //获取整个菜单树
      let userId = this.$store.state.user.userId;
      queryTreeMenu(userId).then(res => {
        if (res.code === 200) {
          this.treeData = res.data;
        }
      })
    },
    methods: {
      init(roleId) {
        this.dialogShow = true;
        this.roleForm.roleId = roleId || ''
        this.$nextTick(()=>{
          this.$refs['roleForm'].resetFields();
          if(this.roleForm.roleId){
            this.showData();
          }
        });
      },
      //修改数据回显
      showData(){
        queryByRoleId(this.roleForm.roleId).then(res => {
            if (res.code === 200) {
              this.roleForm.roleName = res.data.roleName;
              this.roleForm.remark = res.data.remark;
              this.checkStrictly = true;
              let ids = [];
              if(res.data.menuId){
                ids = res.data.menuId.split(',');
              }
              let menuIds=[];
              if(menuIds){
               for(let i=0;i<ids.length;i++){
                 menuIds .push(ids[i]);
               }
              }
              this.$nextTick(() => {
                setTimeout(()=>{
                  this.$refs.menuTree.setCheckedKeys(menuIds);
                  this.checkStrictly = false
                },10)
              })
            }
          })
      },

      doAddOrUpdateRole() {
        //获取选中的节点信息
        let checkNode = this.$refs.menuTree.getCheckedNodes(false,true);
        let menuIds = [];
        checkNode.forEach((item) => {
          menuIds.push(item.id)
        })
        if(menuIds){
          this.roleForm.menuId = menuIds.join(',');
        }
        if (this.roleForm.roleId) {
          //修改
          this.updateRole();
       } else {
          //新增角色
          this.addRole();
        }

      },
      //新增角色
      addRole(){
          this.$refs['roleForm'].validate((valid) => {
            if (valid) {
              addRole(this.roleForm).then(res => {
                if (res.code === 200) {
                  this.dialogShow = false;
                  this.$emit('refreshList')
                  this.$message.success('添加成功');
                  this.$refs.menuTree.setCheckedKeys([])
                }
              })
            }
          });
        
      },
      //更新角色
      updateRole(){
        this.$refs['roleForm'].validate((valid) => {
            if (valid) {
              updateRole(this.roleForm).then(res => {
                if (res.code === 200) {
                  this.dialogShow = false;
                  this.$message.success('修改成功')
                  this.$emit('refreshList');
                  this.$refs.menuTree.setCheckedKeys([])
                } else {
                  this.$message.error('修改失败')
                }
              })
            }
       });
      },
      //清空校验
      openDialog(){
        this.$nextTick(()=>{
          this.$refs.roleForm.clearValidate();
        });
      },

    }
  }
</script>

<style scoped>
</style>
