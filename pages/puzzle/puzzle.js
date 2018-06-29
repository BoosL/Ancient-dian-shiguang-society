Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    list: [],
    listo: [],
    listt: [],
    punchNum: '', //打卡次数

    lottos: false, //点击抽奖 可点击抽奖 单词
    lottery: true, //点击抽奖  不可点击  

    lottoso: false, //点击抽奖 可点击抽奖  美图
    lotteryo: true, //点击抽奖  不可点击  

    lottost: false, //点击抽奖 可点击抽奖 打卡
    lotteryt: true //点击抽奖  不可点击  
  },

  /*** 滑动切换tab***/
  bindChange: function(e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
  },
  /*** 点击tab切换***/
  swichNav: function(e) {
    var that = this;
    that.setData({
      currentTab: e.target.dataset.current
    });
  },

  show: function(e) {
    wx.showModal({
      title: '活动规则',
      content: '趣味打卡分为认单词、上传美图、微信步数三个部分，选择一件你感兴趣的事情去挑战，连续打卡拼图达到21张，即可获得一份小礼物！\r\n当天十个单词认识完成，即可打卡并获得拼图\r\n点击上传图片，选择照片上传，每次上传照片完成打卡后即可获得一张拼图\r\n每天微信步数达到10000步及以上，即可参与打卡，打卡获得一张拼图',
      showCancel: false,
    })
  },

  lottos: function(e) {
    wx.showModal({
      title: '抽奖',
      content: '',
      showCancel: false,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(res) {
    var that = this;
    var session_code = wx.getStorageSync('session_code');

    //单词打卡拼图
    wx.request({
      url: 'https://gz.wauwo.net/miniAPP/punchCard/getPunchInfoCardByType',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: {
        sessionId: session_code,
        punchType: 3
      },
      success: function(data) {
        var arrayc = []
        for (var i = 0; i < 21; i++) {
          if (i <= data.data.result.punchNum -1) {
            arrayc.push({
              bgimagc: 'url(http://gz.wauwo.net/miniAPP/resources/tempImage/0' + (i + 1) + '.png)'
            })
          } else {
            arrayc.push({
              bgimagc: 'none'
            })
          }
        }
        that.setData({
          listt: arrayc
        })
        if (data.data.result.punchNum == 21) {
          that.setData({
            lottery: false, //点击抽奖  不可点击
            lottos: true //点击抽奖 可点击抽奖
          })
        }
      },
    });

    //上传美图拼图
    wx.request({
      url: 'https://gz.wauwo.net/miniAPP/punchCard/getPunchInfoCardByType',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: {
        sessionId: session_code,
        punchType: 2
      },
      success: function(data) {
        var arrayb = []
        for (var i = 0; i < 21; i++) {
          if (i <= data.data.result.punchNum - 1) {
            arrayb.push({
              bgimagb: 'url(http://gz.wauwo.net/miniAPP/resources/tempImage/0' + (i + 1) + '.png)'
            })
          } else {
            arrayb.push({
              bgimagb: 'none'
            })
          }
        }
        that.setData({
          listo: arrayb
        })
        if (data.data.result.punchNum == 21) {
          that.setData({
            lotteryo: false, //点击抽奖  不可点击
            lottoso: true //点击抽奖 可点击抽奖
          })
        }
      },
    });


    //步数打卡拼图
    wx.request({
      url: 'https://gz.wauwo.net/miniAPP/punchCard/getPunchInfoCardByType',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: {
        sessionId: session_code,
        punchType: 1
      },
      success: function(data) {
        var arraya = []
        for (var i = 0; i < 21; i++) {
          if (i <= data.data.result.punchNum - 1) {
            arraya.push({
              bgimaga: 'url(http://gz.wauwo.net/miniAPP/resources/tempImage/0' + (i + 1) + '.png)'
            })
          } else {
            arraya.push({
              bgimaga: 'none'
            })
          }
        }
        that.setData({
          list: arraya
        })
        if (data.data.result.punchNum == 21) {
          that.setData({
            lotteryt: false, //点击抽奖  不可点击
            lottost: true //点击抽奖 可点击抽奖
          })
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

  },



})