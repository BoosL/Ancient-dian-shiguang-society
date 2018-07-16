var session_code = wx.getStorageSync('session_code');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: 'data.data.result?data',
    animationData: {},
    animationDataone: {},
    loadingHidden: false,

    backImage: ""

  },

  onPostTap: function (options) {
    wx.navigateTo({
      url: '../clock/clock?data'
    })
  },

  onPostsTap: function (options) {
    wx.navigateTo({
      url: '../calendar/calendar?data'
    })
  },

  show: function (ee) {
    wx.showModal({
      title: '活动规则',
      content: '拾光社\r\n本活动仅限七彩云南•古滇名城业主参与。\r\n七彩云南古滇名城•拾光社，寓意拾起美好时光，提倡“一天新似一天”的精神主张，线上小程序设置，提出三周新生活打卡活动（背单词、分享美图、挑战微信步数）和挑战日历，选择一件你感兴趣的事情去挑战吧，从坚持开始焕新生活，连续打卡三周(21天）或挑战日历小程序三周，即可获得古滇专属定制礼。',
      showCancel: false,
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (data) {
    var that = this;
    that.setData({
      loadingHidden: false
    });
    setTimeout(function () {
      that.setData({
        loadingHidden: true,
        hidden: true
      });
    }, 3000);


    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
    })

    this.animation = animation
    this.setData({
      animationData: animation.export()
    })

    setTimeout(function () {
      animation.right(50).step();
      this.setData({
        animationDataone: animation.export()
      })
    }.bind(this), 3000)

    this.setData({
      animationData: animation.export()
    })
    setTimeout(function () {
      animation.left(50).step();
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 3000)


    var that = this;
   /*  wx.request({
      url: 'https://gz.wauwo.net/miniAPP/file/getImageBase64',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: {
        sessionId: session_code,
      },
      success: function (data) {
        console.log(data)
        that.setData({
          backImage : data.data
        })
      },
    }); */
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },


  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})