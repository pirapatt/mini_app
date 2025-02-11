worker.onMessage((msg) => {
  console.log('📥 Received in Worker:', msg);

  if (msg && msg.data) {
    const result = `${msg.data} - Processed by Worker`;

    // ส่งข้อความตอบกลับไปยัง Main thread
    worker.postMessage({
      action: 'reply',
      data: result
    });
  } else {
    worker.postMessage({
      action: 'error',
      data: 'Unknown action received or invalid message format.'
    });
  }
});