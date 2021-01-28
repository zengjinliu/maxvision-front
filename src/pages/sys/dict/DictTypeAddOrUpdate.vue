<template>
  <el-dialog
    :title="dictTypeForm.dictId ? `修改字典类型` : `新增字典类型`"
    :visible.sync="showDialog"
    :append-to-body="true"
    @open="openDialog"
  >
    <el-form
      ref="dictTypeForm"
      :model="dictTypeForm"
      :rules="dictTypeFormRule"
      label-width="80px"
      @keyup.enter.native="doAddOrUpdateDict()"
    >
      <el-form-item label="字典名称" prop="dictName">
        <el-input v-model="dictTypeForm.dictName"></el-input>
      </el-form-item>
      <el-form-item label="字典类型" prop="dictType">
        <el-input v-model="dictTypeForm.dictType"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="dictTypeForm.remark"
        >
        </el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="showDialog = false">取 消</el-button>
      <el-button type="primary" @click="doAddOrUpdateDict()">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addDictType, updateDictType, queryDictTypeById } from "@api/sys/dict";

export default {
  name: "DictAddOrUpdate",
  data() {
    return {
      showDialog: false,
      dictTypeForm: {
        dictName: "",
        dictType: "",
        remark: "",
        dictId: "",
      },
      dictTypeFormRule: {
        dictName: [
          { required: true, message: "字典名称不能为空", trigger: "blur" },
        ],
        dictType: [
          { required: true, message: "字典类型不能为空", trigger: "blur" },
        ],
      },
    };
  },
  created() {},
  methods: {
    //初始化
    init(dictId) {
      this.showDialog = true;
      this.dictTypeForm.dictId = dictId || "";
      this.$nextTick(() => {
        this.$refs["dictTypeForm"].resetFields();
        if (this.dictTypeForm.dictId) {
          this.showData();
        }
      });
    },
    //修改数据回显
    showData() {
      queryDictTypeById(this.dictTypeForm.dictId).then((res) => {
        if (res.code === 200) {
          this.dictTypeForm.dictName = res.data.dictName;
          this.dictTypeForm.dictType = res.data.dictType;
          this.dictTypeForm.dictId = res.data.dictId;
          this.dictTypeForm.remark = res.data.remark;
        }
      });
    },
    //新增或者修改
    doAddOrUpdateDict() {
      if (this.dictTypeForm.dictId) {
        //修改
        this.updateDict();
      } else {
        //新增
        this.addDict();
      }
    },
    //新增字典类型
    addDict() {
      this.$refs["dictTypeForm"].validate((valid) => {
        if (valid) {
          addDictType(this.dictTypeForm).then((res) => {
            if (res.code === 200) {
              this.showDialog = false;
              this.$message.success("添加成功");
              //刷新列表
              this.$emit("refreshDictTypeList");
            } else {
              this.$message.error("添加失败");
            }
          });
        }
      });
    },
    //修改字典类型
    updateDict() {
      this.$refs["dictTypeForm"].validate((valid) => {
        if (valid) {
          updateDictType(this.dictTypeForm).then((res) => {
            if (res.code === 200) {
              this.showDialog = false;
              this.$emit("refreshDictTypeList");
              this.$message.success("修改成功");
            } else {
              this.$message.error("修改失败");
            }
          });
        }
      });
    },
    //清空校验
    openDialog() {
      this.$nextTick(() => {
        this.$refs.dictTypeForm.clearValidate();
      });
    },
  },
};
</script>  

<style scoped>
</style>
