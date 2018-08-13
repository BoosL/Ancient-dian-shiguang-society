// pages/sonic/sonic.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    source: '',
    change: true,
    imgurl: ""
  },

  show: function (e) {
    wx.showModal({
      title: '活动规则',
      content: '每天一件小事打卡（如跑步），并上传照片，照片审核后即为打卡成功，连续完成7天后，\r\n每周三可兑换特殊称号，集满3张特殊称号名牌后，即可获得古滇专属定制礼。',
      showCancel: false,
    })
  },



  //上传图片
  listenerButtonChooseImage: function (res) {
    var that = this;
    var session_code = wx.getStorageSync('session_code');
    wx.chooseImage({
      count: 1,
      //original原图，compressed压缩图
      sizeType: ['original', 'compressed'],
      //album来源相册 camera相机 
      sourceType: ['album', 'camera'],
      //成功时会回调
      success: function (res) {
        var source = res.tempFilePaths
        //重绘视图
        that.setData({
          source: res.tempFilePaths,
          change: false,
        }),
          wx.uploadFile({
            url: 'https://gz.wauwo.net/miniAPP/file/udpalaodImage?sessionId=' + session_code + '&d=' + Date.now(),
            filePath: res.tempFilePaths[0],
            name: 'file',
            success: function (data) {
              that.setData({
                results: JSON.parse(data.data).result
              })
              wx.setStorage({
                key: "results",
                data: JSON.parse(data.data).result,
              })

            },
            fail: function (data) {
              console.log(data.data.errorMessage)
            }
          })

      }
    })
  },

  //上传图片确认打卡
  ImgConfirmTheClock: function (res) {
    var that = this;
    var session_code = wx.getStorageSync('session_code');
    var results = wx.getStorageSync('results');
    if (results.length > 5) {
      wx.request({
        url: 'https://gz.wauwo.net/miniAPP/calendar/calendarPunch?d=' + Date.now(),
        data: {
          sessionId: session_code,
          imgUrl: results
        },
        success: function (data) {
          if (data.data.e == 0) {
            wx.navigateTo({
              url: '../calendar/calendar'
            })
          } else {
            wx.showModal({
              title: data.data.errorMessage,
              showCancel: false,
            })
          }
        },
      })
    } else {
      wx.showToast({
        title: '请上传美图',
        image: '../images/cross.png',
        duration: 1500
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var session_code = wx.getStorageSync('session_code');
    wx.request({
      url: 'https://gz.wauwo.net/miniAPP/image/getImageBase64 ?d = ' + Date.now(),
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: {
        name: "c4"
      },
      success: function (data) {
        var array = wx.base64ToArrayBuffer(data.data[0].context);
        var base64 = wx.arrayBufferToBase64(array);
        that.setData({
          imgurl: "data:image/png;base64," + base64
        });
      },
    });


    wx.request({
      url: 'https://gz.wauwo.net/miniAPP/health/getContent?d = ' + Date.now(),
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: {
        sessionId: session_code,
      },
      success: function (data) {
        var text = data.data;
        that.setData({
          text: text
        })
      },
    });
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