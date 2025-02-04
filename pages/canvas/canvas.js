Page({
    data: {
        imagePath: '' // สำหรับแสดงผลลัพธ์รูปภาพ
    },

    // สร้าง Canvas และวาดรูป
    createCanvas() {
        console.log('เริ่มต้นการสร้าง Canvas');  // ตรวจสอบการเข้าถึงฟังก์ชัน

        // 1️⃣ สร้าง Canvas Context
        const ctx = wx.createCanvasContext('myCanvas');  // ใช้ 'myCanvas' คือ id ของ canvas ใน WXML

        // วาดวงกลมสีแดง
        ctx.beginPath();
        ctx.arc(150, 150, 100, 0, 2 * Math.PI);
        ctx.setFillStyle('red');
        ctx.fill();
        ctx.closePath();

        // 2️⃣ เรียกใช้งาน draw เพื่อให้การวาดเกิดขึ้น
        ctx.draw();

        console.log('วงกลมถูกวาดเรียบร้อยแล้ว');  // ตรวจสอบหลังจากวาด

        // 3️⃣ แปลง Canvas เป็นไฟล์รูปภาพชั่วคราว
        wx.canvasToTempFilePath({
            canvasId: 'myCanvas',  // ใช้ canvasId ที่ตรงกับ id ใน WXML
            x: 0,
            y: 0,
            width: 300,
            height: 300,
            destWidth: 300,
            destHeight: 300,
            success: (res) => {
                console.log('บันทึกรูปภาพสำเร็จ:', res.tempFilePath);
                this.setData({ imagePath: res.tempFilePath }); // แสดงรูป
            },
            fail: (err) => {
                console.error('บันทึกรูปภาพล้มเหลว:', err);
            }
        });
    }



});
