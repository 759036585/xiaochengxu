import {getCategoryData} from '../../api/category.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 存放分类管理数据
    CategoryLeftList: [],
    CategoryRightList: [],
    // 默认标题索引
    activeIndex: 0,
    scrollTop: 0
  },
  // 存放分类总数据
  CategoryList: [],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCategoryData();
  },

  // 获取分类管理数据
  async getCategoryData() {
    let local_storage = wx.getStorageSync('cates');
    if(local_storage) {
      let isTime = Date.now() - local_storage.time >= 1000*10
      if(isTime) {
        this.localStorageData();
      }else{
        this.CategoryList = local_storage.data;
        let {CategoryLeftList,CategoryRightList} = this.data;
        CategoryLeftList = this.CategoryList.map(v => v.cat_name);
        CategoryRightList = this.CategoryList[0].children;
        this.setData({
          CategoryLeftList,
          CategoryRightList
        })
      }
    }else{
     this.localStorageData();
    }
  },
  async localStorageData(){
    let result = await getCategoryData();
    this.CategoryList = result.message;
    let {CategoryLeftList,CategoryRightList} = this.data;
    CategoryLeftList = this.CategoryList.map(v => v.cat_name);
    CategoryRightList = this.CategoryList[0].children;
    this.setData({
      CategoryLeftList,
      CategoryRightList
    })
    wx.setStorageSync('cates', {
      data: result.message,
      time: Date.now()
    });
  },
  // 点击商品展示
  handleCates(e) {
    let {index} = e.currentTarget.dataset
    let CategoryRightList = this.CategoryList[index].children;
    this.setData({
      CategoryRightList,
      activeIndex: index,
      scrollTop: 0
    })
  }
})