<template>
  <div class="dashboard-container">
    <el-row :gutter="12">
      <el-col :span="8">
        <el-card shadow="always">
          <el-form :model="form" label-width="80px" ref="form">
            <el-row>
              <el-col :span="24">
                <el-form-item label="手机号" prop="phone">
                  <el-input v-model="form.phone"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="会员ID" prop="memId">
                  <el-input v-model="form.memId"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <el-row>
            <el-col :span="12">
              <el-button style="float: right;" type="warning" @click="reset">重置</el-button>
            </el-col>
            <el-col :span="12">
              <el-button style="float: right;" type="primary" @click="queryTap">查询</el-button>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="always">
          <el-row style="margin-bottom: 20px;">
            <el-col :span="12">
              会员名: {{memberInfo.name}}
            </el-col>
            <el-col :span="12">
              余额: {{memberInfo.bal}}
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8" style="text-align: center;">
              <el-button type="success">充值</el-button>
            </el-col>
            <el-col :span="8" style="text-align: center;">
              <el-button type="primary">消费</el-button>
            </el-col>
            <el-col :span="8" style="text-align: center;">
              <el-button type="warning">退货</el-button>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="8">
        <!--<el-card shadow="never">-->
        <!--</el-card>-->
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {memberDetailsQueryByCon} from "@/utils/module.js";
  import {Toast} from 'mint-ui';

  export default {
    name: 'Dashboard',
    data() {
      return {
        form: {
          phone: null,
          memId: null,
        },
        memberInfo: {
          name: '',
          bal: '',
        },
        issuInstInfo: null,
      };
    },

    created() {
      this.issuInstInfo = JSON.parse(localStorage.getItem("issuInstInfo"));
      this.initData();
    },

    methods: {
      initData() {

      },

      queryTap() {
        let params = {};
        params.issuId = this.issuInstInfo.instId;
        params.memId = this.form.memId;
        params.phone = this.form.phone;
        params.flag = 2;
        memberDetailsQueryByCon(this, params, Toast).then(
          (res) => {
            this.memberInfo = res;
          },
          (res) => {

          }
        ).catch();
      },

      reset(){
        this.form.memId=null;
        this.form.phone=null;
        this.memberInfo={};
      },
    }
  }
</script>

<style lang="scss" scoped>
  .dashboard {
    &-container {
      margin: 30px;
    }

    &-text {
      font-size: 30px;
      line-height: 46px;
    }
  }
</style>
