const app = getApp()
Page({
  data: {
    longitude: '',
    latitude: '',
    markers: [],
    markerIdobject: [],
    controls: [{//红标识
      iconPath: '/resources/pin.png',
      position: {
        left: (app.globalData.windowWidth / 2) - 11,
        top: ((app.globalData.windowHeight - 40) / 2) - 31,
        width: 22,
        height: 31
      }
    }, {//圆圈标识
        id: 1,
        iconPath: '/resources/center.png',
        position: {
          left: 20,
          top: app.globalData.windowHeight - 90,
          width: 30,
          height: 30
        },
        clickable: true
      }]
  },
  onShow() {//获取登录人当前位置
    var _this = this;
    wx.getLocation({
      type: 'gcj02',
      success(res) {
        _this.setData({
          longitude: res.longitude,
          latitude: res.latitude
        })
      }
    })
    this.getlocaltionQQ();
  },
  getlocaltionQQ() {
    var _this = this;
    wx.getStorage({//获取库里面的所有位置数据
      key: 'publicData',
      success(res) {
        // 点击小图标的data数据
        _this.setData({
          markerIdobject: res.data
        });
        // 给图标组件赋值
        const markers = res.data.map((value, index) => {
          return {
            iconPath: '/resources/' + value.localtionObject.type + '.png',
            id: value.localtionObject.id,
            latitude: value.localtionObject.latitude,
            longitude: value.localtionObject.longitude,
            width: 40,
            height: 40
          }
        });
        _this.setData({
          markers: markers
        })
      }
    })
  },
  onReady() {
    this.mapCtx = wx.createMapContext('map');//页面加载完成获取map的上下文
  },
  // 点击图标进入详情页
  localtionMarkerClick(e) {
    wx.navigateTo({
      url: '/pages/detail/detail?id='+JSON.stringify(this.data.markerIdobject[e.markerId - 1])
    });
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
  },
  controltap(e) {//点击圆圈回到当前位置
    this.mapCtx.moveToLocation();
  }
})
