<template>
  <el-dialog
    :title="dataForm.menuId ? `修改菜单` : `新增菜单`"
    :visible.sync="showDialog"
    :append-to-body="true"
  >
    <el-form
      :model="dataForm"
      :rules="dataRule"
      ref="dataForm"
      @keyup.enter.native="addOrUpdateMenu"
      label-width="80px"
      size="medium"
    >
      <el-form-item label="菜单名称" prop="menuName">
        <el-input v-model="dataForm.menuName"></el-input>
      </el-form-item>
      <el-form-item label="菜单链接" prop="url">
        <el-input v-model="dataForm.url"></el-input>
      </el-form-item>
      <el-form-item label="序号" prop="orderNum">
        <el-input-number
          v-model="dataForm.orderNum"
          :min="0"
          label="排序号"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="菜单图标" prop="icon">
        <el-input v-model="dataForm.icon" placeholder="菜单图标名称"></el-input>
      </el-form-item>
      <el-form-item label="权限" prop="perms">
        <el-input
          v-model="dataForm.perms"
          placeholder="多个用逗号分隔, 如: user:list,user:create"
        ></el-input>
      </el-form-item>
      <el-form-item label="上级菜单" prop="parentName">
        <el-input
          v-model="dataForm.parentName"
          :readonly="true"
        ></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="showDialog = false">取消</el-button>
      <el-button type="primary" @click="addOrUpdateMenu()">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addMenu, queryByMenuId, updateMenu } from "@api/sys/menu";

export default {
  name: "MenuAddOrUpdate",
  data() {
    return {
      dataForm: {
        menuId: "",
        parentId: "0",
        menuName: "",
        url: "",
        perms: "",
        parentName: "root",
        icon: "",
        orderNum: "",
      },
      dataRule: {
        menuName: [
          { required: true, message: "菜单名称不能为空", trigger: "blur" },
        ],
        orderNum: [
          { required: true, message: "排序号不能为空", trigger: "blur" },
        ],
      },
      showDialog: false, //控制dialog显示
      opt: "", //操作（是新增还是修改）
      iconList: [], //图标列表
    };
  },
  created() {
    //TOOD 菜单图标待完成
  },
  methods: {
    init(menuId, opt) {
      this.showDialog = true;
      this.opt = opt;
      if (menuId != "") {
        if (this.opt === "add") {
          this.dataForm.parentId = menuId;
          //子级菜单新增数据回显
          this.subMenuAddShowData();
        } else {
          this.dataForm.menuId = menuId;
          //子级菜单修改数据回显
          this.subMenuUpdateShowData();
        }
      } else {
        //刷新表单，清空属性
        this.refreshForm();
      }
    },
    addOrUpdateMenu() {
      if (this.dataForm.menuId && this.opt === "edit") {
        //修改
        this.$refs["dataForm"].validate((valid) => {
          if (valid) {
            updateMenu(this.dataForm).then((res) => {
              if (res.code === 200) {
                this.showDialog = false;
                this.$message.success("修改成功");
                this.$emit("refreshMenuList");
              } else {
                this.$message.success("修改失败");
              }
            });
          }
        });
      } else if (this.dataForm.parentId && this.opt === "add") {
        //新增
        this.$refs["dataForm"].validate((valid) => {
          if (valid) {
            addMenu(this.dataForm).then((res) => {
              if (res.code === 200) {
                this.showDialog = false;
                this.$message.success("添加成功");
                this.$emit("refreshMenuList");
              } else {
                this.$message.success("添加失败");
              }
            });
          }
        });
      }
    },
    subMenuAddShowData() {
      queryByMenuId(this.dataForm.parentId).then((res) => {
        if (res.code === 200) {
          let parent = res.data;
          this.dataForm.parentName = parent.menuName;
          this.dataForm.parentId = parent.menuId;
        }
      });
      this.refreshForm();
    },
    subMenuUpdateShowData() {
      queryByMenuId(this.dataForm.menuId).then((res) => {
        if (res.code === 200) {
          let current = res.data;
          this.dataForm.menuName = current.menuName || "root";
          this.dataForm.parentName = current.parentName || "root";
          this.dataForm.parentId = current.parentId;
          this.dataForm.orderNum = current.orderNum;
          this.dataForm.perms = current.perms;
          this.dataForm.url = current.url;
        }
      });
    },
    refreshForm() {
      this.$nextTick(() => {
        this.$refs["dataForm"].resetFields();
      });
    },
  },
};
</script>

<style scoped>
</style>
