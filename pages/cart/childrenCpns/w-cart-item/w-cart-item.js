// pages/cart/childrenCpns/w-cart-item/w-cart-item.js
const app = getApp()
Component({
  properties: {
    listItem: {
      type: Object,
      value: {}
    },
    index: {
      type: Number
    }
  },
  data: {},
  methods: {
    // 监听删除事件
    deleteClick() {
      this.triggerEvent('deleteClick', {
        index: this.properties.index
      }, {})
    },
    // 监听单品复选框点击事件
    onCheckClick() {
      this.triggerEvent('checkedClick', {
        iid: this.properties.listItem.iid
      }, {})
    }
  }
})