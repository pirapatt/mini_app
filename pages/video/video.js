Page({
  onReady: function () {
    // สร้าง Video Context โดยใช้ ID ของวิดีโอ
    this.videoContext = wx.createVideoContext('myVideo');
  },

  // ฟังก์ชันเล่นวิดีโอ
  playVideo: function () {
    this.videoContext.play();
  },

  // ฟังก์ชันหยุดวิดีโอชั่วคราว
  pauseVideo: function () {
    this.videoContext.pause();
  },

  // ฟังก์ชันข้ามไปที่ 10 วินาที
  seekVideo: function () {
    this.videoContext.seek(10);  // ข้ามไปยังวินาทีที่ 10
  }
});
