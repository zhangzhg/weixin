// pages/map/map.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scale:14,
    markers: [{
      iconPath: "/resources/location.png",
      id: 0,
      width: 20,
      height: 30
    }],
    controls: [{
      id: 1,
      iconPath: '/resources/1.jpg',
      position: {
        left: 10,
        top: 300 - 30,
        width: 20,
        height: 20
      },
      clickable: true
    }, {
        id: 2,
        iconPath: '/resources/2.jpg',
        position: {
          left: 30,
          top: 300 - 30,
          width: 20,
          height: 20
        },
        clickable: true
      }]
  },
  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e.markerId)
  },
  controltap(e) {
    if (e.controlId === 1) {
      this.setData({
        scale: --this.data.scale
      })
    } else {
      this.setData({
        scale: ++this.data.scale
      })
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success(res) {
        _this.setData({
          latitude: res.latitude,
          longitude: res.longitude
        });

        let markers = _this.data.markers;
        markers[0].latitude = res.latitude;
        markers[0].longitude = res.longitude;

        _this.setData({
          markers: markers
        });
      }
    });
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