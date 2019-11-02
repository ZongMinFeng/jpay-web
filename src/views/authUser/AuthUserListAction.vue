<template>
  <div class="app-container">
    <el-container>
      <el-container>
        <el-aside width="300px">
          <el-tree :data="data" default-expand-all :expand-on-click-node="false" @node-click="nodeClick">
            <template slot-scope="{ node, data }">
              <el-row style="width: 100%;">
                <el-col :span="8">
                  <div class="instNameDiv">{{ data.instName }}</div>
                </el-col>
              </el-row>
            </template>
          </el-tree>
        </el-aside>
        <el-container>
          <el-main>Main</el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import {instTreeGetByCons} from "@/utils/module.js";
  import {Toast} from 'mint-ui';
  export default {
    name: "AuthUserListAction",
    data(){
      return{
        instInfo:{},
        data:[],
      }
    },
    created(){
      this.instInfo=JSON.parse(localStorage.getItem("instInfo"));
      this.initData();
    },
    methods:{
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

      nodeClick(){

      },
    }
  }
</script>

<style scoped>
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 100%;
    padding: 10px;
  }

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

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 100%;
  }

</style>
