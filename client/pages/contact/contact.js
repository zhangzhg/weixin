// pages/contact/contact.js
const util = require('../../utils/util.js');

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    desc:'',
    logo: '/resources/bg.jpg',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this. resetId();
  },

  resetId: function() {
    let id = wx.getStorageSync('c_id');
    if (id) {
      id = id + 1;
    } else {
      id = 1;
    }
    wx.setStorageSync('c_id', id);

    let cId = "c_" + id;
    console.log(cId);
    this.setData({
      id: cId
    });
  },

  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    this.setData({
      time: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    const date = new Date();
    this.setData({
      date: util.formatDate(date, 'yyyy-MM-dd'),
      time: util.formatDate(date, 'HH:mm')
    })
  },

  formSubmit: function (e) {
    let data = e.detail.value;
    if (!data.name) {
      wx.showToast({
        title:'名称不能为空！'
      });
      return;      
    }

    if (!data.desc) {
      wx.showToast({
        title: '描述字段不能为空！'
      });
      return;
    }

    let infos = wx.getStorageSync('infos');
    if (!infos) {
      infos = new Array();   
    } 
    data.src = this.data.logo;
    infos.push(data);
    infos.sort(this.sortData);

    wx.setStorageSync('infos', infos);

    wx.showToast({
      title: '添加成功！',
      success: () => {
        this.resetId();
        this.setData({
          name: '',
          logo: '/resources/bg.jpg'
        })
      }
    });
  },

  sortData: function(a, b) {
    let d1 = a.date.substring(5);
    let d2 = b.date.substring(5);

    if (d1 >d2) {
      return 1;
    } else {
      return -1;
    }
  },

  chooseImageTap: function () {
    wx.navigateTo({
      url: 'choose/choose'
    });
  },

  list: function() {
    wx.navigateTo({
      url: 'list/list'
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