import request from '../utils/request.js';


/**
 * 首页轮播图接口
 */
export const sySwiperdata = ()=> {
    return request({
        url: '/home/swiperdata'
    })
}

/**
 * 首页导航接口
 */

export const syCatitems = ()=> {
    return request({
        url: '/home/catitems'
    })
}

/**
 * 首页楼层接口
 */
export const syFloorDate = ()=> {
    return request({
        url: '/home/floordata'
    })
}