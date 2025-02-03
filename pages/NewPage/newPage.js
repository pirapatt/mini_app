Page({
  handleNavigateBack() {
    wx.navigateBack({
      delta: 1, // จำนวนหน้าที่ต้องย้อนกลับ (ค่า default คือ 1)
      success: () => {
        console.log('Successfully navigated back to the previous page');
      },
      fail: (err) => {
        console.error('Failed to navigate back:', err);
      }
    });
  }
});
