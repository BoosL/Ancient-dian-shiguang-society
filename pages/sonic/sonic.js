// pages/sonic/sonic.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    source: '',
    change: true
  },

  show: function(e) {
    wx.showModal({
      title: '活动规则',
      content: '每天一件小事打卡（如跑步），并上传照片，照片审核后即为打卡成功，连续完成7天后，\r\n每周三可兑换特殊称号，集满3张特殊称号名牌后，即可获得古滇专属定制礼。',
      showCancel: false,
    })
  },



  listenerButtonChooseImage: function() {
    var that = this;
    wx.chooseImage({
      count: 1,
      //original原图，compressed压缩图
      sizeType: ['original'],
      //album来源相册 camera相机 
      sourceType: ['album', 'camera'],
      //成功时会回调
      success: function(res) {
        //重绘视图
        that.setData({
          source: res.tempFilePaths,
          change: false
        })
      }
    })
  },

  /* onSignTap: function (options) {
    wx.navigateTo({
      url: '../calendar/calendar'
    })
  }, */
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})