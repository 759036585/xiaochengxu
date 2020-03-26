
import { sySwiperdata,syCatitems,syFloorDate} from '../../api/shouye'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 存放轮播图数据
    swiperData: [],
    // 存放导航栏数据
    catItemsData: [],
    // 存放楼层数据
    floorData: [],
    //回到顶部按钮状态
    isHidden: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSwiperData();
    this.getCatItemsData();
    this.getFloorData();
  },

  // 获取轮播图数据
  async getSwiperData() {
    let res = await sySwiperdata();
    let swiperData  = res.message;
    this.setData({
      swiperData
    })
  },

  // 获取导航栏数据
  async getCatItemsData() {
    let res = await syCatitems();
    let catItemsData = res.message;
    this.setData({
      catItemsData
    })
  },
  // 点击导航跳转方法
  handleDaohang(e) {
    let {index} = e.currentTarget.dataset;
    let {catItemsData} = this.data;
    let i = catItemsData.findIndex((v,i) => v.open_type && i === index);
    if(i > -1) {
      wx.switchTab({
        url: '/pages/category/index'
      });
    }else{
      wx.showToast({
        title: '对不起,该页面无数据',
        icon: 'none',
      });
    }
  },

  // 获取楼层数据
  async getFloorData() {
    let res = await syFloorDate();
    let floorData = res.message;
    this.setData({
      floorData
    })
  },

  // 监听页面滚动
  onPageScroll(e) {
    let {isHidden} = this.data;
    if(e.scrollTop >=300) {
      this.setData({
        isHidden: false
      })
    }else{
      this.setData({
        isHidden: true
      }) 
    }
  },
  // 点击回到顶部
  toTop() {
    wx.pageScrollTo({
      scrollTop:0,
      duration: 300
    })
  }
})