const WeCropper = require('../../../thrid/we-cropper.min.js');
const device = wx.getSystemInfoSync()
const width = device.windowWidth;
const height = device.windowHeight;

Page({
  /**
   * 页面的初始数据
   */
  data: {
    choose: false,
    cropperOpt: {
      id: 'cropper',
      width,
      height:height-3,
      scale: 2.5,
      zoom: 8,
      cut: {
        x: 15,
        y: 2,
        width: width-30,
        height: height - 30
      }
    }
  },
  onLoad: function () {
    const { cropperOpt } = this.data
    new WeCropper(cropperOpt)
      .on('ready', (ctx) => {
        console.log(`wecropper is ready for work!`)
      })
      .on('beforeImageLoad', (ctx) => {
        console.log(`before picture loaded, i can do something`)
        console.log(`current canvas context:`, ctx)
        wx.showToast({
          title: '上传中',
          icon: 'loading',
          duration: 20000
        })
      })
      .on('imageLoad', (ctx) => {
        console.log(`picture loaded`)
        console.log(`current canvas context:`, ctx)
        wx.hideToast()
      })
      .on('beforeDraw', (ctx, instance) => {
        console.log(`before canvas draw,i can do something`)
        console.log(`current canvas context:`, ctx)
      })
      .updateCanvas();
  },
  touchStart(e) {
    this.wecropper.touchStart(e)
  },
  touchMove(e) {
    this.wecropper.touchMove(e)
  },
  touchEnd(e) {
    this.wecropper.touchEnd(e)

  },
  
  chooseimage: function () {
    let _this = this;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#EA6F5A",
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            _this.chooseWxImage('album')
          } else if (res.tapIndex == 1) {
            _this.chooseWxImage('camera')
          }
        }
      }
    })
  },

  chooseWxImage: function (type) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      success: function (res) {
        that.setData({
          choose: true,
          cutImage: 'show',
          addtribeConShow: 'hide'
        });
        that.wecropper.pushOrign(res.tempFilePaths[0]);
      }
    })
  },

  getCropperImage:function() {
    let that = this;
    this.wecropper.getCropperImage((src) => {
      let choose = that.data.choose;
      if (src) {
        if (choose) {
          let pages = getCurrentPages();//当前页面
          let prevPage = pages[pages.length - 2];//上一页面
          prevPage.setData({//直接给上移页面赋值
            logo: src,
          });
        }

        wx.navigateBack({
          delta: 1
        })
      }
    });
  }
})