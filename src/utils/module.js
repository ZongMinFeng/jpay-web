const common = require('./common.js');
const cfg = require("../config/cfg.js");

const instTreeGetByCons = (me, params, Toast) => {
  return new Promise((resolve, reject) => {
    let urlParams = {};
    let send = {};
    let singArray = {};
    urlParams.url = cfg.service.instTreeGetByCons.url + '/' + cfg.service.instTreeGetByCons.action;
    urlParams.txnId = cfg.service.instTreeGetByCons.txnId;

    if(params.instId!=null){
      send.instId=params.instId;
    }

    urlParams.send = send;
    urlParams.noSing = true;
    urlParams.singArray = singArray;

    common.sendServer(urlParams,me,Toast).then((res) => {
        resolve(res)
      }, (res) => {
        reject(res)
      }
    );
  })
};

export {
  instTreeGetByCons,

};
