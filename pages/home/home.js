// pages/home/home.js
// 导入封装的网络请求的方法
import {
  getHomeMultidata,
  getGoodsData
} from '../../service/home'
const distanceTop = 1000
Page({
  data: {
    // 轮播图数据
    banner: [],
    // 推荐数据
    recommend: [],
    titles: ['流行 ', '新款', '精选'],
    // 当前展示展示商品的类别
    currentType: 'pop',
    // 商品数据
    goods: {
      'pop': {
        page: 0,
        list: []
      },
      'new': {
        page: 0,
        list: []
      },
      'sell': {
        page: 0,
        list: []
      }
    },
    isShowBackTop: false,
    isTabControlFixed: false,
    tabScrollTop: 0
  },
  onLoad: function (options) {
    // 1.调用请求轮播图以及推荐数据的方法
    this.getHomeMultidataNet()
    // 1.调用请求商品数据的方法
    this.getGoodsDataNet('pop')
    this.getGoodsDataNet('new')
    this.getGoodsDataNet('sell')
  },
  // -----------------------事件处理函数-------------------------
  handleTabClick(event) {
    const index = event.detail.index
    // 修改currentType的值
    const types = Object.keys(this.data.goods)
    this.setData({
      currentType: types[index]
    })
  },
  handleImageLoad() {
    // 拿到tab-control的top值
    wx.createSelectorQuery().select('#tab-control').boundingClientRect(rect => {
      this.data.tabScrollTop = rect.top
    }).exec()
  },

  // --------------------网络请求相关方法---------------------------
  // 1.定义请求轮播图以及推荐数据的方法
  getHomeMultidataNet() {
    getHomeMultidata().then((res => {
      // 取出轮播图和推荐的数据
      const banner = res.data.data.banner.list
      const recommend = res.data.data.recommend.list
      // 存放数据
      this.setData({
        banner: banner,
        recommend: recommend
      })
    }))
  },
  // 1.定义请求商品数据的方法
  getGoodsDataNet(type) {
    // 获取页码
    const page = this.data.goods[type].page + 1
    // 发送网络请求
    getGoodsData(type, page).then((res) => {
      const list = res.data.data.list
      // 将数据放到对应type的list中
      const oldList = this.data.goods[type].list
      oldList.push(...list)

      const typeKey = `goods.${type}.list`
      const pageKey = `goods.${type}.page`
      this.setData({
        [typeKey]: oldList,
        [pageKey]: page
      })
      // this.getGoodsDataNet(this.data.currentType)
    })
  },

  // 生命周期函数--监听页面初次渲染完成
  onReady: function () {},

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

  // 页面相关事件处理函数--监听用户下拉动作
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // 上拉加载更多功能
    this.getGoodsDataNet(this.data.currentType)
  },
  // 监听页面滚动事件
  onPageScroll(options) {
    const scrollTop = options.scrollTop
    // 官方提示不要在滚动的回调函数潘帆的调用this.setData
    const flag = scrollTop >= distanceTop
    if (flag != this.data.isShowBackTop) {
      this.setData({
        isShowBackTop: scrollTop >= distanceTop
      })
    }
    // 修改isTabFixed属性
    const flag2 = scrollTop >= this.data.tabScrollTop
    if(flag2 !=this.data.isTabControlFixed) {
      this.setData({
        isTabControlFixed: flag2
      })
    }

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})