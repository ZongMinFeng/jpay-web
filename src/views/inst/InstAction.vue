<template>
  <div class="app-container">
    <el-card class="box-card" style="margin-top: 20px">
      <el-tree :data="data" default-expand-all :expand-on-click-node="false" @node-click="nodeClick">
        <template slot-scope="{ node, data }">
          <el-row style="width: 100%;">
            <el-col :span="8">
              <div class="instNameDiv">{{ data.instName }}</div>
            </el-col>
            <el-col :span="8">
              <div v-if="data.mngTag===1" class="instNameDiv fontSizeSmall">管理机构</div>
              <div v-if="data.issuTag===1" class="instNameDiv fontSizeSmall">发卡</div>
              <div v-if="data.acqTag===1" class="instNameDiv fontSizeSmall">收单</div>
              <div class="instNameDiv">&nbsp;</div>
            </el-col>
            <el-col :span="8">
              <el-button style="float: right; color: red; margin-left: 5px"
                         type="text"
                         size="mini"
                         @click="onDeleteTap(data)">
                删除
              </el-button>
              <el-button style="float: right;"
                         type="text" size="mini"
                         @click="onModiTap(data)">
                修改
              </el-button>
              <el-button style="float: right; color: green;"
                         type="text" size="mini"
                         @click="onAddNewTap(data)">
                添加子机构
              </el-button>
            </el-col>
          </el-row>
        </template>
      </el-tree>
    </el-card>

    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible">
      <el-form :model="dialogForm" label-width="80px" ref="dialogForm">
        <el-row>
          <el-col :span="24">
            <el-form-item label="名称" prop="instName" :rules="[
              {required: true, message: '请输入机构名称', trigger: 'blur'}
            ]">
              <el-input v-model="dialogForm.instName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :sapn="24">
            <el-form-item label="发卡标志" prop="unitId" ref="dialogUintId" >
              <el-select v-model="dialogForm.issuTag" placeholder="请选择类型" style="width: 100%;">
                <el-option v-for="item in issuTags" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :sapn="24">
            <el-form-item label="收单标志" prop="unitId" ref="dialogUintId" >
              <el-select v-model="dialogForm.acqTag" placeholder="请选择类型" style="width: 100%;">
                <el-option v-for="item in acqTags" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog_footer">
        <el-button @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="dialogFormConfirm">确定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  let id = 1000;
  import {instPreservation, instTreeGetByCons, instDelete, instModification} from "@/utils/module.js";
  import {Toast} from 'mint-ui';

  export default {
    name: 'InstAction',

    data() {
      //数据模型
      const data = [
        {
          "id": 118159676713078784,
          "instId": 118159676713078784,
          "instName": "管理机构",
          "parentInstId": 0,
          "mngTag": 0,
          "issuTag": 0,
          "acqTag": 0,
          "createDate": "2019-10-26T07:29:23.000+0000",
          "createTellerId": "system",
          "modiDate": "2019-10-26T07:29:23.000+0000",
          "modiTellerId": "system",
          "children": [
            {
              "id": 118164846838681600,
              "instId": 118164846838681600,
              "instName": "商场1",
              "parentInstId": 118159676713078784,
              "mngTag": 0,
              "issuTag": 0,
              "acqTag": 0,
              "createDate": "2019-10-26T07:49:56.000+0000",
              "createTellerId": "system",
              "modiDate": "2019-10-26T07:49:56.000+0000",
              "modiTellerId": "system",
              "children": [
                {
                  "id": 118182371244773376,
                  "instId": 118182371244773376,
                  "instName": "财务部",
                  "parentInstId": 118164846838681600,
                  "mngTag": 0,
                  "issuTag": 0,
                  "acqTag": 0,
                  "createDate": "2019-10-26T08:59:34.000+0000",
                  "createTellerId": "system",
                  "modiDate": "2019-10-26T08:59:34.000+0000",
                  "modiTellerId": "system",
                  "children": []
                }
              ]
            },
            {
              "id": 118169117185413120,
              "instId": 118169117185413120,
              "instName": "商场2",
              "parentInstId": 118159676713078784,
              "mngTag": 0,
              "issuTag": 0,
              "acqTag": 0,
              "createDate": "2019-10-26T08:06:54.000+0000",
              "createTellerId": "system",
              "modiDate": "2019-10-26T08:06:54.000+0000",
              "modiTellerId": "system",
              "children": []
            },
            {
              "id": 118170288964898816,
              "instId": 118170288964898816,
              "instName": "商场3",
              "parentInstId": 118159676713078784,
              "mngTag": 0,
              "issuTag": 0,
              "acqTag": 0,
              "createDate": "2019-10-26T08:11:33.000+0000",
              "createTellerId": "system",
              "modiDate": "2019-10-26T08:11:33.000+0000",
              "modiTellerId": "system",
              "children": []
            },
            {
              "id": 118182233793236992,
              "instId": 118182233793236992,
              "instName": "商场4",
              "parentInstId": 118159676713078784,
              "mngTag": 0,
              "issuTag": 0,
              "acqTag": 0,
              "createDate": "2019-10-26T08:59:01.000+0000",
              "createTellerId": "system",
              "modiDate": "2019-10-26T08:59:01.000+0000",
              "modiTellerId": "system",
              "children": []
            }
          ]
        }
      ];
      return {
        data: [],
        flag: 1,//1:新增, 2:修改
        dialogVisible: false,
        dialogForm: {
          instId:null,
          instName:null,
          parentInstId:null,
          issuTag:0,
          acqTag:0,
        },
        issuTags:[
          {id:0, name:'不发卡'},
          {id:1, name:'发卡'}
        ],
        acqTags:[
          {id:0, name:'不收单'},
          {id:1, name:'收单'}
        ],
        instInfo:{},
        username:null,
      }
    },

    computed: {
      dialogTitle() {
        if (this.flag === 1) {
          return '新增';
        } else {
          return '修改';
        }
      }
    },

    created() {
      this.instInfo=JSON.parse(localStorage.getItem("instInfo"));
      console.log("instInfo", this.instInfo);//debug
      this.username=localStorage.getItem("username");
      this.initData();
    },

    methods: {
      initData() {
        this.data=[];
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

      append(data) {
        const newChild = {id: id++, label: 'testtest', children: []}
        if (!data.children) {
          this.$set(data, 'children', [])
        }
        data.children.push(newChild)
      },

      nodeClick(data, node) {
      },

      onAddNewTap(data) {
        console.log("data", data);//debug
        this.flag = 1;
        this.dialogForm.parentInstId=data.instId;
        this.dialogForm.issuTag=0;
        this.dialogForm.acqTag=0;
        this.dialogVisible = true;
      },

      onModiTap(data){
        this.flag = 2;
        this.dialogForm.instId=data.instId;
        this.dialogForm.parentInstId=data.parentInstId;
        this.dialogForm.instName=data.instName;
        this.dialogForm.issuTag=0;
        this.dialogForm.acqTag=0;
        this.dialogVisible = true;
      },

      dialogFormConfirm(){
        if(this.flag===1){
          //新增
          let params={};
          params.instName=this.dialogForm.instName;
          params.parentInstId=this.dialogForm.parentInstId;
          params.issuTag=this.dialogForm.issuTag;
          params.acqTag=this.dialogForm.acqTag;
          params.createTellerId=this.username;
          instPreservation(this, params, Toast).then(
            (res)=>{
              this.$message.success('新增成功！');
              this.initData();
            },
            (res)=>{

            }
          ).catch();
        }else{
          //修改
          let params={};
          params.instId=this.dialogForm.instId;
          params.instName=this.dialogForm.instName;
          params.issuTag=this.dialogForm.issuTag;
          params.acqTag=this.dialogForm.acqTag;
          params.createTellerId=this.username;
          instModification(this, params, Toast).then(
            (res)=>{
              this.$message.success('修改成功！');
              this.initData();
            },
            (res)=>{

            }
          ).catch();
        }
        this.dialogVisible=false;
      },

      onDeleteTap(data){
        console.log("删除data", data);//debug
        this.$confirm('此操作将删除机构，是否确认？', '机构删除',{
          confirmButtonText:'确认',
          cancelButtonText:'取消',
          type:'warning'
        }).then(
          ()=>{
            let params={};
            params.instId=data.instId;
            instDelete(this, params, Toast).then(
              (res)=>{
                this.$message.success('删除成功 ！');
                this.initData();
              },

              (res)=>{

              }
            ).catch();
          }
        );
      }
    }
  }
</script>

<style scoped>
  .instNameDiv{
    height: 28px;
    float: left;
    margin-right: 5px;
  }
  .instNameDiv:after{
    content: '';
    display: inline-block;
    height: 100%;
    vertical-align: middle;
  }

  .fontSizeSmall{
    font-size: small;
  }
</style>
