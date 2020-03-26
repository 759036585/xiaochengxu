
const baseUrl = 'http://api-hmugo-web.itheima.net/api/public/v1';
function fetch(options){
    return new Promise((resolve,reject) => {
        wx.request({
            url: baseUrl+options.url,
            data: options.data || {},
            header: options.header || {},
            method: options.method || 'POST',
            success: (result) => {
                resolve(result)
            },
            fail: (error) => {
                reject(error)
            },
        });
    })
}

export const getToken = (data) => {
    return fetch({
        url: '/users/wxlogin',
        data
    })
} 

export const my_ordersCreate = (data,header) => {
    return fetch({
        url: '/my/orders/create',
        data,
        method: 'GET',
        header: {
            Authorization: header
        }
    })
}

 /**
  * 
  * 查看历史订单
  */

 export const ordersAll = (data,header) =>{
    return fetch({
        url: '/my/orders/all',
        data,
        method: 'GET',
        header: {
            Authorization: header
        }
    })
  }