let Mock = require('../utils/mock.js');

let API_HOST = "http://zhangzhg.oss-cn-hangzhou.aliyuncs.com/";
let DEBUG = true;//切换数据入口

function ajax(fn, method = "get", header = {}) {
    // 模拟数据
  return fn();
}

let Fn = {
  products: function() {
    var promise = new Promise((resolve, reject) => {
      let res = Mock.mock({
        'data|10': [{
          'id|+1': 1,
          'tag|1':['火热！', '新!', ''],
          'imageURL': API_HOST +'@integer(1,5).jpg',
          'desc': "@ctitle(3,8)",
          'title': '@ctitle(3,8)',
          'num': '@integer(0,100)',//库存数量  
          'price': '@integer(100,2000)',//现价，单位：分  
        }]
      });

      //console.log(JSON.stringify(res));
      resolve(res);
    });

    return promise;
  }
}

module.exports = {
  ajax: ajax,
  fn: Fn
}