
var timeAjax = 0;
function request(params) {
    timeAjax++;
    const baseURL = 'http://api-hmugo-web.itheima.net/api/public/v1';
    return new Promise((resolve,reject) => {
        wx.showLoading({
            title: 'Loading...',
            mask: true,
        });
        wx.request({
            ...params,
            url: baseURL + params.url,
            success: (result)=>{
                resolve(result.data);
            },
            fail: (error)=>{
                reject(error);
            },
            complete: ()=>{
                timeAjax--;
                if(timeAjax ===0){
                    wx.hideLoading();
                }
            }
        });
    })
}

export default request;