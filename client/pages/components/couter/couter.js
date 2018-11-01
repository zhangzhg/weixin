// pages/components/couter/couter.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    date: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    countDownDay: 0,
    countDownHour: 0,
    countDownMinute: 0,
    countDownSecond: 0
  },

  ready: function() {
    var endDate = new Date(this.data.date.replace(/-/g, "/"));
    let timestamp = endDate.getTime();
    let totalSecond = (timestamp - Date.parse(new Date())) / 1000;
    if (totalSecond <= 0) {
      this.setData({
        countDownDay: '00',
        countDownHour: '00',
        countDownMinute: '00',
        countDownSecond: '00',
      });
    }
    let interval = setInterval(function () {
      // 秒数
      let second = totalSecond;

      // 天数位
      let day = Math.floor(second / 3600 / 24);
      let dayStr = day.toString();
      if (dayStr.length == 1) dayStr = '0' + dayStr;

      // 小时位
      let hr = Math.floor((second - day * 3600 * 24) / 3600);
      let hrStr = hr.toString();
      if (hrStr.length == 1) hrStr = '0' + hrStr;

      // 分钟位
      let min = Math.floor((second - day * 3600 * 24 - hr * 3600) / 60);
      let minStr = min.toString();
      if (minStr.length == 1) minStr = '0' + minStr;

      // 秒位
      let sec = second - day * 3600 * 24 - hr * 3600 - min * 60;
      let secStr = sec.toString();
      if (secStr.length == 1) secStr = '0' + secStr;

      this.setData({
        countDownDay: dayStr,
        countDownHour: hrStr,
        countDownMinute: minStr,
        countDownSecond: secStr,
      });
      totalSecond--;
      if (totalSecond < 0) {
        clearInterval(interval);
        this.setData({
          countDownDay: '00',
          countDownHour: '00',
          countDownMinute: '00',
          countDownSecond: '00',
        });
      }
    }.bind(this), 1000);
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
