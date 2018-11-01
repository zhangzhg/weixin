const util = require('../../utils/util.js');
//获取应用实例
const app = getApp();

Page({
  data: {
    hasData: false,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../map/map'
    })
  },
  onLoad: function () {
    let user = wx.getStorageSync('user');
    console.log('user',user);
    if (user && user.userInfo) {
      this.setData(user);
    } else {
      this.setData({
        hasUserInfo: false
      });
    }
  },

  onShow: function() {
    this.getData();
  },

  getData: function() {
    const now = new Date();
    let date = util.formatDate(now, 'MM-dd');
    let arr = new Array();   
    let infos = wx.getStorageSync('infos');

    let end;
    if (infos) {
      let size = infos.length;
      for (let i=0; i<size; i++) {
        let d1 = infos[i].date.substring(5);
        if (arr.length <= 5) {
          end = this.getDis(now, date, d1);
          infos[i].end = end;
          arr.push(infos[i]);
        }
      }

      if (arr.length == 0 && size > 0) {
        let d1 = infos[0].date.substring(5);
        end = this.getDis(now, date, d1);
        infos[0].end = end;
        arr.push(infos[0]);
      }

      if (arr.length > 0) {
        this.setData({
          arr: arr,
          hasData: true
        });
      }
    } 
  },
  getDis: function (d1,date,d2) {
    let y = d1.getFullYear();
    if (date > d2) {
        y = y+1;
    }
    d2 = y + '-' + d2;
    return d2;
  }, 
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo;
    let user = {
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    };

    this.setData(user);
    wx.setStorageSync('user', user);
  }
})
