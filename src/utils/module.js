const common = require('./common.js');
const cfg = require("../config/cfg.js");

const loginCheck = (me, params, Toast) => {
  return new Promise((resolve, reject) => {
    let urlParams = {};
    let send = {};
    let singArray = {};
    let header={};
    urlParams.url = cfg.service.loginCheck.url + '/' + cfg.service.loginCheck.action;
    urlParams.txnId = cfg.service.loginCheck.txnId;

    if(params.userInfo!=null){
      header.userInfo=params.userInfo;
    }

    urlParams.send = send;
    urlParams.noSing = true;
    urlParams.singArray = singArray;
    urlParams.header=header;

    common.sendServer(urlParams,me,Toast).then((res) => {
        resolve(res)
      }, (res) => {
        reject(res)
      }
    );
  })
};

/**
 * 2.1.1	新增机构
 * @param me
 * @param params
 * @param Toast
 * @returns {Promise<any>}
 */
const instPreservation = (me, params, Toast) => {
  return new Promise((resolve, reject) => {
    let urlParams = {};
    let send = {};
    let singArray = {};
    urlParams.url = cfg.service.instPreservation.url + '/' + cfg.service.instPreservation.action;
    urlParams.txnId = cfg.service.instPreservation.txnId;

    if(params.instName!=null){
      send.instName=params.instName;
    }
    if(params.parentInstId !=null){
      send.parentInstId =params.parentInstId ;
    }
    if(params.issuTag!=null){
      send.issuTag=params.issuTag;
    }
    if(params.acqTag!=null){
      send.acqTag=params.acqTag;
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

/**
 * 2.1.2	删除机构
 * @param me
 * @param params
 * @param Toast
 * @returns {Promise<any>}
 */
const instDelete = (me, params, Toast) => {
  console.log("instDelete参数", params);//debug
  return new Promise((resolve, reject) => {
    let urlParams = {};
    let send = {};
    let singArray = {};
    urlParams.url = cfg.service.instDelete.url + '/' + cfg.service.instDelete.action;
    urlParams.txnId = cfg.service.instDelete.txnId;

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

const instModification = (me, params, Toast) => {
  console.log("instDelete参数", params);//debug
  return new Promise((resolve, reject) => {
    let urlParams = {};
    let send = {};
    let singArray = {};
    urlParams.url = cfg.service.instModification.url + '/' + cfg.service.instModification.action;
    urlParams.txnId = cfg.service.instModification.txnId;

    if(params.instId!=null){
      send.instId=params.instId;
    }

    if(params.instName!=null){
      send.instName=params.instName;
    }
    if(params.parentInstId !=null){
      send.parentInstId =params.parentInstId ;
    }
    if(params.issuTag!=null){
      send.issuTag=params.issuTag;
    }
    if(params.acqTag!=null){
      send.acqTag=params.acqTag;
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
  loginCheck,
  instPreservation,
  instDelete,
  instModification,
  instTreeGetByCons,
};
