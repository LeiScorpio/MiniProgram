import request from './network.js'
// 1.请求轮播图以及推荐数据的方法
export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })
}
// 2.请求商品数据
export function getGoodsData(type, page) {
  return request({
    url: '/home/data',
    data: {
      type,
      page
    }
  })
}