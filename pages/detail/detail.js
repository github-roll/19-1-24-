const header = require('../../components/header/header.js');
const data = Object.assign({}, header.data, {
  address: '点击选择，要勾选哦~',
  type: '',
  message: '',
  content: ''
});
const config = Object.assign({}, header, {
  data: data,
  onLoad(options) {
    options = JSON.parse(options.id);
    this.setData({
      address: options.address,
      type: options.localtionObject.type,
      message: options.localtionObject.message,
      content: options.localtionObject.content
    })
  }
});
Page(config);