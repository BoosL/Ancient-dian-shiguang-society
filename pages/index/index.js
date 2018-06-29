Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: 'data.data.result?data',
    animationData: {},
    animationDataone: {},
    loadingHidden: false,
   
  },

  onPostTap: function(options) {

    wx.navigateTo({
      url: '../clock/clock?data'
    })
  },

  onPostsTap: function(options) {
    wx.navigateTo({
      url: '../calendar/calendar?data'
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(data) {
    this.setData({
      loadingHidden: false
    });
    var that = this;
    setTimeout(function() {
      that.setData({
        loadingHidden: true,
        hidden: true
      });
      that.update();
    }, 3000);


    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
    })

    this.animation = animation
    this.setData({
      animationData: animation.export()
    })

    setTimeout(function() {
      animation.right(50).step();
      this.setData({
        animationDataone: animation.export()
      })
    }.bind(this), 3000)

    this.setData({
      animationData: animation.export()
    })
    setTimeout(function() {
      animation.left(50).step();
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 3000)
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