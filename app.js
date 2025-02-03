
//app.js
App({
  onLaunch: function () {
    let logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // login
    wx.login({
      success: res => {
      }
    })
    // get user settings
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: res => {
              this.globalData.userInfo = res.userInfo;
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})