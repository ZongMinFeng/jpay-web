<template>
  <div class="app-container">
    <el-button style="float: left; margin-bottom: 15px" type="success" size="small" icon="el-icon-plus"
               :disabled="addDisabled"
               @click="onAddNewTap">新增
    </el-button>

    <el-table :data="tableData" stripe border>
      <el-table-column label="名称" prop="name"></el-table-column>
      <el-table-column label="面额" prop="faceAmt"></el-table-column>
      <el-table-column label="修改时间" prop="modiDate"></el-table-column>
      <el-table-column label="修改者" prop="modiTellerId"></el-table-column>
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
            <el-form-item label="名称" prop="name" :rules="[
            { required: true, message:'卡类型名称不能为空', trigger: 'blur' },
            ]">
              <el-input v-model="dialogForm.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="面额" prop="faceAmt" :rules="[
            { required: true, message:'面额不能为空', trigger: 'blur' },
            ]">
              <el-input v-model="dialogForm.faceAmt"></el-input>
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
  import {cardTypeGetByCon, cardTypePreservation, cardTypeDelete} from "@/utils/module.js";
  import {Toast} from 'mint-ui';

  export default {
    name: "CardTypeListAction",
    data() {
      return {
        addDisabled: false,
        tableData: [],
        instInfo: {},
        issuInstInfo: {
          instId: null,
          faceAmt:null,
        },
        page: 1,
        pageSize: 10,
        AllCount: 0,
        flag:1,//1:新增  2：修改
        dialogVisible:false,
        dialogForm:{
          name:null,

        },
        dialogConfirmDisabled:false,
      };
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

    created() {
      // this.instInfo = JSON.parse(localStorage.getItem("instInfo"));
      this.issuInstInfo = JSON.parse(localStorage.getItem("issuInstInfo"));
      this.initData();
    },

    methods: {
      initData() {
        if (this.issuInstInfo == null) {
          return;
        }
        let params = {};
        params.issuId = this.issuInstInfo.instId;
        params.page = this.page;
        params.pageSize = this.pageSize;
        cardTypeGetByCon(this, params, Toast).then(
          (res) => {
            this.AllCount = res.allCount;
            this.tableData = res.rows;
          },
          (res) => {

          }
        ).catch();
      },

      onAddNewTap() {
        this.flag=1;
        this.dialogForm.issuId=this.issuInstInfo.instId;
        this.dialogForm.createTellerId=localStorage.getItem("username");
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

      dialogFormConfirm(){
        this.$refs['dialogForm'].validate((valid)=>{
            if (valid){
              this.saveCardType();
            } else {
              return false;
            }
          });
      },

      saveCardType(){
        let params={};
        params.name=this.dialogForm.name;
        params.issuId=this.dialogForm.issuId;
        params.faceAmt=this.dialogForm.faceAmt;
        params.createTellerId=this.dialogForm.createTellerId;
        cardTypePreservation(this, params, Toast).then(
          (res)=>{
            this.$message.success('新增成功！');
            this.initData();
            this.dialogVisible=false;
          },
          (res)=>{

          }
        ).catch();
      },

      itemDelete(id){
        this.$confirm('此操作将删除卡类型，是否确认？', '删除卡类型', {
          confirmButtonText:'确认',
          cancelButtonText:'取消',
          type:'warning'
        }).then(
          ()=>{
            let params={};
            params.id=id;
            cardTypeDelete(this, params, Toast).then(
              (res)=>{
                this.$message.success('删除成功！');
                this.initData();
              },
              (res)=>{

              }
            ).catch();
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
