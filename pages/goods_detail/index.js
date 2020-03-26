import { getGoodsDetail } from '../../api/category'
import {showSuccessToast} from '../../utils/utils.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 存放商品信息数据
    GoodsDetailList: {},
    // 商品id
    goods_id: null,
    // 轮播图数据
    swiperList: [],
   
  },
 // 购物车商品信息对象数据
//  cartList: {},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let {goods_id} = options
    this.setData({
      goods_id
    })
    this.getGoodsDetail();

  },

  // 获取商品信息数据
  async getGoodsDetail() {
    let {goods_id} = this.data;
    let res = await getGoodsDetail(goods_id);
    this.setData({
      GoodsDetailList: res.message,
      swiperList: res.message.pics
    })
  },
  // 添加购物车
  async handleAddCart() {
    let {GoodsDetailList} = this.data;
    // console.log(GoodsDetailList)
    let cartList = {
      goods_id: GoodsDetailList.goods_id,
      goods_name: GoodsDetailList.goods_name,
      goods_small_logo: GoodsDetailList.goods_small_logo,
      goods_price: GoodsDetailList.goods_price,
      goods_num: 1,
      checked: true
    }
    // 获取本地缓存数据
    let cart = wx.getStorageSync('cart') || [];
    let result = cart.find(v => v.goods_id === cartList.goods_id);
    if(result) {
      result.goods_num++;
    }else{
    cart.push(cartList)
    }
    // 添加本地缓存
    wx.setStorageSync('cart', cart);
    await showSuccessToast('加入购物车成功');
  },
  // 跳转到购物车
  handleToCart() {
    wx.switchTab({
      url: '/pages/cart/index'
    });
  },

  // 轮播图片预览
  imageChange(e) {
    let urls = this.data.swiperList.map(v => v.pics_mid);
    let current = e.currentTarget.dataset.url;
    wx.previewImage({
      current,
      urls,
      success: (result)=>{
      }
    });
  }
})