let jsonSha256 = require('./jsonSha256.js')
let pub = require('./pub.js')
let cfg = require('../config/cfg.js')
let trans = require('./../config/trans.js')
let sysArg = require('./../config/sysArg.js')
let util = require('./util.js')
let axios = require('axios')
let base64 = require('./base64')

const sendServer = (urlParams, me, Toast, flag) => {
  let adminPcUuid = localStorage.getItem('adminPcUuid') || ''
  let macKey = localStorage.getItem('macKey') || ''
  let instId = localStorage.getItem('instId') || ''
  let tellerId = localStorage.getItem('tellerId') || ''
  let date = new Date()
  let ssDate = util.ssformatTime(date)
  let sha256Key = '';

  return new Promise((resolve, reject) => {
    let send = urlParams.send
    let header = urlParams.header || {}
    header.txnId = urlParams.txnId
    header.channelFlag = '4'
    header.reqTime = ssDate


    if (urlParams.txnId === cfg.service.loginCheck.txnId) {
      sha256Key = '8AAE67FA6B5B1BBCF14BC7CA425A0116'
    } else {
      sha256Key = macKey
      header.adminPcUuid = adminPcUuid
      header.instId = instId
      header.tellerId = tellerId
    }


    let noSing = urlParams.noSing || false
    pub.pubRandom(header)
    if (!noSing) {
      let headerStr = '1=4&2=' + header.reqCasher + '&3=' + ssDate + '&4=' + urlParams.txnId
      let singArray = urlParams.singArray || {}

      if (urlParams.txnId === cfg.service.bindDeviceModification.txnId || urlParams.txnId === cfg.service.roomerInsBatch.txnId) {
        headerStr += '&5=' + header.adminPcUuid + '&6=' + header.instId + '&7=' + header.operFlag + '&8=' + header.tellerId
      } else if (urlParams.txnId !== cfg.service.login.txnId) {
        headerStr += '&5=' + header.adminPcUuid + '&6=' + header.instId + '&8=' + header.tellerId
      }


      let jsonstr = ''
      if (singArray && singArray !== {}) {
        let jsonObj = jsonSha256.objKeySort(singArray)
        console.log('jsonObj:', jsonObj)

        for (let item in jsonObj) {
          jsonstr += '&' + item + '=' + jsonObj[item]
        }
      }
      console.log('jsonstr:', jsonstr);
      if (jsonstr) {
        headerStr += jsonstr
      }
      console.log('headerStr:', headerStr);

      let signBase64 = base64.base64encode(headerStr)
      let signString1 = signBase64 + '&key=' + sha256Key
      console.log('签名内容：', signString1)
      header.signValue = jsonSha256.json2sha(signString1)
    }

    const loading = me.$loading({
      lock: true,
      text: '拼命加载中',
      background: 'rgba(0, 0, 0, 0.7)'
    })

    axios.post(urlParams.url, send, {headers: header}).then(
      (res) => {
        console.log('res:', res);
        loading.close();
        if (res.status === 200) {
          const data = res.data;
          //如果有状态返回，那么此交易有问题
          if (data.status != null && data.message!=null){
            me.$message.error(data.message);
            reject(false);
            return false;
          }
          resolve(data);
          return true
        } else {
          reject(false);
          return false
        }
      },
      (res) => {
        console.log('res:', res);
        loading.close();
        if (res.message.includes('timeout')) {
          me.$message.error('网络异常，结果未知，请稍后再试!');
          reject('timeout');
          return
        }
        me.$message.error('网络故障，请稍后再试!');
        reject(false)
      }
    );
  })
};

export {
  sendServer
}
