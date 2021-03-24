// pages/category/childrenCpns/w-category-menu/w-category-menu.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    categoryInfo: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentIndex: 0

  },

  /**
   * 组件的方法列表
   */
  methods: {
    menuItemClick(event) {
      const currentIndex = event.currentTarget.dataset.index
      this.setData({
        currentIndex: currentIndex
      })
      // 发出一个事件，并将传递currentIndex
      this.triggerEvent('menuClick', {currentIndex}, {})
    }

  }
})
