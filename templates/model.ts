
//必须包含字段id
module.exports = [{
  filepath: '/login/',
  model: [{
      functionname: 'getLogin',
      req:'getLoginReq',
      res: 'defaultEnums',
      type: 'get',
      url: '/login',
      controllers: {

      }
    },
    {
      functionname: 'postLogin',
      res: 'defaultEnums',
      type: 'post',
      url: '/login',
    }]
}]

