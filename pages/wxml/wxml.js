Page({
  data: {
    showModal: false,
    boxInfo: {},
    showAnimation: false
  },

  // ดึงข้อมูลขนาดและตำแหน่งของ #box
  getBoxInfo() {
    const query = wx.createSelectorQuery();
    query.select('#box').boundingClientRect((rect) => {
      this.setData({
        boxInfo: rect,
        showModal: true
      });
    }).exec();
  },

  // ปิด Modal
  closeModal() {
    this.setData({ showModal: false });
  },

  // ตรวจจับเมื่อ #animatedBox ปรากฏบนหน้าจอเพื่อแสดงแอนิเมชัน
  observeAnimation() {
    const observer = wx.createIntersectionObserver(this);
    observer.relativeToViewport().observe('#animatedBox', (res) => {
      if (res.intersectionRatio > 0) {
        this.setData({ showAnimation: true });
        observer.disconnect(); // หยุดฟังเมื่อแสดงผลแล้ว
      }
    });
  },

  // เรียกใช้งาน observeAnimation เมื่อหน้าโหลด
  onLoad() {
    this.observeAnimation();
  }
});
