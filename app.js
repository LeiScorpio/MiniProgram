// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: null,
    cartList: []
  },
  addToCart(obj) {
    // 1.判断是否已经添加进来
    const oldInfo = this.globalData.cartList.find((item) => item.iid === obj.iid)
    if (oldInfo) {
      oldInfo.count += 1
    } else {
      obj.count = 1
      obj.checked = true
      this.globalData.cartList.push(obj)
    }
    // 2.购物车回调，刷新购物车页面
    if (this.addCartCallback) {
      this.addCartCallback()
    }
  },
  deleteFromCart(index) {
    this.globalData.cartList.splice(index,1)
    // 2.购物车回调
    if (this.addCartCallback) {
      this.addCartCallback()
    }
  }
})