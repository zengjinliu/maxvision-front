<template>
  <el-dialog :title="userForm.userId?`修改用户`:`新增用户`"
             :visible.sync="dialogFormVisible"
             :append-to-body="true"
             @open="openDialog"
             >

    <el-form ref="userForm" :model="userForm"
             :rules="userFormRule" label-width="80px"
             @keyup.enter.native="doAddOrUpdateUser">

      <el-form-item label="用户昵称" prop="userName">
        <el-input v-model="userForm.userName"></el-input>
      </el-form-item>
      <el-form-item label="登陆账号" prop="loginName">
        <el-input v-model="userForm.loginName"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="userForm.password" type="password"></el-input>
      </el-form-item>
      <el-form-item label="角色" prop="roleIds">
        <el-select v-model="userForm.roleIds" placeholder="请选择角色"
                   multiple size="medium" filterable clearable
        >
        <el-option
          v-for="item in roleList"
          :key="item.roleId"
          :label="item.roleName"
          :value="item.roleId">
        </el-option>
        </el-select>
      </el-form-item>
       <el-form-item label="岗位" prop="postIds">
        <el-select v-model="userForm.postIds" placeholder="请选择岗位"
                   multiple size="medium" filterable clearable
        >
        <el-option
          v-for="item in postList"
          :key="item.postId"
          :label="item.postName"
          :value="item.postId">
        </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="部门" prop="deptId">
        <treeselect 
          placeholder="请选择部门"
          v-model="userForm.deptId" 
          :multiple="false" 
          :options="deptData"
          :normalizer="normalizer"
          @select="handleSelectDept"
          />
 
      </el-form-item>

      <el-form-item label="邮箱" prop="email">
        <el-input v-model="userForm.email"></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="phonenumber">
        <el-input v-model="userForm.phonenumber"></el-input>
      </el-form-item>
      <!-- <el-form-item label="头像" prop="pic">
        <single-upload v-model="userForm.pic"></single-upload>
      </el-form-item> -->
  
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="doAddOrUpdateUser">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {checkNameExist,add,update,queryUserById} from "@api/sys/user";
  import {queryTreeDept} from "@api/sys/dept";
  import {queryAllRole} from "@api/sys/role";
  import {queryAllPost} from "@api/sys/post";
  import SingleUpload from "@views/common/upload/SingleUpload";
  import Treeselect from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'

  export default {
    name: "UserAddOrUpdate",
    components:{
      SingleUpload,
      Treeselect
    },
    data() {
      let checkName = (rule, value, callback) => {
        if(this.userForm.userId){
          callback();
        }else{
          checkNameExist(value).then(res=>{
            if(res.code!=200){
              callback(new Error('该账户已存在已存在'));
            }else{
              callback();
            }
          })
        }
      };
      return {
        normalizer(node){
          return {
            id: node.id,
            label:node.name,
            children:node.children,
          }
        },
        userForm: {
          userName: '',
          loginName:'',
          password: '',
          email:'',
          phonenumber: '',
          pic: '',
          deptId:null,
          postId:'',
          roleId: '',
          postIds:[],
          roleIds:[],
          userId:''
        },
        dialogFormVisible: false,
        showTree:false,//是否展示部门树
        roleList:[],//角色列表
        postList:[],//岗位列表
        deptData:[],//部门树
        roleList:[],//角色集合
        userFormRule: {
          loginName: [
            {required: true, message: '用户名不能为空', trigger: 'blur'},
            {validator: checkName, trigger: 'blur'}
          ],
          password: [
            {required: true, message: '密码不能为空', trigger: 'blur'}
          ],
          roleIds: [
            {required: true, message: '角色不能为空', trigger: 'blur'}
          ],
        },
        defaultProps: {
          children: 'children',
          label: 'name',
        },
      }
    },
    created() {
      //获取所有的角色
      queryAllRole().then(res => {
        if(res.code===200){
          this.roleList = res.data;
        }
      });
      //获取所有岗位
      queryAllPost().then(res=>{
        if(res.code===200){
          this.postList = res.data;
        }
      });
      //获取部门树结构
      queryTreeDept().then(res=>{
        if(res.code===200){
            this.deptData = res.data;
        }
      })
    },
    methods: {
       //初始化
      init(userId) {
        this.dialogFormVisible = true;
        this.userForm.userId = userId || '';
        this.$nextTick(()=>{
          this.$refs['userForm'].resetFields()
          if(this.userForm.userId){
            this.showData();
          }
        });
      },
      //数据回显
      showData(){
        queryUserById(this.userForm.userId).then(res =>{
            if(res.code===200){
             this.dataEcho(res);
            }
        })
      },
      //新增或者修改操作
      doAddOrUpdateUser(){
        if(this.userForm.userId){
          //修改
          this.updateUser();
        }else{
          //新增
          this.addUser();
        }
      },
      //新增用户
      addUser(){
        this.$refs['userForm'].validate((valid) =>{
          if(valid){
            this.userForm.roleId = this.userForm.roleIds.join(",");
            this.userForm.postId = this.userForm.postIds.join(",");
            add(this.userForm).then(res=>{
              if(res.code===200){
                this.dialogFormVisible = false;
                this.$message.success('添加成功');
                //刷新列表
                this.$emit('refreshList')
              }else{
                this.$message.error('添加失败')
              }
            })
          }
        })
      },
      //修改用户
      updateUser(){
        this.$refs['userForm'].validate((valid) =>{
          if(valid){
            this.userForm.roleId = this.userForm.roleIds.join(",");
            this.userForm.postId = this.userForm.postIds.join(",");
            update(this.userForm).then(res =>{
              if(res.code===200){
                this.dialogFormVisible = false;
                this.$emit('refreshList');
                this.$message.success('修改成功')
              }else{
                this.$message.error('修改失败')
              }
            })
          }
        })
      },
      //数据回显
      dataEcho(res){
        //数据回显
        const info = res.data;
        this.userForm.userName = info.userName;
        this.userForm.password = info.password;
        this.userForm.loginName = info.loginName;
        this.userForm.email = info.email;
        this.userForm.phonenumber = info.phonenumber;
        this.userForm.pic = info.pic;
        this.userForm.deptId = info.deptId;
        if(info.postId){
          const postIdArr = [];
          const postIds = info.postId.split(',')
          for(let i=0;i<postIds.length;i++) {
            postIdArr.push(postIds[i]);
          }
          this.userForm.postIds = postIdArr;
        }
         if(info.roleId){
          const roleIdArr = [];
          const roleIds = info.roleId.split(',')
          for(let i=0;i<roleIds.length;i++) {
            roleIdArr.push(roleIds[i]);
          }
           this.userForm.roleIds = roleIdArr;
        }
      },
      //关闭部门树结构回调
      handleSelectDept(node, instanceId){
        this.userForm.deptId = node.id;
      },
      //清空校验
      openDialog(){
        this.$nextTick(()=>{
          this.$refs.userForm.clearValidate();
        });
      }
    }
  }
</script>

<style scoped>
.el-select--medium{
  width: 60%;
}

</style>
