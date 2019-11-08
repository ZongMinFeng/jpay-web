<template>
  <div class="app-container">
    <el-button style="float: left; margin-bottom: 15px" type="success" size="small" icon="el-icon-plus"
               :disabled="addDisabled"
               @click="onAddNewTap">新增
    </el-button>

    <el-table :data="tableData" stripe border>
      <el-table-column label="ID" prop="id"></el-table-column>
      <el-table-column label="名字" prop="name"></el-table-column>
      <el-table-column label="手机号" prop="phone"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="props">
          <el-button type="danger" size="small" @click="itemDelete(props.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination @current-change="handleCurrentChange"
                     @size-change="handleSizeChange"
                     :page-sizes="[10, 20, 30, 40]"
                     :page-size="pageSize"
                     layout="total,sizes, prev, pager, next"
                     :total="AllCount">
      </el-pagination>
    </div>

    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible">
      <el-form :model="dialogForm" label-width="80px" ref="dialogForm">
        <el-row>
          <el-col :span="24">
            <el-form-item label="名字" prop="name" :rules="[
            { required: true, message:'名字不能为空', trigger: 'blur' },
            ]">
              <el-input v-model="dialogForm.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="手机号" prop="phone" :rules="[
            { required: true, message:'手机号不能为空', trigger: 'blur' },
            ]">
              <el-input v-model="dialogForm.phone"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog_footer">
        <el-button @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" :disabled="dialogConfirmDisabled" @click="dialogFormConfirm">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {memberQueryByCon, memberSave, memberDelete} from "@/utils/module.js";
  import {Toast} from 'mint-ui';
  export default {
    name: "MemUserListAction",
    data() {
      return {
        addDisabled: false,
        tableData: [],
        page: 1,
        pageSize: 10,
        AllCount: 0,
        issuInstInfo: {
          instId: null,
        },
        flag:1,//1:新增  2：修改
        dialogVisible:false,
        dialogForm:{
          issuId:null,
          name:null,
          phone:null,
          createTellerId:null,
        },
        dialogConfirmDisabled:false,
      }
    },

    computed:{
      dialogTitle(){
        if (this.flag === 1) {
          return '新增';
        }else{
          return '修改';
        }
      }
    },

    created(){
      this.issuInstInfo = JSON.parse(localStorage.getItem("issuInstInfo"));
      this.initData();
    },

    methods: {
      initData() {
        //必须要求有发卡机构
        if (this.issuInstInfo==null||this.issuInstInfo.instId == null) {
          return;
        }
        let params={};
        params.page=this.page;
        params.pageSize=this.pageSize;
        params.issuId=this.issuInstInfo.instId;
        memberQueryByCon(this, params, Toast).then(
          (res)=>{
            this.tableData=res.rows;
            this.AllCount=res.allCount;
          },
          (res)=>{

          }
        ).catch();
      },

      onAddNewTap() {
        this.flag=1;
        this.dialogForm.createTellerId=localStorage.getItem("username");
        this.dialogForm.instId=this.issuInstInfo.instId;
        this.dialogVisible=true;
      },

      handleSizeChange(options) {
        this.pageSize = options;
        this.initData();
      },

      handleCurrentChange(options) {
        this.page = options;
        this.initData();
      },

      itemDelete(id){
        this.$confirm('此操作将删除会员，是否确认？', '删除会员', {
          confirmButtonText:'确定',
          cancelButtonText:'取消',
          type:'warning'
        }).then(
          ()=>{
            let params={};
            params.memId=id;
            params.issuId=this.issuInstInfo.instId;
            memberDelete(this, params, Toast).then(
              (res)=>{
                this.page=1;
                this.$message.success('删除会员成功！');
                this.initData();
              }
            ).catch();
          }
        ).catch();
      },

      dialogFormConfirm(){
        this.$refs['dialogForm'].validate((valid)=>{
          if (valid) {
            this.dialogFormCommit();
          }else{
            return false;
          }
        });
      },

      dialogFormCommit(){
        let params={};
        params.issuId=this.dialogForm.instId;
        params.name=this.dialogForm.name;
        params.phone=this.dialogForm.phone;
        params.createTellerId=this.dialogForm.createTellerId;
        memberSave(this, params, Toast).then(
          (res)=>{
            this.$message.success('新增会员成功！');
            this.initData();
            this.dialogVisible=false;
          }
        ).catch();
      },
    }
  }
</script>

<style scoped>
  .pagination {
    margin: 20px 0;
    text-align: right;
  }
</style>
