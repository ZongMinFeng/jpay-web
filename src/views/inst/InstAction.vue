<template>
  <div class="app-container">
    <div class="handle-box">
      <el-button type="success" icon="el-icon-plus" size="medium" :disabled="addDisabled" @click="onAddNewTap">新增</el-button>
    </div>

    <el-card class="box-card" style="margin-top: 20px">
      <el-tree :data="data" default-expand-all :expand-on-click-node="false" @node-click="nodeClick">
      <span slot-scope="{ node, data }" class="custom-tree-node" >
        <span>{{ data.instName }}</span>
        <span>
          <el-button
            type="text"
            size="mini"
            @click="() => append(data)">
            Append
          </el-button>
        </span>
      </span>
      </el-tree>
    </el-card>

  </div>
</template>

<script>
let id = 1000;
import {instTreeGetByCons} from "@/utils/module.js";
import { Toast } from 'mint-ui';
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
      addDisabled:false,

    }
  },

  created(){
    this.initData();
  },

  methods: {
    initData(){
      let params={};
      params.instId='118159676713078784';//debug
      instTreeGetByCons(this, params, Toast).then(
        (res)=>{
          this.data.push(res);
        },
        (res)=>{

        }
      ).catch();
    },

    append(data) {
      const newChild = { id: id++, label: 'testtest', children: [] }
      if (!data.children) {
        this.$set(data, 'children', [])
      }
      data.children.push(newChild)
    },

    nodeClick(data, node) {
      console.log('data', data)// debug
      console.log('node', node)// debug
    },

    onAddNewTap(){

    },
  }
}
</script>

<style scoped>
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
</style>
