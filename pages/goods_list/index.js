import {getGoodsList} from '../../api/category.js';
import {showToast,stopRefresh} from '../../utils/utils.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 渲染数据
    tabs: [
      {
        id:0,
        name: "综合",
        isActive: true
      },
      {
        id:1,
        name: "销量",
        isActive: false
      },
      {
        id:2,
        name: "价格",
        isActive: false
      }
    ],
    cat_id: null,
    goodsList: [],
    // 页码
    pages: 0,
    // 总条数
    total: 0,
    // 每页显示的条数
    pagesize: 10
  },

    
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let {cat_id,cat_name} = options;
    wx.setNavigationBarTitle({
      title: cat_name
    });
    this.setData({
      cat_id
    })
    this.getGoodsList();
  },

  // 获取列表数据
  async getGoodsList() {
    let {cat_id, pages} = this.data;
    pages++;
    let res = await getGoodsList(cat_id,pages);
    this.setData({
      goodsList: [...this.data.goodsList,...res.message.goods],
      pages,
      total: res.message.total
    })
    await stopRefresh();
  }, 

  // 判断是否为高亮
  handleTab(e) {
    let index = e.detail;
    let {tabs} = this.data;
    tabs.forEach((v,i) => index === i ? v.isActive = true : v.isActive = false  )
    this.setData({
      tabs
    })
  },

  // 上拉加载
  async onReachBottom() {
    let {total,pagesize,pages} = this.data;
    if(pages < Math.ceil(total/pagesize)){
      this.getGoodsList();
    }else{
      await showToast('没有更多数据了');
    }
  },

  // 下拉刷新
  onPullDownRefresh(){
    console.log('用户下拉了')
    this.setData({
      goodsList: []
    })
    this.data.pages = 0;
    this.getGoodsList();
  }
})