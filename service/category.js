import request from "./network.js";
// 1.请求左侧分类栏数据的方法
export function getCategory() {
  return request({
    url: '/category'
  })
}
// 2.请求右侧详细分类数据的方法
export function getSubCategory(maitKey) {
  return request({
    url: '/subcategory',
    data: {
      maitKey
    }
  })
}
// 3.请求右侧推荐商品数据的方法
export function getCategoryDetail(miniWallkey) {
  return request({
    url: '/subcategory/detail',
    data: {
      miniWallkey,
    }
  })
}