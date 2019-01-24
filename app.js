//app.js
App({
  globalData: {},
  appStorageObject: [],
  onLaunch() {
    var _this = this;
    const deviceInfo = wx.getStorageSync('deviceInfo');
    if (!deviceInfo) {
      wx.getSystemInfo({
        success(res) {//获取页面宽高度
          _this.globalData.windowWidth = res.windowWidth;
          _this.globalData.windowHeight = res.windowHeight;
          wx.setStorageSync('deviceInfo', {
            windowWidth: res.windowWidth,
            windowHeight: res.windowHeight
          });
        }
      });
    } else {
      _this.globalData.windowWidth = deviceInfo.windowWidth;
      _this.globalData.windowHeight = deviceInfo.windowHeight;
    }
  }
})