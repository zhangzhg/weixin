let Api = require('../../api/ajax.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    arr:null,
    height:null,
    totalMoney:0,
    basket:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const device = wx.getSystemInfoSync()
    const height = device.windowHeight;

    let that = this;
    Api.ajax(Api.fn.products).then((d) => {
      that.setData({
        arr: d.data,
        height: height-40
      });
    });
  },

  load: function() {
    let that = this;
    let arr = this.data.arr;
    Api.ajax(Api.fn.products).then((d) => {
      arr = arr.concat(d.data);
      that.setData({
        arr: arr
      });
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  viewItems: function() {
    let basket = this.data.basket;
    if (basket && basket.length) {
      wx.navigateTo({
        url: '/pages/basket/index',
      })
    }
  },

  publish: function(e) {
    let item = e.target.dataset.item;
    let arr = this.data.arr;
    let basket = this.data.basket ? this.data.basket:new Array();

    for (let i in arr) {
      let it = arr[i];
      if (it.id == item.id) {
        it.count = (it.count ? it.count : 0) + 1;   
        let exists = false;
        for (let j=0; j<basket.length; j++) {
          if (it.id == basket[j].id) {
            exists = true;
            break;
          }
        }
        if (!exists) {
          basket.push(it);   
        }
     
        break;
      }
    }

    let totalMoney = 0;
    basket.forEach((it, idx) => {
      totalMoney += it.price;
    });

    this.setData({
      arr: arr,
      basket: basket,
      totalMoney: totalMoney,
      count: basket.length
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})