Page({
  data: {
    list: []
  },
  searchInput: {
    value: ''
  },
  dataList: [],// push数组
  dataForlist: [],// 搜索
  onLoad() {
    wx.getStorage({//获取库里面的所有位置数据
      key: 'publicData',
      success: this.getsearchListObject.bind(this)
    });
  },
  getsearchListObject(res) {// 数据获取成功返回数据
    for (var i in res.data) {
      const address = res.data[i].address;
      // 区
      const area = address.split('区', 1);
      res.data[i].area = area[0].substr(area.length - 3) + '区';
      // 市
      const city = address.split('市', 1);
      res.data[i].city = city[0].substr(city.length - 3) + '市';
      // 省
      if (address.split('省', 1)) {
        const province = address.split('省', 1);
        res.data[i].province = province[0].substr(province.length - 3) + '省';
      } else {
        res.data[i].province = res.data[i].city.split('市', 1)[0] + '省';
      }
    }
    this.setData({
      list: res.data
    });
    this.dataList = this.data.list;
  },
  bindKeyInput(e) {// 文本框内容赋值
    this.searchInput.value = e.detail.value;
  },
  searchClick() {// 搜索
    const Inputvalue = this.searchInput.value;
    if (Inputvalue == '') {// 如果内容为空显示全部内容
      this.setData({
        list: this.dataList
      });
    } else {
      this.dataForlist = [];// 如果文本框有值每次搜索之前清空所有内容
      for (var i in this.dataList) {// 搜索所有内容是否包含文本框内容
        const messageIndexof = this.dataList[i].localtionObject.message;
        if (messageIndexof.indexOf(Inputvalue) != -1) {
          this.dataForlist.push(this.dataList[i]);
          this.setData({
            list: this.dataForlist
          });
        }
      }
    }
  },
  searchItemid(e) {// 详情页
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + JSON.stringify(this.data.list[e.currentTarget.id - 1]),
    });
  }
})