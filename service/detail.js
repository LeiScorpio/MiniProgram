import request from './network'
// 1.封装一个请求详情页数据的方法
export function getDetail(iid) {
  return request({
    url: '/detail',
    data: {
      iid
    }
  })
}
// 1.封装一个请求推荐商品数据的方法
export function getRecommends() {
  return request({
    url: '/recommend'
  })
}
// 商品基本信息
export class GoodsBaseInfo {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.newPrice = itemInfo.price
    this.oldPrice = itemInfo.oldPrice
    this.discount = itemInfo.discountDesc
    this.columns = columns
    this.services = services
    
    this.realPrice = itemInfo.lowNowPrice
  }
}
// 店铺信息
export class ShopInfo {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods
  }
}
// 商品参数信息
export class ParamInfo {
  constructor(info, rule) {
    // 注: images可能没有值(某些商品有值, 某些没有值)
    this.image = info.images ? info.images[0] : '';
    this.infos = info.set;
    this.sizes = rule.tables;
  }
}