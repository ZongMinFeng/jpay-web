// const baseUrlSystem='/PcMng/System';
const baseUrlSystem='';//测试

module.exports = {
  service: {
    //efile后面不要加斜杠
    //uploadUrl:'http://139.196.162.158:10080/efile',
    uploadUrl:'http://221.226.96.94:16018/images',//生产

    instPreservation: {
      url: baseUrlSystem,
      action: 'instPreservation',
      txnId: 'instPreservation'
    },

    instDelete: {
      url: baseUrlSystem,
      action: 'instDelete',
      txnId: 'instDelete'
    },

    instModification: {
      url: baseUrlSystem,
      action: 'instModification',
      txnId: 'instModification'
    },

    instTreeGetByCons: {
      url: baseUrlSystem,
      action: 'instTreeGetByCons',
      txnId: 'instTreeGetByCons'
    },

    loginCheck: {
      url: baseUrlSystem,
      action: 'loginCheck',
      txnId: 'loginCheck'
    },

    authUserGetByCon: {
      url: baseUrlSystem,
      action: 'authUserGetByCon',
      txnId: 'authUserGetByCon'
    },

    authUserDelete: {
      url: baseUrlSystem,
      action: 'authUserDelete',
      txnId: 'authUserDelete'
    },

    authUserPreservation: {
      url: baseUrlSystem,
      action: 'authUserPreservation',
      txnId: 'authUserPreservation'
    },

    cardTypePreservation: {
      url: baseUrlSystem,
      action: 'cardTypePreservation',
      txnId: 'cardTypePreservation'
    },

    cardTypeGetByCon: {
      url: baseUrlSystem,
      action: 'cardTypeGetByCon',
      txnId: 'cardTypeGetByCon'
    },

    cardTypeDelete: {
      url: baseUrlSystem,
      action: 'cardTypeDelete',
      txnId: 'cardTypeDelete'
    },

    memberQueryByCon: {
      url: baseUrlSystem,
      action: 'memberQueryByCon',
      txnId: 'memberQueryByCon'
    },

    memberSave: {
      url: baseUrlSystem,
      action: 'memberSave',
      txnId: 'memberSave'
    },

    memberDelete: {
      url: baseUrlSystem,
      action: 'memberDelete',
      txnId: 'memberDelete'
    },
  },

  resp: {
    success: {
      code: '0000',
      desc: '交易成功'
    },
  }
};
