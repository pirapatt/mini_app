// worker.js
worker.onMessage((msg) => {
  console.log('📥 Received in Worker:', msg);

  if (msg.action === 'start') {
    const result = `${msg.data} - Processed by Worker`;

    worker.postMessage({
      action: 'reply',
      data: result
    });
  } else {
    worker.postMessage({
      action: 'error',
      data: 'Unknown action received.'
    });
  }
});
