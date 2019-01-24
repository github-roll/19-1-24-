//logs.js
const app = getApp();
Page({
  data: {
    address: '点击选择，要勾选哦~',
    localtionObject: {},
    success: false
  },
  onReady() {
  },
  localtionSuccess() {//地址
    var _this = this;
    wx.chooseLocation({
      success(res) {
        _this.setData({
          address: res.address,
          localtionObject: {
            latitude: res.latitude,
            longitude: res.longitude,
            type: 'sell'
          }
        })
      }
    })
  },
  localtionChange(e) {//类型
    this.data.localtionObject.type = e.detail.value;
  },
  localtionMessage(e) {//说明
    this.data.localtionObject.message = e.detail.value;
  },
  localtionContent(e) {//联系方式
    this.data.localtionObject.content = e.detail.value;
  },
  localtionSubmit() {//发布信息
    var address = this.data.address;
    if (address == '点击选择，要勾选哦~' || !address) {
      localtionToast('请填写地址');
      return;
    }
    if (!this.data.localtionObject.message || this.data.localtionObject.message == '') {
      localtionToast('请填写说明');
      return;
    }
    if (!this.data.localtionObject.content || this.data.localtionObject.content == '') {
      localtionToast('请填写联系方式');
      return;
    }
    function localtionToast(res) {//弹框
      wx.showToast({
        title: res,
        icon: 'none',
        duration: 2000
      })
    }
    //直接操作代替= =接口,存储到库中
    const arr = {
      address: this.data.address,
      localtionObject: this.data.localtionObject
    };
    app.appStorageObject.push(arr);//数组
    //添加id
    for (var i = 0; i  < app.appStorageObject.length; i++) {
      var w = i;
    }
    app.appStorageObject[w].localtionObject.id = w+1;
    wx.setStorageSync('publicData', app.appStorageObject);//缓存
    this.setData({//success页面
      success: true
    })
  },
  backhomeClick() {//返回首页
    wx.navigateBack();
  },
  onShareAppMessage(res) {//转发
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target);
    }
    return {
      title: '萌宠交易平台',
      path: '/pages/index/index'
    }
  }
})
