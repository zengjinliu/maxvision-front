<template>
  <el-dialog
    :title="deptForm.deptId ? `修改部门` : `新增部门`"
    :visible.sync="showDialog"
    :append-to-body="true"
    @open="openDialog"
  >
    <el-form
      :model="deptForm"
      :rules="deptRule"
      ref="deptForm"
      @keyup.enter.native="addOrUpdateDept"
      label-width="80px"
      size="medium"
    >
      <el-form-item label="部门名称" prop="deptName">
        <el-input v-model="deptForm.deptName"></el-input>
      </el-form-item>
      <el-form-item label="负责人" prop="leader">
        <el-input v-model="deptForm.leader"></el-input>
      </el-form-item>
      <el-form-item label="联系电话" prop="phone">
        <el-input v-model="deptForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="deptForm.email"></el-input>
      </el-form-item>
      <el-form-item label="序号" prop="orderNum">
        <el-input-number
          v-model="deptForm.orderNum"
          :min="0"
          label="排序号"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="上级部门" prop="parentName">
        <el-input
          v-model="deptForm.parentName"
          :readonly="true"
        ></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="showDialog = false">取消</el-button>
      <el-button type="primary" @click="addOrUpdateDept()">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addDept, queryByDeptId, updateDept } from "@api/sys/dept";

export default {
  name: "DeptAddOrUpdate",
  data() {
    return {
      deptForm: {
        deptId: '',
        parentId: '0',
        deptName: '',
        parentName: 'root',
        orderNum: '',
        leader:'',
        email:'',
        phone:'',
      },
      deptRule: {
        deptName: [
          { required: true, message: "部门名称不能为空", trigger: "blur" },
        ],
        orderNum: [
          { required: true, message: "排序号不能为空", trigger: "blur" },
        ],
      },
      showDialog: false, //控制dialog显示
      opt: "", //操作（是新增还是修改）
    };
  },
  created() {
    //TOOD 菜单图标待完成
  },
  methods: {
    init(deptId, opt) {
      this.showDialog = true;
      this.opt = opt;
      if (deptId != ""&&deptId!=undefined) {
        if (this.opt === "add") {
          this.deptForm.parentId = deptId;
          //子级菜单新增数据回显
          this.subDeptAddShowData();
        } else {
          this.deptForm.deptId = deptId;
          //子级菜单修改数据回显
          this.subDeptUpdateShowData();
        }
      } else {
        //刷新表单，清空属性
        this.refreshForm();
      }
    },
    addOrUpdateDept() {
      if (this.deptForm.deptId && this.opt === "edit") {
        //修改
        this.$refs["deptForm"].validate((valid) => {
          if (valid) {
            updateDept(this.deptForm).then((res) => {
              if (res.code === 200) {
                this.showDialog = false;
                this.$message.success("修改成功");
                this.$emit("refreshDeptList");
              } else {
                this.$message.success("修改失败");
              }
            });
          }
        });
      } else if (this.deptForm.parentId && this.opt === "add") {
        //新增
        this.$refs["deptForm"].validate((valid) => {
          if (valid) {
            addDept(this.deptForm).then((res) => {
              if (res.code === 200) {
                this.showDialog = false;
                this.$message.success("添加成功");
                this.$emit("refreshDeptList");
              } else {
                this.$message.success("添加失败");
              }
            });
          }
        });
      }
    },
    subDeptAddShowData() {
      queryByDeptId(this.deptForm.parentId).then((res) => {
        if (res.code === 200) {
          let parent = res.data;
          this.deptForm.parentName = parent.deptName;
          this.deptForm.parentId = parent.deptId;
        }
      });
      this.refreshForm();
    },
    subDeptUpdateShowData() {
      queryByDeptId(this.deptForm.deptId).then((res) => {
        if (res.code === 200) {
          let current = res.data;
          this.deptForm.deptName = current.deptName || "root";
          this.deptForm.parentName = current.parentName || "root";
          this.deptForm.parentId = current.parentId;
          this.deptForm.orderNum = current.orderNum;
          this.deptForm.leader = current.leader;
          this.deptForm.phone = current.phone;
        }
      });
    },
    //清空表单
    refreshForm() {
      this.$nextTick(() => {
        this.$refs["deptForm"].resetFields();
      });
    },
    //清空校验
    openDialog(){
      this.$nextTick(()=>{
        this.$refs.deptForm.clearValidate();
      });
    }
  },
};
</script>

<style scoped>
</style>
