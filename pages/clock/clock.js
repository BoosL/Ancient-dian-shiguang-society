Page({
  /**
   * 页面的初始数据
   */
  data: {
    step: '', //后台抓取微信步数
    modalHidden: false,
    result: '', //单词
    stepChar: '', //总步数-微信当天步数
    currentTab: 0, //滑动切换
    source: '', //图片显示地址
    change: true,
    type_code: '',
    width: '',
    showNum: 0,
    marginLeft: 0,
    animation: '',
    hidden: true,
    shows: false,
    total: '',
    results: '', //上传图片地址
    animationData: {}
  },


  show: function(ee) {
    wx.showModal({
      title: '活动规则',
      content: '趣味打卡分为认单词、上传美图、微信步数三个部分，选择一件你感兴趣的事情去挑战，连续打卡拼图达到21张，即可获得一份小礼物！\r\n认识当天十个单词完成，即可打卡并获得拼图\r\n点击上传图片，选择照片上传，每次上传照片完成打卡后即可获得一张拼图\r\n每天微信步数达到10000步及以上，即可参与打卡，打卡获得一张拼图',
      showCancel: false,
    })
  },


  /*** 滑动切换tab***/
  swiperTab: function(e) {
    var that = this;
    var session_code = wx.getStorageSync('session_code');
    var page_code = e.detail.current;
    that.setData({
      currentTab: e.detail.current
    });
    if (page_code == 0) {

    } else if (page_code == 1) {

      //打卡查询  类型1 运动
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
        success: function(datas) {
          if (datas.data.result.todayIsPunch == 1) {
            wx.showToast({
              title: '今日美图已打卡',
              icon: 'success',
              duration: 1500
            })
          } else {
            wx.showToast({
              title: '今日美图未打卡',
              image: '../images/cross.png', //自定义图标的本地路径，image 的优先级高于icon
              duration: 1500
            })
          }
        },
      });

    } else if (page_code == 2) {
      //打卡查询  类型1 运动
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
        success: function(datas) {
          if (datas.data.result.todayIsPunch == 1) {
            wx.showToast({
              title: '今日运动已打卡',
              icon: 'success',
              duration: 1500
            })
          } else {
            wx.showToast({
              title: '今日运动未打卡',
              image: '../images/cross.png', //自定义图标的本地路径，image 的优先级高于icon
              duration: 1500
            })
          }
        },
      });

      wx.getWeRunData({
        success(res) {
          wx.request({
            url: 'https://gz.wauwo.net/miniAPP/recordStepNumber/getStepNumber?d=' + Date.now(),
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            data: {
              sessionId: session_code,
              encryptedData: res.encryptedData,
              iv: res.iv
            },
            success: function(data_1) {
              if (data_1.data.e == 0) {
                if (data_1.data.result.step >= 10000) {
                  that.setData({
                    step: data_1.data.result.step,
                    stepChar: data_1.data.result.stepChar,
                    total: 0
                  })
                } else {
                  that.setData({
                    step: data_1.data.result.step,
                    stepChar: data_1.data.result.stepChar,
                    total: (10000 - data_1.data.result.step)
                  })
                }
              } else {
                wx.showToast({
                  title: '请允许授权微信运动',
                  image: '../images/cross.png', //自定义图标的本地路径，image 的优先级高于icon
                  duration: 1500
                })
              }
            },
          });
        }
      });
    }
  },
  /*** 点击tab切换***/
  swichNav: function(e) {
    var that = this;
    that.setData({
      currentTab: e.target.dataset.current
    });
  },

  Shangtiao: function(res) {
    var that = this;
    var lengthes = wx.getStorageSync('lengthes');
    if (that.data.showNum === 0) {
      return
    }
    that.data.showNum--

      that.data.marginLeft = parseInt(that.data.marginLeft) + 540 + ''
    that.setData({
      showNum: that.data.showNum,
      marginLeft: that.data.marginLeft,
    })

  },
  Xiatiao: function(res) {
    var that = this;
    var lengthes = wx.getStorageSync('lengthes');
    if (this.data.showNum >= lengthes - 1) {
      that.setData({
        hidden: false,
        shows: true
      })
      return
    }

    /*   var animation = wx.createAnimation({
        transformOrigin: "50% 50%",
        duration: 1000,
        timingFunction: "ease",
        delay: 0
      })
      animation.translateX(540).step(); */

    this.data.showNum++
      that.data.marginLeft = parseInt(that.data.marginLeft) - 540 + ''
    that.setData({
      showNum: that.data.showNum,
      marginLeft: that.data.marginLeft,
      animationData: animation.export()
    })

  },
  //上传图片
  listenerButtonChooseImage: function(res) {
    var that = this;
    var session_code = wx.getStorageSync('session_code');
    var bgColor = this.data.pageBackgroundColor == 'red' ? '#5cb85c' : '#fff';
    wx.chooseImage({
      count: 1,
      //original原图，compressed压缩图
      sizeType: ['original', 'compressed'],
      //album来源相册 camera相机 
      sourceType: ['album', 'camera'],
      //成功时会回调
      success: function(res) {
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
            success: function(data) {
              console.log(data)
              that.setData({
                results: JSON.parse(data.data).result
              })
              wx.setStorage({
                key: "results",
                data: JSON.parse(data.data).result,
              })

            },
            fail: function(data) {
              console.log(data.errorMessage)
            }
          })

      }
    })
  },

  //上传图片确认打卡
  ImgConfirmTheClock: function(res) {
    var that = this;
    if (that.data.result.length > 5) {
      var session_code = wx.getStorageSync('session_code');
      var results = wx.getStorageSync('results');
      console.log(wx.getStorageSync('results'))
      wx.request({
        url: 'https://gz.wauwo.net/miniAPP/file/filePunchCard?d=' + Date.now(),
        data: {
          sessionId: session_code,
          imgUrl: results
        },
        success: function(data) {
          if (data.data.e == 0) {
            wx.showToast({
              title: '打卡成功',
              icon: 'success',
              duration: 1500
            })
          } else {
            wx.showToast({
              title: '已完成打卡',
              icon: 'success',
              duration: 1500
            })
          }
        },
        fail: function(data) {
          console.log(data.errorMessage)
        }
      })
    } else {
      wx.showToast({
        title: '请上传美图',
        image: '../images/cross.png',
        duration: 1500
      })
    }
  },

  //单词打卡
  workclock: function(res) {
    var that = this;
    var session_code = wx.getStorageSync('session_code');
    wx.request({
      url: 'https://gz.wauwo.net/miniAPP/recordWord/saveRecordWord',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: {
        sessionId: session_code
      },
      success: function(data) {
        if (data.data.e == 0) {
          wx.showToast({
            title: '打卡成功',
            icon: 'success',
            duration: 1500
          })
        } else {
          wx.showToast({
            title: '已完成打卡',
            icon: 'success',
            duration: 1500
          })
        }
      },
    })
  },



  //微信运动打卡
  SportsConfirmTheClock: function(res) {
    var that = this;
    var session_code = wx.getStorageSync('session_code');
    if (this.data.step >= 10000) {
      wx.request({
        url: 'https://gz.wauwo.net/miniAPP/recordStepNumber/saveStepNumber?d=' + Date.now(),
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        data: {
          sessionId: session_code,
          type_code: 0
        },
        success: function(data) {
          if (data.data.e == 0) {
            wx.showToast({
              title: '打卡成功',
              icon: 'success',
              duration: 1500
            })
          } else {
            wx.showToast({
              title: '已完成打卡',
              icon: 'success',
              duration: 1500
            })
          }
        },
      })
    } else {
      wx.showToast({
        title: '未到打卡步数',
        image: '../images/cross.png',
        duration: 1500
      })
    }
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(res) {
    var that = this;
    that.setData({
      loadingHidden: true,
    })
    var session_code = wx.getStorageSync('session_code');
    //单词循环
    wx.request({
      url: 'https://gz.wauwo.net/miniAPP/word/getWord',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: {
        sessionId: session_code
      },
      success: function(data) {
        that.setData({
          result: data.data.result,
          width: 540 * data.data.result.length,
          numbers: data.data.result.length,
        })
        wx.setStorage({
          key: "lengthes",
          data: data.data.result.length,
        })
      },
    });

    //打卡查询  类型3  单词
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
      success: function(datas) {
        if (datas.data.result.todayIsPunch == 1) {
          wx.showToast({
            title: '今日单词已打卡',
            icon: 'success',
            duration: 1500
          })
        } else {
          wx.showToast({
            title: '今日单词未打卡',
            image: '../images/cross.png', //自定义图标的本地路径，image 的优先级高于icon
            duration: 1500
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

  }
})