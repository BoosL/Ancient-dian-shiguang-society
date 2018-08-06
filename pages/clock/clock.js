Page({
  /**
   * 页面的初始数据
   */
  data: {
    step: '', //后台抓取微信步数
    modalHidden: false,
    word: '', //单词
    stepChar: '', //总步数-微信当天步数
    currentTab: 0, //滑动切换
    source: '', //图片显示地址
    change: true,
    type_code: '',
    width: '',
    widths: '',
    showNum: 0,
    marginLeft: 0,
    marginLefts: 0,
    animation: '',
    hidden: true,
    shows: false,
    total: '',
    results: '', //上传图片地址
    imgurl:""
  },


  show: function (ee) {
    wx.showModal({
      title: '活动规则',
      content: '趣味打卡\r\n趣味打卡包含了单词打卡、分享美图、挑战微信步数，选择一件你感兴趣的事情去挑战，连续打卡三周后可获得领取古滇专属定制礼资格，小礼物每月发放100份，先到先得！\r\n照片打卡\r\n点击“上传图片”，上传任意地方的美图，每次上传照片后即可获得一张拼图，连续上传三周，即可获得领取古滇专属定制礼资格，小礼物每月发放100份，先到先得！\r\n微信运动\r\n微信步数走满10000步，即可打卡，打卡三周，即可获得领取古滇专属定制礼资格，小礼物每月发放100份，先到先得！',
      showCancel: false,
    })
  },


  /*** 滑动切换tab***/
  swiperTab: function (e) {
    var that = this;
    var page_code = e.detail.current;
    that.setData({
      currentTab: e.detail.current
    });
    if (page_code == 0) {
      that.ClockWord();

    } else if (page_code == 1) {
      var session_code = wx.getStorageSync('session_code');
      //打卡查询  类型1 运动
      wx.request({
        url: 'https://gz.wauwo.net/miniAPP/punchCard/getPunchInfoCardByType?d=' + Date.now(),
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        data: {
          sessionId: session_code,
          punchType: 2
        },
        success: function (datas) {
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
      var session_code = wx.getStorageSync('session_code');
      wx.request({
        url: 'https://gz.wauwo.net/miniAPP/punchCard/getPunchInfoCardByType?d=' + Date.now(),
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        data: {
          sessionId: session_code,
          punchType: 1
        },
        success: function (datas) {
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

      //微信运动授权
      wx.getWeRunData({
        success(res) {
          var session_code = wx.getStorageSync('session_code');
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
            success: function (data_1) {
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
  swichNav: function (e) {
    var that = this;
    that.setData({
      currentTab: e.target.dataset.current
    });
  },

  /* Shangtiao: function (res) {
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
  Xiatiao: function (res) {
    var that = this;
    var lengthes = wx.getStorageSync('lengthes');
    if (this.data.showNum >= lengthes - 1) {
      that.setData({
        hidden: false,
        shows: true
      })
      return
    }
    this.data.showNum++
    that.data.marginLeft = parseInt(that.data.marginLeft) - 540 + ''
    that.setData({
      showNum: that.data.showNum,
      marginLeft: that.data.marginLeft,
    })
  }, */


  //单词选项
  Choose: function (e) {
    var that = this;
    var lengthes = wx.getStorageSync('lengthes');
    var bgColora = this.data.pageBackgroundColor == 'red' ? 'red' : 'red';
    var thisId = e.currentTarget.dataset.id;
    /*     var isTrue = that.getWord[this.data.showNum].options[thisId]*/
    if (thisId == 3) {
      var that = this;
      if (this.data.showNum >= lengthes - 1) {
        that.setData({
          hidden: false,
          shows: true,
        })
        return
      }
      this.data.showNum++
      that.data.marginLeft = parseInt(that.data.marginLeft) - 560 + ''
      that.data.marginLefts = parseInt(that.data.marginLefts) - 750 + ''
      that.setData({
        showNum: that.data.showNum,
        marginLeft: that.data.marginLeft,
        marginLefts: that.data.marginLefts,
      })
    } else {
      if (thisId == 0) {
        wx.showToast({
          title: '答案错误',
          image: '../images/cross.png',
          duration: 1500
        })
      } else if (thisId == 1) {
        wx.showToast({
          title: '答案错误',
          image: '../images/cross.png',
          duration: 1500
        })
      } else if (thisId == 2) {
        wx.showToast({
          title: '答案错误',
          image: '../images/cross.png',
          duration: 1500
        })
      }
    }
  },


  //上传图片
  listenerButtonChooseImage: function (res) {
    var that = this;
    var bgColor = this.data.pageBackgroundColor == 'red' ? '#5cb85c' : '#fff';
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
        url: 'https://gz.wauwo.net/miniAPP/file/filePunchCard?d=' + Date.now(),
        data: {
          sessionId: session_code,
          imgUrl: results
        },
        success: function (data) {
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
        fail: function (data) {
          console.log(data.data.errorMessage)
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
  workclock: function (res) {
    var that = this;
    var session_code = wx.getStorageSync('session_code');
    wx.request({
      url: 'https://gz.wauwo.net/miniAPP/recordWord/saveRecordWord?d=' + Date.now(),
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: {
        sessionId: session_code
      },
      success: function (data) {
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
  SportsConfirmTheClock: function (res) {
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
        success: function (data) {
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


  //打卡查询  类型3  单词
  ClockWord: function () {
    var session_code = wx.getStorageSync('session_code');
    wx.request({
      url: 'https://gz.wauwo.net/miniAPP/punchCard/getPunchInfoCardByType?d=' + Date.now(),
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: {
        sessionId: session_code,
        punchType: 3
      },
      success: function (datas) {
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (res) {
    var that = this;
    var session_code = wx.getStorageSync('session_code');
    //单词循环
    wx.request({
      url: 'https://gz.wauwo.net/miniAPP/word/getWord?d=' + Date.now(),
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: {
        sessionId: session_code
      },

      success: function (words) {
        //从一个给定的数组arr中,随机返回num个不重复项
        function getArrayItems(arr, num) {
          //新建一个数组,将传入的数组复制过来,用于运算,而不要直接操作传入的数组;
          var temp_array = new Array();
          for (var index in arr) {
            temp_array.push(arr[index]);
          }
          //取出的数值项,保存在此数组
          var return_array = new Array();
          for (var i = 0; i < num; i++) {
            //判断如果数组还有可以取出的元素,以防下标越界
            if (temp_array.length > 0) {
              //在数组中产生一个随机索引
              var arrIndex = Math.floor(Math.random() * temp_array.length);
              //将此随机索引的对应的数组元素值复制出来
              return_array[i] = temp_array[arrIndex];
              //然后删掉此索引的数组元素,这时候temp_array变为新的数组
              temp_array.splice(arrIndex, 1);
            } else {
              //数组中数据项取完后,退出循环,比如数组本来只有10项,但要求取出20项.
              break;
            }
          }
          return return_array;
        }
        var ArrList = words.data.result;
        var getArray = (getArrayItems(ArrList, ArrList.length));
        that.getWord = getArray
        /*  for (var i in getArray) {
           for (var j = 0; j < getArray[i].options.length; j++) {
             getArray[i].options[j].temp = j
           }
         } */
        that.setData({
          single: getArray,
          width: 560 * getArray.length,
          widths: 750 * getArray.length,
        })
        wx.setStorage({
          key: "lengthes",
          data: getArray.length,
        })
      },
    });
    that.ClockWord();


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
        //将转后的信息赋值给image的src 
        that.setData({
          imgurl: "data:image/png;base64," + base64
        });
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