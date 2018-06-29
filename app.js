//app.js
App({
  onLaunch: function() {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    wx.login({
      success: function(res) {
        if (res.code) {
          wx.request({
            url: 'https://gz.wauwo.net/miniAPP/user/userLogin?d=' + Date.now(),
            data: {
              code: res.code
            },
            success: function(data) {
              wx.setStorage({
                key: "session_code",
                data: data.data.result,
              })
              if (data.data.e != 0) {
                console.log(data.errMsg)
              }
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    });

    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.werun']) {
          wx.authorize({
            scope: 'scope.werun',
            success() {
              wx.getWeRunData()
            }
          })
        }
      }
    });
  },
  globalData: {
    userInfo: null
  },
})