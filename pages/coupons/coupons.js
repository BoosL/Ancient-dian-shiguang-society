Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    var that = this;
    var session_code = wx.getStorageSync('session_code');
    //单词打卡拼图
    wx.request({
      url: 'https://gz.wauwo.net/miniAPP/lottery/countLottery',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: {
        sessionId: session_code,
      },
      success: function(data) {
        console.log(data.data)
        var array = []
        for (var i = 0; i < 3; i++) {
          if (i < data.data.result) {
            array.push({
              bgimag: 'url(http://gz.wauwo.net/miniAPP/resources/tempImage/00' + (i + 1) + '.png)',
            })
          } else {
            array.push({
              bgimag: 'none',
            })
          }
        }

        that.setData({
          list: array,
        })
      },
    });
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