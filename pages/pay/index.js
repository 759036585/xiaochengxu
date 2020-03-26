import {showToast} from '../../utils/utils'
import {my_ordersCreate} from '../../utils/fetch'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 存放地址信息
    address: {},
    address_str: "",
    cartData: [],
    // 总价格
    totalPrice: 0,
    // 总数量
    totalNum: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  onShow: function() {
    this.getCartData();
    let address = wx.getStorageSync('address');
    let address_str = address.provinceName+address.cityName+address.countyName+address.detailInfo;
    this.setData({
      address,
      address_str
    })
  },
  getCartData() {
    let cartData = wx.getStorageSync('cartpay') || [];
    this.setCart(cartData)
  },
  setCart(cart) {
    let totalPrice = 0;
    let totalNum = 0 ;
    cart.forEach(v => {
      if(v.checked){
        totalPrice += v.goods_num * v.goods_price;
        totalNum += v.goods_num;
      }else{
        newChecked = false;
      }
    });
    this.setData({
      cartData: cart,
      totalPrice,
      totalNum
    })
  },

  // 支付
  async handelPay() {
    const token = wx.getStorageSync('token');
    if(!token){
      console.log('没有token')
      wx.navigateTo({
        url: '/pages/auth/index'
      });
    }

    // 开始创建订单
    let order_price = this.data.totalPrice;
    let consignee_addr = this.data.address_str;
    let goods = this.data.cartData.map(v => {
      return {
        goods_id : v.goods_id,
        goods_number : v.goods_num,
        goods_price : v.goods_price
      }
    })
    const res = await my_ordersCreate({
      order_price,
      consignee_addr,
      goods
    },token)
    console.log(res);
  }
});