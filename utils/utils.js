
// 显示加载中弹框
export const showToast = (title) => {
    return new Promise((resolve, reject) => {
        wx.showToast({
            title,
            icon: 'none',
            success: resolve
        });
    })
}

// 隐藏加载弹框

export const hideToast = () => {
    return new Promise(() =>{
        wx.hideToast();
    } )
}

// 停止下拉刷新

export const stopRefresh =() => {
    return new Promise(() => {
        wx.stopPullDownRefresh();
    })
}

// 显示加载中弹框
export const showSuccessToast = (title) => {
    return new Promise((resolve, reject) => {
        wx.showToast({
            title,
            icon: 'success',
            success: resolve
        });
    })
}

/**
 * 登录
 */

 export const login = () => {
     return new Promise(resolve => {
         wx.login({
             timeout:10000,
             success: resolve
         });
     })
 }

 /**
  * 
  * 查看历史订单
  */