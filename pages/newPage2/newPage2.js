Page({
    data: {
        receivedMessage: '',
    },

    onLoad(options) {
        // ใช้ EventChannel เพื่อรับข้อมูล
        const eventChannel = this.getOpenerEventChannel();
        eventChannel.on('sendData', (data) => {
            console.log('Received data:', data.message); // ใช้ข้อมูลที่ส่งมาจากหน้าแรก
            this.setData({ receivedMessage: data.message });
        });
    }

});
