Page({
  data: {
  },

  onLoad() {
    console.log('Page is loaded');
  },

  // ส่งข้อความไปยัง WebView
  sendDataToWebview() {
    wx.sendWebviewEvent({
      event: 'userClickedButton',
      data: {
        message: 'Hello from Mini Program!',
        userId: 12345
      }
    });
  },

  // รับข้อความจาก WebView
  onMessageFromWebview(e) {
    if (e.detail && e.detail.data && e.detail.data.length > 0) {
      console.log('Received message from WebView:', e.detail.data[0]);
    } else {
      console.log('Received empty message from WebView');
    }
  },
});
