// pages/category/childrenCpns/w-category-menu/w-category-menu.js
Component({
  properties: {
    categoryInfo: {
      type: Array,
      value: []
    }
  },
  data: {
    currentIndex: 0

  },
  methods: {
    menuItemClick(event) {
      const currentIndex = event.currentTarget.dataset.index
      this.setData({
        currentIndex: currentIndex
      })
      // 发出一个事件，并将传递currentIndex
      this.triggerEvent('menuClick', {
        currentIndex
      }, {})
    }
  }
})