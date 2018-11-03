//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')

App({
  onLaunch: function () {
    wx.cloud.init({
      env: 'dev-c0e7a2'
    }); 
  },
  globalData: {
    userInfo: null,
    subDomain: "tz"
  }
})