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
                <el-form-item label="会员号" prop="memId">
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
              余额: {{memberInfo.bal}} 元
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8" style="text-align: center;">
              <el-button type="success" :disabled="chargeDisabled" @click="chargeTap">充值</el-button>
            </el-col>
            <el-col :span="8" style="text-align: center;">
              <el-button type="primary" :disabled="saleDisabled" @click="seleTap">消费</el-button>
            </el-col>
            <el-col :span="8" style="text-align: center;">
              <el-button type="warning" :disabled="refoundDisabled">退货</el-button>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="8">
        <!--<el-card shadow="never">-->
        <!--</el-card>-->
      </el-col>
    </el-row>

    <el-dialog :title="chargeTitle" :visible.sync="chargeVisible">
      <el-form :model="chargeForm" label-width="80px" ref="dialogForm">
        <el-row>
          <el-col :span="24">
            <el-form-item label="金额" prop="amt">
              <el-input v-model="chargeForm.amt"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog_footer">
        <el-button @click="chargeVisible=false">取消</el-button>
        <el-button type="primary" :disabled="chargeConfirmDisabled" @click="chargeFormConfirm">确定</el-button>
      </span>
    </el-dialog>

    <el-dialog :title="saleTitle" :visible.sync="saleVisible">
      <el-form :model="saleForm" label-width="80px" ref="dialogForm">
        <el-row>
          <el-col :span="24">
            <el-form-item label="金额" prop="amt">
              <el-input v-model="saleForm.amt"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog_footer">
        <el-button @click="saleVisible=false">取消</el-button>
        <el-button type="primary" :disabled="saleConfirmDisabled" @click="saleFormConfirm">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {memberDetailsQueryByCon, memberCharge, memberSale} from "@/utils/module.js";
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
        acqInstInfo:null,
        chargeDisabled:true,
        saleDisabled:true,
        refoundDisabled:true,
        chargeVisible:false,
        chargeForm:{},
        chargeConfirmDisabled:false,
        chargeTitle:'充值',
        username:null,
        saleTitle:'消费',
        saleForm:{
          amt:null,
        },
        saleVisible:false,
        saleConfirmDisabled:false,

      };
    },

    created() {
      this.issuInstInfo = JSON.parse(localStorage.getItem("issuInstInfo"));
      this.acqInstInfo = JSON.parse(localStorage.getItem("acqInstInfo"));
      this.instInfo=JSON.parse(localStorage.getItem("instInfo"));
      this.username=localStorage.getItem("username");
      this.initData();
    },

    methods: {
      initData() {

      },

      nextSeq(){
        let seq=JSON.parse(localStorage.getItem("seq"));
        localStorage.setItem("seq", seq+1);
        return localStorage.getItem("transId")+seq;
      },

      queryTap() {
        let params = {
          amt:null,
        };
        params.issuId = this.issuInstInfo.id;
        params.memId = this.form.memId;
        params.phone = this.form.phone;
        params.flag = 2;
        memberDetailsQueryByCon(this, params, Toast).then(
          (res) => {
            this.memberInfo = res;
            this.chargeDisabled=false;
            this.saleDisabled=false;
            //暂时未开通退货功能
            // this.refoundDisabled=false;
          },
          (res) => {

          }
        ).catch();
      },

      reset(){
        this.form.memId=null;
        this.form.phone=null;
        this.memberInfo={};
        this.chargeDisabled=true;
        this.saleDisabled=true;
        this.refoundDisabled=true;
      },

      chargeTap(){
        this.chargeVisible=true;
      },

      seleTap(){
        this.saleVisible=true;
      },

      chargeFormConfirm(){
        let params={};
        params.issuId=this.issuInstInfo.id;
        params.acqId=this.acqInstInfo.id;
        params.transId=this.nextSeq();
        params.memId=this.memberInfo.id;
        params.amt=this.chargeForm.amt;
        params.mch=this.instInfo.id;
        params.mchName=this.instInfo.instName;
        params.createTellerId=this.username;
        memberCharge(this, params, Toast).then(
          (res)=>{
            this.$message.success('充值成功');
            this.queryTap();
            this.chargeVisible=false;
          },
          (res)=>{
            this.$message.error('充值失败');
          }
        ).catch();
      },

      saleFormConfirm(){
        let params={};
        params.issuId=this.issuInstInfo.id;
        params.acqId=this.acqInstInfo.id;
        params.transId=this.nextSeq();
        params.memId=this.memberInfo.id;
        params.amt=this.saleForm.amt;
        params.mch=this.instInfo.id;
        params.mchName=this.instInfo.instName;
        params.createTellerId=this.username;
        memberSale(this, params, Toast).then(
          (res)=>{
            this.$message.success('消费成功');
            this.queryTap();
            this.saleVisible=false;
          },
          (res)=>{
            this.$message.error('消费失败');
          }
        ).catch();
      }
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
