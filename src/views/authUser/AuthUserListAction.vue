<template>
  <div class="app-container">
    <el-container>
      <el-aside width="300px">
        <el-tree :data="data" :highlight-current="true" default-expand-all :expand-on-click-node="false" @node-click="nodeClick">
          <template slot-scope="{ node, data }">
            <el-row style="width: 100%;">
              <el-col :span="8">
                <div class="instNameDiv">{{ data.instName }}</div>
              </el-col>
            </el-row>
          </template>
        </el-tree>
      </el-aside>
      <el-main>
        <div class="handle-box">
          <el-button style="float: left" type="success" size="small" icon="el-icon-plus" :disabled="addDisabled" @click="onAddNewTap">新增</el-button>
        </div>
        <el-table :data="tableData" border stripe>
          <el-table-column label="用户Id" prop="code"></el-table-column>
          <el-table-column label="用户名" prop="name"></el-table-column>
          <el-table-column label="过期日期" prop="expDate" width="250"></el-table-column>
          <el-table-column label="描述" prop="description"></el-table-column>
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
      </el-main>
    </el-container>

    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible">
      <el-form :model="dialogForm" label-width="80px" ref="dialogForm">
        <el-row>
          <el-col :span="24">
            <el-form-item label="ID" prop="code" :rules="[
            { required: true, message:'操作员ID不能为空', trigger: 'blur' },
            ]">
              <el-input v-model="dialogForm.code" placeholder="英文字母或数字"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="名称" prop="name" :rules="[
            { required: true, message:'名称不能为空', trigger: 'blur' },
            ]">
              <el-input v-model="dialogForm.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="描述" prop="description">
              <el-input v-model="dialogForm.description"></el-input>
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
  import {instTreeGetByCons, authUserGetByCon, authUserDelete, authUserPreservation} from "@/utils/module.js";
  import {Toast} from 'mint-ui';

  export default {
    name: "AuthUserListAction",
    data() {
      return {
        instInfo: {},
        data: [],
        tableData: [],
        page:1,
        pageSize:10,
        AllCount:0,
        addDisabled:false,
        flag:1,//1:新增  2:修改
        dialogVisible:false,
        dialogForm:{
          code:null,
          name:null,
          instId:null,
          description:null,
          createTellerId:null
        },
        dialogConfirmDisabled:false,
      }
    },

    computed:{
      dialogTitle(){
        if (this.flag===1){
          return '新增';
        } else{
          return '修改';
        }
      }
    },

    created() {
      this.instInfo = JSON.parse(localStorage.getItem("instInfo"));
      this.getInstInfos();
      this.initData();
    },
    methods: {
      initData() {
        let params={};
        params.page=this.page;
        params.pageSize=this.pageSize;
        params.instId=this.instInfo.instId;
        authUserGetByCon(this, params, Toast).then(
          (res)=>{
            this.tableData=res.rows;
            this.AllCount=res.allCount;
          },
          (res)=>{

          }
        ).catch();
      },

      getInstInfos(){
        this.data = [];
        let params = {};
        params.instId = this.instInfo.instId;
        instTreeGetByCons(this, params, Toast).then(
          (res) => {
            this.data.push(res);
          },
          (res) => {

          }
        ).catch();
      },

      nodeClick(data) {
        this.instInfo=data;
        this.initData();
      },

      handleSizeChange(options){
        this.pageSize=options;
        this.initData();
      },

      handleCurrentChange(options){
        this.page=options;
        this.initData();
      },

      itemDelete(id){
        this.$confirm('此操作将删除操作员，是否继续？', '删除操作员', {
          confirmButtonText:'确定',
          cancelButtonText:'取消',
          type:'warning'
        }).then(
          ()=>{
            let params={};
            params.id=id;
            authUserDelete(this, params, Toast).then(
              ()=>{
                this.$message.success('删除成功！');
                this.initData();
              },
              ()=>{

              }
            ).catch();
          }
        ).catch();
      },

      onAddNewTap(){
        this.flag=1;
        this.dialogForm.instId=this.instInfo.instId;
        this.dialogForm.createTellerId=localStorage.getItem("username");
        this.dialogVisible=true;
      },

      dialogFormConfirm(){
        let params={};
        params.code=this.dialogForm.code;
        params.name=this.dialogForm.name;
        params.instId=this.dialogForm.instId;
        params.description=this.dialogForm.description;
        params.createTellerId=this.dialogForm.createTellerId;
        authUserPreservation(this, params, Toast).then(
          ()=>{
            this.$message.success("新增成功！");
            this.initData();
            this.dialogVisible=false;
          },
          ()=>{

          }
        ).catch();
      },
    }
  }
</script>

<style scoped>
  .el-aside {
    /*background-color: #D3DCE6;*/
    border: 1px solid #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 100%;
    padding: 10px;
  }

  .instNameDiv {
    height: 28px;
    float: left;
    margin-right: 5px;
  }

  .instNameDiv:after {
    content: '';
    display: inline-block;
    height: 100%;
    vertical-align: middle;
  }

  .el-main {
    /*background-color: #E9EEF3;*/
    border: 1px solid #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 100%;
  }

  .pagination {
    margin: 20px 0;
    text-align: right;
  }

  .handle-box {
    margin-top: 10px;
    margin-bottom: 20px;
    display: inline-block;
    width: 100%;
  }

</style>
