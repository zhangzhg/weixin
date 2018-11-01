// pages/contact/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let infos = wx.getStorageSync('infos');
    if (infos) {
      this.setData({
        infos: infos,
      });
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  remove: function(e) {
    let id = e.currentTarget.dataset.id;
    let infos = wx.getStorageSync('infos');
    let that = this;

    for (var i = 0; i < infos.length; i++) {
      let info = infos[i];
      if (info.id == id) {
        infos.splice(i, 1);
        break;
      }
    }

    wx.setStorageSync('infos', infos);
    if (infos.length) {
      this.onLoad();
    } else {
      wx.navigateBack({
        delta: 1
      })
    }
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