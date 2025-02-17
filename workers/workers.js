console.log('👷 Worker Started!');

worker.onMessage((msg) => {
    console.log('📥 Worker received:', msg);

    // ✅ ส่งข้อความกลับไปยัง Main Thread
    const result = `${msg} - Processed by Worker`;

    worker.postMessage(result);
});
