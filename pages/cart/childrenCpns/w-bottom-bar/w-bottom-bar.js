// pages/cart/childrenCpns/w-bottom-bar/w-bottom-bar.js
Component({
  properties: {
    allSelected: {
      type: Boolean,
      value: true
    },
    price: {
      type: Number
    },
    counter: {
      type: Number
    }
  },
  data: {

  },
  methods: {
    // 监听全选按钮点击
    allSelectClick() {
      this.triggerEvent('allSelectClick', {}, {})
    }
  }
})