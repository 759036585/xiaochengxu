import {showToast} from '../../utils/utils'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 存放地址信息
    address: {},
    address_str: "",
    cartData: [],
    // 商品是否为选中
    allChecked:true,
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
  // 获取地址
  getAddress() {
    wx.getSetting({
      success: (result)=>{
        console.log(result)
        const scopeAddress = result.authSetting["scope.address"];
        if(scopeAddress === true || scopeAddress === undefined) {
          wx.chooseAddress({
            success: (result)=>{
              this.setData({
                address: result
              });
              wx.setStorageSync('address', result);
            }
          });
        }else{
          wx.openSetting({
            success: (result)=>{
            }
          });
        }        
      }
    });
  
  },
  getCartData() {
    let cartData = wx.getStorageSync('cart') || [];
    this.setCart(cartData)
  },
  // 点击切换选中状态
  handleCheckChange(e) {
    let {cartData} = this.data;
    let id = e.currentTarget.dataset.id;
    let index = cartData.findIndex(v => v.goods_id === id);
    cartData[index].checked = !cartData[index].checked;
    this.setCart(cartData)
  },
  setCart(cart) {
    let newChecked = true;
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
    newChecked = cart.length > 0 ? newChecked : false;
    this.setData({
      cartData: cart,
      totalPrice,
      totalNum,
      allChecked: newChecked
    })
    wx.setStorageSync('cart', cart);
  },

  // 全选状态
  handleAllCheck() {
    let {allChecked,cartData} = this.data;
    cartData.forEach(v => {
      v.checked = !allChecked;
    })
    this.setData({
      cartData,
      allChecked : !allChecked
    })
    this.setCart(cartData)
  },
  changeNum(e) {
    let {cartData} = this.data;
    let {operation,id} = e.currentTarget.dataset;
    let index = cartData.findIndex(v => v.goods_id ===id);
    if(operation === -1){
      cartData[index].goods_num += operation;
      if(cartData[index].goods_num < 1) {
        wx.showModal({
          title: '提示',
          content: '是否要删除该商品',
          success: (result) => {
            if(result.confirm){
              cartData.splice(index,1);
              this.setCart(cartData);
            }
          },
          fail: ()=>{},
          complete: ()=>{}
        });
        return false
      }
    }else{
      cartData[index].goods_num += operation;
    }
    this.setCart(cartData);
  },
  // 跳转支付页面
  async handlePay() {
    let {address,cartData} = this.data;
    if(!address.userName) {
      await showToast('还没有添加收货地址');
      return;
    }
    let cart = cartData.filter(v => v.checked)
    if( cart.length === 0){
      await showToast('还没有添加购物商品');
      return;
    }
    wx.setStorageSync('cartpay',cart);
    wx.navigateTo({
      url: '/pages/pay/index'
    });
  }
});