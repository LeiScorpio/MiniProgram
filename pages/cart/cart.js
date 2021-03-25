// pages/cart/cart.js
const app = getApp()
Page({
  data: {
    cartList: [],
    isSelectAll: true,
    totalPrice: 0,
    totalCounter: 0
  },
  onLoad: function (options) {
    this.setData({
      cartList: app.globalData.cartList
    })
    // app的回调函数，监听点击加入购物车，随时更新数据
    app.addCartCallback = () => {
      this.setData({
        cartList: app.globalData.cartList
      })
      // 获取购物车中checked属性为true的商品数组
      const checkList = app.globalData.cartList.filter(item => item.checked)
      this.setData({
        totalCounter: checkList.length
      })
      //  获取选中的商品的总价
      const totalPrice = checkList.reduce((preValue, item) => {
        return preValue + (item.count * item.price)
      }, 0)
      this.setData({
        totalPrice: totalPrice
      })
    }
  },
  // ----------------------------事件处理函数----------------------
  // 监听删除按钮的点击
  deleteClick(e) {
    // 获取要删除的购物车商品的index
    const index = e.detail.index
    app.deleteFromCart(index)
  },
  // 监听单品复选框的点击
  changeChecked(e) {
    const currentIid = e.detail.iid
    // 1.查找到对应的商品
    const currentGoods = app.globalData.cartList.find(item => item.iid == currentIid)
    // 将状态取反
    currentGoods.checked = !currentGoods.checked
    // 判断是否还有为选中的
    const flag = app.globalData.cartList.some(item => item.checked == false)
    // 更改全选按钮的状态
    this.setData({
      isSelectAll: !flag
    })
    // 刷新购物车
    if (app.addCartCallback) {
      app.addCartCallback()
    }
  },
  // 监听全选按钮的点击
  allSelectClick() {
    // 如果当前是全选状态，点击就应该把所有商品的check属性变成false
    if (this.data.isSelectAll) {
      app.globalData.cartList.forEach(item => {
        item.checked = false
      })
    } else {
      app.globalData.cartList.forEach(item => {
        item.checked = true
      })
    }
    // 把当前全选状态取反
    this.setData({
      isSelectAll: !this.data.isSelectAll
    })
    // 刷新购物车
    app.addCartCallback()
  },
  onShow: function () {
    // 刷新列表
    app.addCartCallback()
  },
  onShareAppMessage: function () {

  }
})