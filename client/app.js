//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')

App({
  onLaunch: function () {
    wx.cloud.init({
      env: 'dev-c0e7a2'
    });

    wx.cloud.callFunction({
      name: 'pagination',
      data: {
        offset:1,
        size: 5
      },
      complete: res => {
        console.log('callFunction test result: ', res)
      }
    })
  },
  globalData: {
    userInfo: null
  }
})