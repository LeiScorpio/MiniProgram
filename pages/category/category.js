// pages/category/category.js
import {
  getCategory,
  getSubCategory,
  getCategoryDetail
} from "../../service/category.js";
Page({
  //  页面的初始数据
  data: {
    // 左侧分类数据
    categoryInfo: [],
    // 右侧分类数据
    categoryDeatil: [],
    // 右侧推荐商品数据
    categoryRecommend: [],
    // 当前索引
    currentIndex: 0,
    currentMaitKey: 3627,
    currentMiniWallkey: 10062603
  },
  // 生命周期函数--监听页面加载
  onLoad: function (options) {
    // 调用请求左侧分类栏数据的方法
    this.getCategoryNet()
    // 调用请求右侧详细分类数据的方法
    this.getSubCategoryNet(this.data.currentMaitKey)
    // 调用请求右侧推荐商品数据的方法
    this.getCategoryDetailNet(this.data.currentMiniWallkey)
  },
  // ------------------------事件处理函数-------------------------
  // 监听目录点击事件
  menuClick(e) {
    const index = e.detail.currentIndex
    // 取得maitKey值
    const maitKey = this.data.categoryInfo[index].maitKey
    // 取得miniWallkey值
    const miniWallkey = this.data.categoryInfo[index].miniWallkey
    // 将index保存起来
    this.setData({
      currentIndex: index,
      currentMaitKey: maitKey,
      currentMiniWallkey: miniWallkey
    })
    // 调用请求右侧详细分类数据的方法更新右侧数据
    this.getSubCategoryNet(this.data.currentMaitKey)
    // 调用请求右侧推荐商品数据的方法更新右侧数据
    this.getCategoryDetailNet(this.data.currentMiniWallkey)
  },
  // ------------------------网络请求方法-------------------------
  // 定义请求左侧分类栏数据的方法
  getCategoryNet() {
    getCategory().then(res => {
      this.setData({
        // 存储左侧列表信息
        categoryInfo: res.data.data.category.list
      })
    })
  },
  // 定义请求右侧详细分类数据的方法
  getSubCategoryNet(maitKey) {
    getSubCategory(maitKey).then(res => {
      const categoryDeatil = res.data.data.list
      this.setData({
        categoryDeatil: categoryDeatil
      })
    })
  },
  // 定义请求右侧推荐商品数据的方法
  getCategoryDetailNet(miniWallkey) {
    getCategoryDetail(miniWallkey).then(res => {
      const categoryRecommend = res.data
      this.setData({
        categoryRecommend: categoryRecommend
      })
    })
  }
})