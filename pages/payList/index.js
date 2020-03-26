import {ordersAll} from '../../utils/fetch'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        name: '全部订单',
        isActive: true
      },
      {
        id: 1,
        name: '待付款',
        isActive: false
      }, {
        id: 2,
        name: '待收货',
        isActive: false
      },
      {
        id: 3,
        name: '退款/退货',
        isActive: false
      }
    ],
    // 所有订单数据
    ordersAllList: [],
    },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getOrdersAll()
  },
  handelTabs(e){
    let index = e.detail;
    let {tabs} = this.data;
    tabs.forEach(v => v.id === index ? v.isActive = true : v.isActive = false)
    this.setData({tabs})
    this.getOrdersAll(index)
  },
  async getOrdersAll(type){
    let token = wx.getStorageSync('token');
    const res = await ordersAll({type:1},token)
    console.log(res)
    res.data.message.orders.forEach(v => v.create_time = new Date(v.create_time * 1000).toLocaleString())
    this.setData({
      ordersAllList: res.data.message.orders
    })
  }
})