Page({
    data: {
        imagePath: ''
    },

    // สร้าง Canvas และวาดรูป
    createCanvas() {
    console.log('เริ่มต้นการสร้าง Canvas');

    // 1️⃣ สร้าง Canvas Context
    const ctx = wx.createCanvasContext('myCanvas');

    // 🎯 วาดสี่เหลี่ยมสีน้ำเงิน
    ctx.setFillStyle('blue');
    ctx.fillRect(50, 50, 200, 200);

    // 🔴 วาดวงกลมสีแดง (ซ้อนทับบนสี่เหลี่ยม)
    ctx.beginPath();
    ctx.arc(150, 150, 80, 0, 2 * Math.PI);
    ctx.setFillStyle('red');
    ctx.fill();
    ctx.closePath();

    // 2️⃣ เรียกใช้งาน draw เพื่อให้การวาดเกิดขึ้น
    ctx.draw();

    console.log('วาดวงกลมและสี่เหลี่ยมเรียบร้อยแล้ว');

    // 3️⃣ แปลง Canvas เป็นไฟล์รูปภาพชั่วคราว
    wx.canvasToTempFilePath({
        canvasId: 'myCanvas',
        x: 0,
        y: 0,
        width: 300,
        height: 300,
        destWidth: 300,
        destHeight: 300,
        success: (res) => {
            console.log('บันทึกรูปภาพสำเร็จ:', res.tempFilePath);
            this.setData({ imagePath: res.tempFilePath });
        },
        fail: (err) => {
            console.error('บันทึกรูปภาพล้มเหลว:', err);
        }
    });
}




});
