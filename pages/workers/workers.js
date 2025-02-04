// worker.js
onMessage(function (message) {
  if (message.action === 'start') {
    console.log('Worker ได้รับข้อความ:', message.data);
    
    // ส่งข้อความกลับไปยัง main thread
    postMessage({
      data: `Hello from Worker! Received message: ${message.data}`,
    });
  }
});
