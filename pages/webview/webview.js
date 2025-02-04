Page({
  data: {
    showWebview: true,  // เริ่มต้นไม่แสดง WebView
    url: 'https://bridge-ap-is-git-main-pirapats-projects.vercel.app/',  // URL ที่จะให้โหลดใน WebView
  },

  onLoad() {
    console.log('Page is loaded');
  },

  // ฟังก์ชันส่งข้อความไปยัง WebView
  sendToWebview() {
    if (this.data.showWebview) {
      wx.sendWebviewEvent({
        message: "I'm MiniProgram, I received"
      });
    } else {
      console.log('WebView is not visible.');
    }
  },

  // ฟังก์ชันรับข้อความจาก WebView
  onMessageFromWebview(e) {
    console.log('Received message from WebView:', e.detail);
  },

  // ฟังก์ชันที่ใช้เปิด WebView
  toggleWebview() {
    this.setData({
      showWebview: !this.data.showWebview  // สลับการแสดง WebView
    });
  }
});
