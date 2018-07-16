var session_code = wx.getStorageSync('session_code');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: [{
        message: "日"
      },
      {
        message: "一"
      },
      {
        message: "二"
      },
      {
        message: "三"
      },
      {
        message: "四"
      },
      {
        message: "五"
      },
      {
        message: "六"
      },
    ],
    done: true,
    sing: false,

    calendar: '',

    isPunch: '',
  },


  onDoneTap: function(options) {
    wx.navigateTo({
      url: '../sonic/sonic'
    })
  },

  show: function(ee) {
    wx.showModal({
      title: '活动规则',
      content: '每天一件小事打卡（如跑步、早起打卡），打卡一周（7天），即可获得一个荣誉勋章，集齐3个荣誉勋章后可获得一份古滇专属定制礼！',
      showCancel: false,
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var bgColor = this.data.pageBackgroundColor == 'red' ? '#5cb85c' : '#db4a6b';
    wx.request({
      url: 'https://gz.wauwo.net/miniAPP/calendar/getPunchDetails',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: {
        sessionId: session_code,
      },
      success: function(datas) {
        console.log(datas.data.result)
        var myDate = new Date();
        that.setData({
          calendar: datas.data.result,
          Year: myDate.getFullYear(),
          Month: myDate.getMonth() + 1,
          day: myDate.getDate(),
        })
        for (var i in datas.data.result) {
          var isPunch = datas.data.result[i].isPunch;
          var isToday = datas.data.result[i].isToday;
          if (isPunch == 1) {
            that.setData({
              done: false,
              sing: true,
              images: 'url(http://gz.wauwo.net/miniAPP/resources/tempImage/draw.png)',
            })
          }
          if (isToday == 1) {
            that.setData({
              color: bgColor
            })
          }
        }
      },
    });
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