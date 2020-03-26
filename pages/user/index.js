import {showToast} from '../../utils/utils'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 存放用户信息
    userInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let UserInfo = wx.getStorageSync('userInfo');
    this.setData({userInfo:UserInfo});
  },
  async getUserInfo(e) {
    let {userInfo} = e.detail;
    wx.setStorageSync('userInfo', userInfo);
    this.setData({userInfo});
    await showToast('登录成功')
  }
})