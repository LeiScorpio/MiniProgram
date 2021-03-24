// pages/home/childrenCpns/w-recommend/w-recommend.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    recommendList: {
      type: Array,
      value: []
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    isLoad: false

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleImageLoad() {
      if(!this.data.isLoad) {
        this.triggerEvent('imageload')
        this.setData({
          isLoad: true
        })
      }
      
    }

  }
})
