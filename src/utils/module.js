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
    if(params.createTellerId!=null){
      send.createTellerId=params.createTellerId;
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

/**
 * 2.1.8	删除操作员
 * @param me
 * @param params
 * @param Toast
 * @returns {Promise<any>}
 */
const authUserDelete = (me, params, Toast) => {
  console.log("authUserDelete", params);//debug
  return new Promise((resolve, reject) => {
    let urlParams = {};
    let send = {};
    let singArray = {};
    urlParams.url = cfg.service.authUserDelete.url + '/' + cfg.service.authUserDelete.action;
    urlParams.txnId = cfg.service.authUserDelete.txnId;

    if(params.id!=null){
      send.id=params.id;
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
 * 2.1.7	新增操作员
 * @param me
 * @param params
 * @param Toast
 * @returns {Promise<any>}
 */
const authUserPreservation = (me, params, Toast) => {
  return new Promise((resolve, reject) => {
    let urlParams = {};
    let send = {};
    let singArray = {};
    urlParams.url = cfg.service.authUserPreservation.url + '/' + cfg.service.authUserPreservation.action;
    urlParams.txnId = cfg.service.authUserPreservation.txnId;

    if(params.code!=null){
      send.code=params.code;
    }
    if(params.name !=null){
      send.name =params.name ;
    }
    if(params.instId!=null){
      send.instId=params.instId;
    }
    if(params.description!=null){
      send.description=params.description;
    }
    if(params.createTellerId!=null){
      send.createTellerId=params.createTellerId;
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
 *2.1.10	根据条件查询操作员（分页查询）
 * @param me
 * @param params
 * @param Toast
 * @returns {Promise<any>}
 */
const authUserGetByCon = (me, params, Toast) => {
  return new Promise((resolve, reject) => {
    let urlParams = {};
    let send = {};
    let singArray = {};
    urlParams.url = cfg.service.authUserGetByCon.url + '/' + cfg.service.authUserGetByCon.action;
    urlParams.txnId = cfg.service.authUserGetByCon.txnId;

    if(params.page!=null){
      send.page=params.page;
    }

    if(params.pageSize!=null){
      send.pageSize=params.pageSize;
    }

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

/**
 * 2.1.11	新增卡类型
 * @param me
 * @param params
 * @param Toast
 * @returns {Promise<any>}
 */
const cardTypePreservation = (me, params, Toast) => {
  console.log("cardTypePreservation", params);//debug
  return new Promise((resolve, reject) => {
    let urlParams = {};
    let send = {};
    let singArray = {};
    urlParams.url = cfg.service.cardTypePreservation.url + '/' + cfg.service.cardTypePreservation.action;
    urlParams.txnId = cfg.service.cardTypePreservation.txnId;

    if(params.name!=null){
      send.name=params.name;
    }
    if(params.issuId !=null){
      send.issuId =params.issuId ;
    }
    if(params.faceAmt!=null){
      send.faceAmt=params.faceAmt;
    }
    if(params.createTellerId!=null){
      send.createTellerId=params.createTellerId;
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
 * 2.1.12	删除卡类型
 * @param me
 * @param params
 * @param Toast
 * @returns {Promise<any>}
 */
const cardTypeDelete = (me, params, Toast) => {
  console.log("cardTypeDelete", params);//debug
  return new Promise((resolve, reject) => {
    let urlParams = {};
    let send = {};
    let singArray = {};
    urlParams.url = cfg.service.cardTypeDelete.url + '/' + cfg.service.cardTypeDelete.action;
    urlParams.txnId = cfg.service.cardTypeDelete.txnId;

    if(params.id!=null){
      send.id=params.id;
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
 * 2.1.14	查询卡类型（分页查询）
 * @param me
 * @param params
 * @param Toast
 * @returns {Promise<any>}
 */
const cardTypeGetByCon = (me, params, Toast) => {
  return new Promise((resolve, reject) => {
    let urlParams = {};
    let send = {};
    let singArray = {};
    urlParams.url = cfg.service.cardTypeGetByCon.url + '/' + cfg.service.cardTypeGetByCon.action;
    urlParams.txnId = cfg.service.cardTypeGetByCon.txnId;

    if(params.page!=null){
      send.page=params.page;
    }

    if(params.pageSize!=null){
      send.pageSize=params.pageSize;
    }

    if(params.issuId!=null){
      send.issuId=params.issuId;
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
 * 2.1.15	新增会员
 * @param me
 * @param params
 * @param Toast
 * @returns {Promise<any>}
 */
const memberSave = (me, params, Toast) => {
  console.log("memberSave", params);//debug
  return new Promise((resolve, reject) => {
    let urlParams = {};
    let send = {};
    let singArray = {};
    urlParams.url = cfg.service.memberSave.url + '/' + cfg.service.memberSave.action;
    urlParams.txnId = cfg.service.memberSave.txnId;

    if(params.issuId!=null){
      send.issuId=params.issuId;
    }
    if(params.acqId!=null){
      send.acqId=params.acqId;
    }
    if(params.name !=null){
      send.name =params.name ;
    }
    if(params.phone!=null){
      send.phone=params.phone;
    }
    if(params.mch!=null){
      send.mch=params.mch;
    }
    if(params.mchName!=null){
      send.mchName=params.mchName;
    }
    if(params.createTellerId!=null){
      send.createTellerId=params.createTellerId;
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
 * 1.1.1	删除会员
 * @param me
 * @param params
 * @param Toast
 * @returns {Promise<any>}
 */
const memberDelete = (me, params, Toast) => {
  console.log("memberSave", params);//debug
  return new Promise((resolve, reject) => {
    let urlParams = {};
    let send = {};
    let singArray = {};
    urlParams.url = cfg.service.memberDelete.url + '/' + cfg.service.memberDelete.action;
    urlParams.txnId = cfg.service.memberDelete.txnId;

    if(params.memId!=null){
      send.memId=params.memId;
    }
    if(params.issuId !=null){
      send.issuId =params.issuId ;
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
 * 2.1.18	查询会员（分页查询）
 * @param me
 * @param params
 * @param Toast
 * @returns {Promise<any>}
 */
const memberQueryByCon = (me, params, Toast) => {
  return new Promise((resolve, reject) => {
    let urlParams = {};
    let send = {};
    let singArray = {};
    urlParams.url = cfg.service.memberQueryByCon.url + '/' + cfg.service.memberQueryByCon.action;
    urlParams.txnId = cfg.service.memberQueryByCon.txnId;

    if(params.page!=null){
      send.page=params.page;
    }

    if(params.pageSize!=null){
      send.pageSize=params.pageSize;
    }

    if(params.issuId!=null){
      send.issuId=params.issuId;
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
 * 2.1.19	查询会员详细信息
 * @param me
 * @param params
 * @param Toast
 * @returns {Promise<any>}
 */
const memberDetailsQueryByCon = (me, params, Toast) => {
  return new Promise((resolve, reject) => {
    let urlParams = {};
    let send = {};
    let singArray = {};
    urlParams.url = cfg.service.memberDetailsQueryByCon.url + '/' + cfg.service.memberDetailsQueryByCon.action;
    urlParams.txnId = cfg.service.memberDetailsQueryByCon.txnId;

    if(params.issuId!=null){
      send.issuId=params.issuId;
    }

    if(params.memId!=null){
      send.memId=params.memId;
    }else{
      send.phone=params.phone;
    }

    if(params.flag!=null){
      send.flag=params.flag;
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
 * 2.26	 会员充值
 * @param me
 * @param params
 * @param Toast
 * @returns {Promise<any>}
 */
const memberCharge = (me, params, Toast) => {
  console.log("memberCharge", params);//debug
  return new Promise((resolve, reject) => {
    let urlParams = {};
    let send = {};
    let singArray = {};
    urlParams.url = cfg.service.memberCharge.url + '/' + cfg.service.memberCharge.action;
    urlParams.txnId = cfg.service.memberCharge.txnId;

    if(params.issuId!=null){
      send.issuId=params.issuId;
    }
    if(params.acqId!=null){
      send.acqId=params.acqId;
    }
    if(params.transId !=null){
      send.transId =params.transId ;
    }
    if(params.memId!=null){
      send.memId=params.memId;
    }
    if(params.amt!=null){
      send.amt=params.amt;
    }
    if(params.mch!=null){
      send.mch=params.mch;
    }
    if(params.mchName!=null){
      send.mchName=params.mchName;
    }
    if(params.pos!=null){
      send.pos=params.pos;
    }
    if(params.posName!=null){
      send.posName=params.posName;
    }
    if(params.createTellerId!=null){
      send.createTellerId=params.createTellerId;
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
 * 2.27	 会员消费
 * @param me
 * @param params
 * @param Toast
 * @returns {Promise<any>}
 */
const memberSale = (me, params, Toast) => {
  console.log("memberCharge", params);//debug
  return new Promise((resolve, reject) => {
    let urlParams = {};
    let send = {};
    let singArray = {};
    urlParams.url = cfg.service.memberSale.url + '/' + cfg.service.memberSale.action;
    urlParams.txnId = cfg.service.memberSale.txnId;

    if(params.issuId!=null){
      send.issuId=params.issuId;
    }
    if(params.acqId!=null){
      send.acqId=params.acqId;
    }
    if(params.transId !=null){
      send.transId =params.transId ;
    }
    if(params.memId!=null){
      send.memId=params.memId;
    }
    if(params.amt!=null){
      send.amt=params.amt;
    }
    if(params.mch!=null){
      send.mch=params.mch;
    }
    if(params.mchName!=null){
      send.mchName=params.mchName;
    }
    if(params.pos!=null){
      send.pos=params.pos;
    }
    if(params.posName!=null){
      send.posName=params.posName;
    }
    if(params.createTellerId!=null){
      send.createTellerId=params.createTellerId;
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
 * 2.29	 订单查询（分页查询）
 * @param me
 * @param params
 * @param Toast
 * @returns {Promise<any>}
 */
const voucherQuery = (me, params, Toast) => {
  return new Promise((resolve, reject) => {
    console.log("订单查询params", params);//debug
    let urlParams = {};
    let send = {};
    let singArray = {};
    urlParams.url = cfg.service.voucherQuery.url + '/' + cfg.service.voucherQuery.action;
    urlParams.txnId = cfg.service.voucherQuery.txnId;

    if(params.page!=null){
      send.page=params.page;
    }

    if(params.pageSize!=null){
      send.pageSize=params.pageSize;
    }

    if(params.issuId!=null){
      send.issuId=params.issuId;
    }
    if(params.acqId!=null){
      send.acqId=params.acqId;
    }
    if(params.memId!=null){
      send.memId=params.memId;
    }
    if(params.account!=null){
      send.account=params.account;
    }
    if(params.flag!=null){
      send.flag=params.flag;
    }
    if(params.mch!=null){
      send.mch=params.mch;
    }
    if(params.pos!=null){
      send.pos=params.pos;
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
  authUserGetByCon,
  authUserDelete,
  authUserPreservation,
  cardTypePreservation,
  cardTypeGetByCon,
  cardTypeDelete,
  memberQueryByCon,
  memberSave,
  memberDelete,
  memberDetailsQueryByCon,
  memberCharge,
  memberSale,
  voucherQuery,
};
