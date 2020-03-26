import { login } from '../../utils/utils'
import { getToken } from '../../utils/fetch'
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  async getUserInfo(e) {
    let {code} = await login();
    let {encryptedData, iv, rawData, signature} = e.detail;

    let token = await getToken({
        encryptedData, 
        iv, 
        rawData, 
        signature,
        code
    })
    console.log(token);
  }
})