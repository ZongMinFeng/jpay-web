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
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="8">
        <!--<el-card shadow="never">-->
        <!--</el-card>-->
      </el-col>
    </el-row>

    <el-row v-show="vouchShowFlag" :gutter="12" style="margin-top: 50px">
      <el-col :span="18">
        <el-card shadow="always">
          <div style="margin-bottom: 10px">所有订单</div>
          <el-table :data="tableData" stripe border>
            <el-table-column label="订单号" prop="voucher"></el-table-column>
            <el-table-column label="类型" prop="txnName"></el-table-column>
            <el-table-column label="金额" prop="amt"></el-table-column>
            <el-table-column label="退货金额" prop="refundAmt"></el-table-column>
            <el-table-column label="余额" prop="bal"></el-table-column>
            <el-table-column label="时间" prop="createDate"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="props">
                <div>
                  <el-button size="small" v-if="props.row.txnName==='消费'&&props.row.refund_status!==2" type="warning">部分退货</el-button>
                </div>
                <div style="margin-top: 2px">
                  <el-button size="small" v-if="props.row.txnName==='消费'&&props.row.refund_status!==2" type="danger">全部退货</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <div class="pagination">
            <el-pagination @current-change="handleCurrentChange"
                           @size-change="handleSizeChange"
                           :page-sizes="[5, 10, 20, 30, 40]"
                           :page-size="pageSize"
                           layout="total,sizes, prev, pager, next"
                           :total="AllCount">
            </el-pagination>
          </div>
        </el-card>
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
  import {memberDetailsQueryByCon, memberCharge, memberSale, voucherQuery} from "@/utils/module.js";
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
        acqInstInfo: null,
        chargeDisabled: true,
        saleDisabled: true,
        chargeVisible: false,
        chargeForm: {},
        chargeConfirmDisabled: false,
        chargeTitle: '充值',
        username: null,
        saleTitle: '消费',
        saleForm: {
          amt: null,
        },
        saleVisible: false,
        saleConfirmDisabled: false,
        tableData: [],
        //查询订单Form
        searchForm: {
          issuId: null,
          acqId: null,
          memId: null,
          account: null,
          flag: 1,
          mch: null,
          pos: null,
        },
        page: 1,
        pageSize: 5,
        AllCount: 0,
        vouchShowFlag:false,
      };
    },

    created() {
      this.issuInstInfo = JSON.parse(localStorage.getItem("issuInstInfo"));
      this.acqInstInfo = JSON.parse(localStorage.getItem("acqInstInfo"));
      this.instInfo = JSON.parse(localStorage.getItem("instInfo"));
      this.username = localStorage.getItem("username");
      this.searchForm.issuId = this.issuInstInfo.id;
      this.searchForm.acqId = this.acqInstInfo.id;
      this.searchForm.mch = this.instInfo.id;
      this.initData();
    },

    methods: {
      initData() {

      },

      handleSizeChange(options) {
        this.pageSize = options;
        this.getVoucher();
      },

      handleCurrentChange(options) {
        this.page = options;
        this.getVoucher();
      },

      getVoucher() {
        let params = {
          page: this.page,
          pageSize: this.pageSize,
          issuId: this.searchForm.issuId,
          acqId: this.searchForm.acqId,
          memId: this.searchForm.memId,
          account: this.searchForm.account,
          flag: this.searchForm.flag,
          mch: this.searchForm.mch,
          pos: this.searchForm.pos
        };
        voucherQuery(this, params).then(
          (res) => {
            console.log("订单查询res", res);//debug
            this.tableData=res.rows;
            this.AllCount=res.allCount;
          },
          (res) => {

          }
        ).catch();
      },

      nextSeq() {
        let seq = JSON.parse(localStorage.getItem("seq"));
        localStorage.setItem("seq", seq + 1);
        return localStorage.getItem("transId") + seq;
      },

      queryTap() {
        let params = {
          amt: null,
        };
        params.issuId = this.issuInstInfo.id;
        params.memId = this.form.memId;
        params.phone = this.form.phone;
        params.flag = 2;
        memberDetailsQueryByCon(this, params, Toast).then(
          (res) => {
            this.memberInfo = res;
            console.log("memberInfo", this.memberInfo);//debug
            this.chargeDisabled = false;
            this.saleDisabled = false;
            //暂时未开通退货功能
            // this.refoundDisabled=false;

            //查询订单
            this.searchForm.memId = this.memberInfo.id;
            this.getVoucher();
            this.vouchShowFlag=true;
          },
          (res) => {

          }
        ).catch();
      },

      reset() {
        this.form.memId = null;
        this.form.phone = null;
        this.memberInfo = {};
        this.chargeDisabled = true;
        this.saleDisabled = true;
        this.refoundDisabled = true;

        this.vouchShowFlag=false;
      },

      chargeTap() {
        this.chargeVisible = true;
      },

      seleTap() {
        this.saleVisible = true;
      },

      chargeFormConfirm() {
        let params = {};
        params.issuId = this.issuInstInfo.id;
        params.acqId = this.acqInstInfo.id;
        params.transId = this.nextSeq();
        params.memId = this.memberInfo.id;
        params.amt = this.chargeForm.amt;
        params.mch = this.instInfo.id;
        params.mchName = this.instInfo.instName;
        params.createTellerId = this.username;
        memberCharge(this, params, Toast).then(
          (res) => {
            this.$message.success('充值成功');
            this.queryTap();
            this.chargeVisible = false;
            this.getVoucher();
          },
          (res) => {
            this.$message.error('充值失败');
          }
        ).catch();
      },

      saleFormConfirm() {
        let params = {};
        params.issuId = this.issuInstInfo.id;
        params.acqId = this.acqInstInfo.id;
        params.transId = this.nextSeq();
        params.memId = this.memberInfo.id;
        params.amt = this.saleForm.amt;
        params.mch = this.instInfo.id;
        params.mchName = this.instInfo.instName;
        params.createTellerId = this.username;
        memberSale(this, params, Toast).then(
          (res) => {
            this.$message.success('消费成功');
            this.queryTap();
            this.saleVisible = false;
            this.getVoucher();
          },
          (res) => {
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
  .pagination {
    margin: 20px 0;
    text-align: right;
  }
</style>
