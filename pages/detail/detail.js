// pages/detail/detail.js
import {
  getDetail,
  getRecommends,
  GoodsBaseInfo,
  ShopInfo,
  ParamInfo
} from '../../service/detail.js'

const app = getApp()
const distanceTop = 1000

Page({
  data: {
    iid: '',
    topImages: [],
    baseInfo: {},
    shopInfo: {},
    detailInfo: {},
    paramInfo: {},
    commentInfo: {},
    recommends: [],
    isShowBackTop: false
  },
  onLoad: function (options) {
    const iid = options.iid
    this.setData({
      iid: iid
    })
  },
  onReady: function () {
    // 调用请求详情页数据的方法
    this.getDetailNet(this.data.iid)
    // 调用请求详情页推荐数据的方法
    this.getRecommendsNet()
  },
  // ------------------------------------事件处理函数-------------------------
  // 监听点击加入购物车
  addToCart() {
    // 1.获取当前商品数据对象
    const obj = {}
    obj.iid = this.data.iid;
    obj.imageURL = this.data.topImages[0];
    obj.title = this.data.baseInfo.title;
    obj.desc = this.data.baseInfo.desc;
    obj.price = this.data.baseInfo.realPrice;

    // 2.加入到购物车列表
    app.addToCart(obj)
    // 3.加入成功提示
    wx.showToast({
      title: '加入购物车成功',
    })
  },
  // ------------------------------------网络请求函数-------------------------
  // 1.封装一个请求详情页数据的方法
  getDetailNet(iid) {
    getDetail(iid).then(res => {
      const data = res.data.result
      // 1.取出顶部轮播图的图片
      const topImages = data.itemInfo.topImages

      // 2.创建BaseInfo对象
      const baseInfo = new GoodsBaseInfo(data.itemInfo, data.columns, data.shopInfo.services)

      // 3.创建ShopInfo对象
      const shopInfo = new ShopInfo(data.shopInfo);

      // 4.获取detailInfo信息
      const detailInfo = data.detailInfo;

      // 5.创建ParamInfo对象
      const paramInfo = new ParamInfo(data.itemParams.info, data.itemParams.rule)

      // 6.获取评论信息
      let commentInfo = {}
      if (data.rate && data.rate.cRate > 0) {
        commentInfo = data.rate.list[0]
      }
      // 将获取的数据存储起来
      this.setData({
        topImages: topImages,
        baseInfo: baseInfo,
        shopInfo: shopInfo,
        detailInfo: detailInfo,
        paramInfo: paramInfo,
        commentInfo: commentInfo
      })
    })

  },
  // 2.封装一个调用请求详情页推荐数据的方法
  getRecommendsNet() {
    getRecommends().then(res => {
      this.setData({
        recommends: res.data.data.list
      })
      res.data.data.list
    })
  },
  onPageScroll(options) {
    const scrollTop = options.scrollTop
    // 官方提示不要在滚动的回调函数潘帆的调用this.setData
    const flag = scrollTop >= distanceTop
    if (flag != this.data.isShowBackTop) {
      this.setData({
        isShowBackTop: scrollTop >= distanceTop
      })
    }
  }
})