<template>
  <el-dialog
    :title="dictDataForm.dictCode ? `修改字典值` : `新增字典值`"
    :visible.sync="showDialog"
    :append-to-body="true"
    @open="openDialog"
  >
    <el-form
      ref="dictDataForm"
      :model="dictDataForm"
      :rules="dictDataFormRule"
      label-width="80px"
      @keyup.enter.native="doAddOrUpdateDict()"
    >
      <el-form-item label="字典标签" prop="dictLabel">
        <el-input v-model="dictDataForm.dictLabel"></el-input>
      </el-form-item>
      <el-form-item label="字典值" prop="dictValue">
        <el-input v-model="dictDataForm.dictValue"></el-input>
      </el-form-item>
      <el-form-item label="字典类型" prop="dictType">
        <el-input v-model="dictDataForm.dictType" :readonly="true"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="dictDataForm.remark"
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
import { addDictData, updateDictData, queryDictDataByDictCode } from "@api/sys/dict";

export default {
  data() {
    return {
      showDialog: false,
      dictDataForm: {
        dictLabel: '',
        dictValue: '',
        dictType:'',
        remark: '',
        dictCode: '',
      },
      dictDataFormRule: {
        dictLabel: [
          { required: true, message: "字典标签不能为空", trigger: "blur" },
        ],
        dictValue: [
          { required: true, message: "字典值不能为空", trigger: "blur" },
        ],
      },
    };
  },
  created() {},
  methods: {
    //初始化
    init(dictCode,dictType) {
      this.showDialog = true;
      this.dictDataForm.dictCode = dictCode || '';
      this.dictDataForm.dictType = dictType || ''
      this.$nextTick(() => {
        this.$refs["dictDataForm"].resetFields();
        if (this.dictDataForm.dictCode) {
          this.showData();
        }
      });
    },
    //修改数据回显
    showData() {
      queryDictDataByDictCode(this.dictDataForm.dictCode).then((res) => {
        if (res.code === 200) {
          this.dictDataForm.dictLabel = res.data.dictLabel;
          this.dictDataForm.dictValue = res.data.dictValue;
          this.dictDataForm.dictCode = res.data.dictCode;
          this.dictDataForm.remark = res.data.remark;
        }
      });
    },
    //新增或者修改
    doAddOrUpdateDict() {
      if (this.dictDataForm.dictCode) {
        //修改
        this.updateDictData();
      } else {
        //新增
        this.addDictData();
      }
    },
    //新增字典类型
    addDictData() {
      this.$refs["dictDataForm"].validate((valid) => {
        if (valid) {
          addDictData(this.dictDataForm).then((res) => {
            if (res.code === 200) {
              this.showDialog = false;
              this.$message.success("添加成功");
              //刷新列表
              this.$emit("refreshDictDataList");
            } else {
              this.$message.error("添加失败");
            }
          });
        }
      });
    },
    //修改字典值
    updateDictData() {
      this.$refs["dictDataForm"].validate((valid) => {
        if (valid) {
          updateDictData(this.dictDataForm).then((res) => {
            if (res.code === 200) {
              this.showDialog = false;
              this.$emit("refreshDictDataList");
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
        this.$refs.dictDataForm.clearValidate();
      });
    },
  },
};
</script>  

<style scoped>
</style>
