import request from '../utils/request.js'

/**
 * 
 * 获取分类管理接口
 */

 export const getCategoryData = () => {
    return request({
        url: '/categories'
    });
 }

 /**
  * 
  * 获取商品列表接口
  */

  export const getGoodsList = (cid, pagenum) => {
    return request({
        url: '/goods/search',
        data: {
          cid,
          pagenum,
          pagesize: 10
        }
        
    })
  }

  /**
   * 
   * 获取商品详情
   */

   export const getGoodsDetail = (goods_id) => {
     return request({
       url: '/goods/detail',
       data: {goods_id}
     })
   }