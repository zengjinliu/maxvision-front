<template>
  <el-dialog :title="postForm.postId?`修改部门`:`新增部门`"
             :visible.sync="dialogFormVisible"
             :append-to-body="true"
             @open="openDialog"
             >

    <el-form ref="postForm" :model="postForm"
             :rules="postFormRule" label-width="80px"
             @keyup.enter.native="doAddOrUpdatePost()">

      <el-form-item label="岗位名称" prop="postName">
        <el-input v-model="postForm.postName"></el-input>
      </el-form-item>
      <el-form-item label="岗位代码" prop="postCode">
        <el-input v-model="postForm.postCode"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="postForm.remark">
        </el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="doAddOrUpdatePost()">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {addPost,updatePost,queryPostById} from "@api/sys/post";

  export default {
    name: "PostAddOrUpdate",
    data() {
      return {
        dialogFormVisible: false,
        postForm: {
          postName: '',
          postCode:'',
          remark: '',
          postId:''
        },
        postFormRule: {
          postName: [
            {required: true, message: '岗位名称不能为空', trigger: 'blur'},
          ]
        },
      }
    },
    created() {
      
    },
    methods: {
       init (postId) {
        this.postForm.postId = postId || ''
        this.dialogFormVisible = true;
        this.$nextTick(()=>{
          this.$refs['postForm'].resetFields()
          if(this.postForm.postId){
            this.showData();
          }
        });
      },
      //修改时数据回显
      showData(){
        queryPostById(this.postForm.postId).then(res =>{
            if(res.code===200){
              this.postForm.postName = res.data.postName;
              this.postForm.postCode = res.data.postCode;
              this.postForm.postId = res.data.postId;
              this.postForm.remark = res.data.remark;
            }
          })
      },
      doAddOrUpdatePost(){
        if(this.postForm.postId){
          //修改
          this.updatePost();
        }else{
          //新增
          this.addPost();
        }
      },
      //新增岗位
      addPost(){
        this.$refs['postForm'].validate((valid) =>{
          if(valid){
            addPost(this.postForm).then(res=>{
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
      //更新岗位
      updatePost(){
        this.$refs['postForm'].validate((valid) =>{
          if(valid){
            updatePost(this.postForm).then(res =>{
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
      //清空校验
      openDialog(){
        this.$nextTick(()=>{
          this.$refs.postForm.clearValidate();
        });
      },
    }
  }
</script>  

<style scoped>

</style>
