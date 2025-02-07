//รวมหน้าเดียว

Page({
  data: {
    imagePath: '',
    info: '', 
    currentPage: 0,
    buttonsPerPage: 99,
    title: '',
    categorizedButtons: [
      {
        category: '1. Foundation',
        buttons: [
          { label: 'Get SystemInfoSync', action: 'getSystemInfoSync' },
          { label: 'Get UpdateManager', action: 'getUpdateManager' },
          { label: 'Get LaunchOptionsSync', action: 'getLaunchOptionsSync' },
        ]
      },
      {
        category: '2. Routing',
        buttons: [
          { label: 'NavigateTo', action: 'navigateTo' },
          { label: 'NavigateToMiniProgram', action: 'handleNavigateToMiniProgram'},
        ]
      },
      {
        category: '3. Jump',
        buttons: [
          { label: 'EventChanel', action: 'handleEventChanelTap' },
          { label: 'ExitMiniProgram', action: 'handleExitMiniProgram' },
        ]
      },
      {
        category: '4. Forward',
        buttons: [
          { label: 'ShowShareMenu', action: 'showShareMenu' },
        ]
      },
      {
        category: '5. Interface',
        buttons: [
          { label: 'ShowLoding', action: 'showLoding' },
          { label: 'ShowModal', action: 'showModal' },
          { label: 'ShowToast', action: 'showToast' },
        ]
      },
      {
        category: '6. Internet',
        buttons: [
          { label: 'UploadFile', action: 'uploadFile' },
          { label: 'DownloadFile', action: 'downloadFile' },
          { label: 'ConnectSocket', action: 'connectSocket' },
        ]
      },
      {
        category: '7. Data Cache',
        buttons: [
          { label: 'SetStorageSync', action: 'setStorageData' },
          { label: 'GetStorage', action: 'getStorageData' },
          { label: 'ClearStorage', action: 'clearStorageData' },
        ]
      },
      {
        category: '8. Data Analysis',
        buttons: [
          { label: 'ReportEvent', action: 'reportEvent' },
        ]
      },
      {
        category: '9. Canvas',
        buttons: [
          { label: 'GoToCanvas', action: 'navigateToCanvas' },
        ]
      },
      {
        category: '10. Worker',
        buttons: [
          { label: 'CreateWorker', action: 'createWorker' },
        ]
      },
      {
        category: '11. Media',
        buttons: [
          { label: 'CreateVideoContext', action: 'navigateToVideoContext' },
          { label: 'PreviewImage', action: 'previewImage' },
          { label: 'ChooseImage', action: 'chooseImage' },
        ]
      },
      {
        category: '12. WXML',
        buttons: [
          { label: 'Go To WXML', action: 'navigateToWxml' },
        ]
      },
      {
        category: '13. Document',
        buttons: [
          { label: 'SaveFile & OpenDocument', action: 'saveFile' },
          { label: 'GetSavedFileList', action: 'getSavedFileList' },
        ]
      },
      {
        category: '14. Equipment',
        buttons: [
          { label: 'ScanCode', action: 'scanQRCode' },
        ]
      },
      {
        category: '15. Location',
        buttons: [
          { label: 'GetLocation', action: 'getCurrentLocation' },
          { label: 'ChooseLocation', action: 'chooseLocation' },
          { label: 'OpenLocation', action: 'openLocation' },
        ]
      },
    ],
  },

  onLoad() {
    wx.onCopyUrl(() => {
      return { query: 'a=1&b=2' }
    })
  },

  clearData: function () {
    this.setData({
      info: '',
      imagePath: ''
    });
    console.log('Data cleared:', this.data.myData);
  },

  handleButtonTap(e) {
    const action = e.currentTarget.dataset.action;
    if (this[action]) {
      this[action]();
    }
  },

  navigateToWxml() {
    wx.navigateTo({
      url: '/pages/wxml/wxml',
      success: function () {
        console.log('Navigation successful');
      },
      fail: function () {
        console.log('Navigation failed');
      }
    });
  },

  navigateToWebview() {
    wx.navigateTo({
      url: '/pages/webview/webview',
      success: function () {
        console.log('Navigation successful');
      },
      fail: function () {
        console.log('Navigation failed');
      }
    });
  },

  // ฟังก์ชันสำหรับเปลี่ยนหน้า (Next)
  nextPage() {
    const { currentPage, buttonsPerPage, allButtons } = this.data;
    console.log('Before page change:', currentPage);

    if ((currentPage + 1) * buttonsPerPage < allButtons.length) {
      this.setData(
        { currentPage: currentPage + 1 },
        () => {
          console.log('After page change:', this.data.currentPage);
          this.updateVisibleButtons();
        }
      );
    }
  },

  // ฟังก์ชันสำหรับเปลี่ยนหน้า (Previous)
  prevPage() {
    if (this.data.currentPage > 0) {
      this.setData(
        { currentPage: this.data.currentPage - 1 },
        () => this.updateVisibleButtons()
      );
    }
  },

  //📱 ฟังก์ชันสำหรับดึงข้อมูลระบบของอุปกรณ์ เช่น รุ่น, ระบบปฏิบัติการ, ความละเอียดหน้าจอ ฯลฯ
  getSystemInfoSync() {
    wx.getSystemInfoAsync({
      success: (res) => {
        this.setData({ info: JSON.stringify(res, null, 2) });
      }
    });
  },
  //🔄 ฟังก์ชันสำหรับตรวจสอบว่ามีการอัปเดตแอปเวอร์ชันใหม่หรือไม่
  getUpdateManager() {
    const updateManager = wx.getUpdateManager();

    // ตรวจสอบการอัปเดต
    updateManager.onCheckForUpdate((res) => {
      console.log('Has update:', res.hasUpdate);  // ตรวจสอบว่ามีอัปเดตหรือไม่
      this.setData({ info: 'Has Update: ' + res.hasUpdate });
    });

    // หากมีการอัปเดต, ทำการดาวน์โหลดและติดตั้ง
    updateManager.onUpdateReady(() => {
      wx.showModal({
        title: 'Update Available',
        content: 'A new update is available. Do you want to restart?',
        success(res) {
          if (res.confirm) {
            // รีสตาร์ทแอปเพื่อใช้การอัปเดต
            updateManager.applyUpdate();
          }
        }
      });
    });

    // หากไม่สามารถดาวน์โหลดการอัปเดต, แสดงข้อผิดพลาด
    updateManager.onUpdateFailed(() => {
      wx.showModal({
        title: 'Update Failed',
        content: 'There was an error while updating the app.',
        showCancel: false
      });
    });
  },

  //🚀 ฟังก์ชันสำหรับดึงข้อมูลการเปิดแอป เช่น วิธีที่ผู้ใช้เปิดแอป (ผ่าน QR Code, การแชร์,หรือปุ่มลัด)
  getLaunchOptionsSync() {
    const res = wx.getLaunchOptionsSync();
    this.setData({ info: JSON.stringify(res, null, 2) });
  },

  navigateTo() {
    wx.navigateTo({
      url: '/pages/NewPage/newPage',
      success: function () {
        console.log('Navigation successful');
      },
      fail: function () {
        console.log('Navigation failed');
      }
    });
  },

  navigateToVideoContext() {
    wx.navigateTo({
      url: '/pages/video/video',
      success: function () {
        console.log('Navigation successful');
      },
      fail: function () {
        console.log('Navigation failed');
      }
    });
  },

  navigateToCanvas() {
    wx.navigateTo({
      url: '/pages/canvas/canvas',
      success: function () {
        console.log('Navigation successful');
      },
      fail: function () {
        console.log('Navigation failed');
      }
    });
  },

  // ฟังก์ชันเมื่อกดปุ่ม 'EventChanel'
  handleEventChanelTap() {
    wx.navigateTo({
      url: '/pages/newPage2/newPage2',
      success: (res) => {
        const eventChannel = res.eventChannel;
        eventChannel.emit('sendData', { message: 'Hello from first page!' });
      }
    });
  },

  handleExitMiniProgram() {
    wx.exitMiniProgram({
      success: () => {
        console.log('Exited Mini Program successfully');
      },
      fail: (err) => {
        console.error('Failed to exit Mini Program:', err);
      }
    });
  },

  handleNavigateToMiniProgram() {
    wx.navigateToMiniProgram({
      appId: 'mptiw78wqqx65b30',
      path: 'pages/index/index',
      extraData: {
        key: 'value'
      },
      envVersion: 'release',
      success: () => {
        console.log('Navigated to Mini Program successfully');
      },
      fail: (err) => {
        console.error('Failed to navigate to Mini Program:', err);
      }
    });
  },
  // Show Share Menu
  showShareMenu() {
    wx.showShareMenu({
      success() {
        wx.showToast({
          title: 'เปิดเมนูการแชร์',
          icon: 'success',
        });
        console.log('Share menu shown successfully');
      },
      fail() {
        console.log('Failed to show share menu');
      }
    });
  },

  // updateShareMenu() {
  //   wx.updateShareMenu({
  //     withShareTicket: true,
  //     success() {
  //       console.log('Share menu updated');
  //     },
  //     fail() {
  //       console.log('Failed to update share menu');
  //     }
  //   });

  // },

  // Show Loading
  showLoding() {
    wx.showLoading({
      title: 'กำลังโหลด...',
      mask: true,
    });

    setTimeout(() => {
      wx.hideLoading();
      console.log('โหลดเสร็จแล้ว');
    }, 4000);
  },



  // Show Modal
  showModal() {
    wx.showModal({
      title: 'คำเตือน',
      content: 'คุณต้องการดำเนินการนี้หรือไม่?',
      showCancel: true,
      cancelText: 'ยกเลิก',
      confirmText: 'ยืนยัน',
      success(res) {
        if (res.confirm) {
          console.log('ผู้ใช้เลือกยืนยัน');
        } else if (res.cancel) {
          console.log('ผู้ใช้เลือกยกเลิก');
        }
      },
      fail() {
        console.log('เกิดข้อผิดพลาดในการแสดง Modal');
      }
    });
  },

  // Show Toast
  showToast() {
    wx.showToast({
      title: 'สำเร็จ',
      icon: 'success',
      duration: 2000,
      success() {
        console.log('Toast แสดงผลสำเร็จ');
      },
      fail() {
        console.log('เกิดข้อผิดพลาดในการแสดง Toast');
      }
    });
  },


  // Upload File
  uploadFile() {
    wx.chooseImage({
      success(res) {
        const filePath = res.tempFilePaths[0];
        wx.uploadFile({
          url: 'http://localhost:8080/upload',
          filePath: filePath,
          name: 'file',
          formData: {
            'user': 'test'
          },
          success(uploadRes) {
            console.log('Upload success:', uploadRes);
            wx.showToast({
              title: 'อัปโหลดสำเร็จ',
              icon: 'success',
            });
          },
          fail(error) {
            console.log('Upload failed:', error);
            wx.showToast({
              title: 'อัปโหลดล้มเหลว',
              icon: 'error',
            });
          }
        });
      },
      fail() {
        wx.showToast({
          title: 'ไม่พบไฟล์',
          icon: 'error',
        });
      }
    });
  },

  // Connect Socket
  connectSocket() {
    const socket = wx.connectSocket({
      url: 'wss://echo.websocket.org',
      success() {
        console.log('WebSocket connected');
        wx.showToast({
          title: 'เชื่อมต่อ WebSocket สำเร็จ',
          icon: 'success',
        });
      },
      fail() {
        console.log('WebSocket connection failed');
        wx.showToast({
          title: 'เชื่อมต่อ WebSocket ล้มเหลว',
          icon: 'error',
        });
      }
    });

    // ฟังเหตุการณ์ต่าง ๆ ของ WebSocket
    socket.onOpen(() => {
      console.log('WebSocket เปิดการเชื่อมต่อ');
      socket.send({
        data: 'Hello, Server!'
      });
    });

    socket.onMessage((message) => {
      console.log('ได้รับข้อความจากเซิร์ฟเวอร์:', message.data);
    });

    socket.onClose(() => {
      console.log('WebSocket ปิดการเชื่อมต่อ');
    });

    socket.onError((error) => {
      console.log('เกิดข้อผิดพลาดใน WebSocket:', error);
    });
  },

  // Download File
  downloadFile() {
    wx.showLoading({
      title: 'กำลังดาวน์โหลด...',  // แสดงข้อความระหว่างโหลด
      mask: true  // จะป้องกันไม่ให้ผู้ใช้กดปุ่มอื่นในระหว่างดาวน์โหลด
    });

    wx.downloadFile({
      // url: 'http://localhost:8080/download/The2024.pdf',
      url: 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_10mb.mp4',
      success: (res) => {
        wx.hideLoading();  // ซ่อน loading เมื่อดาวน์โหลดเสร็จ

        if (res.statusCode === 200) {
          const tempFilePath = res.tempFilePath;
          console.log('ดาวน์โหลดไฟล์สำเร็จ:', tempFilePath);
          this.setData({
            info: 'ดาวน์โหลดไฟล์สำเร็จ: ' + tempFilePath
          });
        } else {
          wx.showToast({
            title: 'ดาวน์โหลดล้มเหลว',
            icon: 'error',
          });
        }
      },
      fail: (error) => {
        wx.hideLoading();
        console.log('ดาวน์โหลดล้มเหลว:', error);
        wx.showToast({
          title: 'ดาวน์โหลดล้มเหลว',
          icon: 'error',
        });
      }
    });
  },


  // 📥 ฟังก์ชันสำหรับเก็บข้อมูลใน Storage
  setStorageData() {
    try {
      wx.setStorageSync('username', 'admin');
      const storedData = wx.getStorageSync('username');
      this.setData({
        info: `✅ ข้อมูลถูกจัดเก็บเรียบร้อย!\nข้อมูลที่จัดเก็บ: ${storedData}`
      });
    } catch (e) {
      this.setData({ info: '❌ เกิดข้อผิดพลาดในการจัดเก็บข้อมูล' });
    }
  },

  // 📤 ฟังก์ชันสำหรับดึงข้อมูลจาก Storage
  getStorageData() {
    const data = wx.getStorageSync('username');
    if (data) {
      this.setData({ info: `📦 ข้อมูลที่ได้: ${data}` });
    } else {
      this.setData({ info: '⚠️ ไม่พบข้อมูลที่จัดเก็บ' });
    }
  },

  // 🗑️ ฟังก์ชันสำหรับลบข้อมูลใน Storage
  clearStorageData() {
    try {
      wx.clearStorage();
      this.setData({ info: '🗑️ ข้อมูลทั้งหมดถูกลบเรียบร้อยแล้ว!' });
    } catch (e) {
      this.setData({ info: '❌ ไม่สามารถลบข้อมูลได้' });
    }
  },

  reportEvent() {
    wx.reportEvent({
      event: 'purchase_button_click',
      params: {
        item_id: '12345',
        price: 100,
        user_id: 'user123'
      }
    });

    // แสดงข้อความเพื่อยืนยันว่าเหตุการณ์ถูกบันทึก
    wx.showToast({
      title: 'บันทึกเหตุการณ์เรียบร้อย!',
      icon: 'success'
    });
  },


  getCurrentLocation() {
    wx.getLocation({
      type: 'wgs84',
      success: (res) => {
        const latitude = res.latitude;
        const longitude = res.longitude;
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
        this.setData({ info: `Latitude: ${latitude}, Longitude: ${longitude}` });
      },
      fail: () => {
        wx.showToast({
          title: 'Failed to get location',
          icon: 'error',
        });
      }
    });
  },

  // ฟังก์ชันสำหรับเลือกตำแหน่งจากแผนที่
  chooseLocation() {
    wx.chooseLocation({
      success: (res) => {
        const name = res.name;
        const address = res.address;
        const latitude = res.latitude;
        const longitude = res.longitude;

        console.log(`Location chosen: ${name}, Address: ${address}`);
        this.setData({ info: `Location: ${name}, Address: ${address}, Latitude: ${latitude}, Longitude: ${longitude}` });
      },
      fail: () => {
        wx.showToast({
          title: 'Failed to choose location',
          icon: 'error',
        });
      }
    });
  },

  // ฟังก์ชันสำหรับเปิดตำแหน่งในแผนที่
  openLocation() {
    const latitude = 13.7102;
    const longitude = 100.433;
    const name = 'Example';
    const address = '22/44';

    wx.openLocation({
      latitude,
      longitude,
      name,
      address,
      scale: 18
    });

    this.setData({ info: `Opening Location: ${name}, Address: ${address}, Latitude: ${latitude}, Longitude: ${longitude}` });
  },

  scanQRCode() {
  wx.scanCode({
    success: (res) => {
      this.setData({ info: 'สแกน QR Code สำเร็จ' });
      const qrCodeUrl = res.result; // ค่าที่ได้จาก QR code

      if (qrCodeUrl) {
        // เปิด URL ในเบราว์เซอร์ภายนอก
        wx.openUrl({
          url: qrCodeUrl
        });

        // หรือคัดลอก URL ไปยังคลิปบอร์ด
        wx.setClipboardData({
          data: qrCodeUrl,
          success: () => {
            wx.showToast({
              title: 'คัดลอกลิงก์เรียบร้อย',
            });
          }
        });
      }
    },
    fail: (err) => {
      this.setData({ info: 'สแกน QR Code ไม่สำเร็จ' });
    }
  });
},




  saveFile() {
    wx.downloadFile({
      url: 'http://localhost:8080/download/The2024.pdf',
      success: (res) => {
        if (res.statusCode === 200) {
          const tempFilePath = res.tempFilePath;
          console.log('ดาวน์โหลดไฟล์สำเร็จ:', tempFilePath);

          wx.saveFile({
            tempFilePath: tempFilePath,
            success: (saveRes) => {
              console.log('บันทึกไฟล์สำเร็จ:', saveRes.savedFilePath);
              this.setData({
                info: 'ดาวน์โหลดและบันทึกไฟล์สำเร็จ: ' + saveRes.savedFilePath
              });

              // เปิดไฟล์ที่บันทึก
              this.openDocument(saveRes.savedFilePath);
            },
            fail: (err) => {
              console.log('บันทึกไฟล์ล้มเหลว:', err);
              wx.showToast({
                title: 'ไม่สามารถบันทึกไฟล์ได้',
                icon: 'error',
              });
            }
          });
        } else {
          wx.showToast({
            title: 'ดาวน์โหลดล้มเหลว',
            icon: 'error',
          });
        }
      },
      fail: (error) => {
        console.log('ดาวน์โหลดล้มเหลว:', error);
        wx.showToast({
          title: 'ดาวน์โหลดล้มเหลว',
          icon: 'error',
        });
      }
    });
  },

  openDocument(filePath) {
    wx.openDocument({
      filePath: filePath,
      success: (res) => {
        console.log('เปิดไฟล์สำเร็จ');
      },
      fail: (err) => {
        console.log('เปิดไฟล์ล้มเหลว:', err);
        wx.showToast({
          title: 'ไม่สามารถเปิดไฟล์ได้',
          icon: 'error',
        });
      }
    });
  },


  getSavedFileList() {
    wx.getSavedFileList({
      success: (res) => {
        console.log('Saved files:', res.fileList);

        const fileNames = res.fileList.map(file => file.filePath);
        this.setData({
          info: 'ไฟล์ที่บันทึกไว้: ' + fileNames.join(', ')
        });
      },
      fail: (error) => {
        console.log('Failed to get saved file list:', error);
        wx.showToast({
          title: 'ไม่สามารถดึงรายการไฟล์ได้',
          icon: 'error',
        });
      }
    });
  },



  chooseImage() {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        console.log('เลือกภาพสำเร็จ:', res.tempFilePaths);
        this.setData({
          imagePath: res.tempFilePaths[0]
        });
      },
      fail: (error) => {
        console.log('เลือกภาพล้มเหลว:', error);
        wx.showToast({
          title: 'เลือกภาพล้มเหลว',
          icon: 'error',
        });
      }
    });
  },

  createWorker() {
    try {
      const worker = wx.createWorker('workers/workers.js');

      if (worker) {
        console.log('✅ Worker Created Successfully');

        const messageToSend = 'Hello from main thread!';

        // 📤 ส่งข้อความไปยัง Worker
        worker.postMessage({
          action: 'start',
          data: messageToSend
        });

        // ✅ อัปเดต info สำหรับข้อความที่ส่ง
        this.setData({
          info: `📤 Sent: ${messageToSend}`
        });

        // 📩 รับข้อความตอบกลับจาก Worker
        worker.onMessage((msg) => {
          console.log('📥 Received from Worker:', msg.data);

          // ✅ เพิ่มข้อความที่ได้รับลงใน info
          this.setData({
            info: `${this.data.info}\n📥 Received: ${msg.data}`
          });

          wx.showToast({
            title: `Reply: ${msg.data}`,
            icon: 'success'
          });
        });

        // เก็บ worker ไว้ใช้งานภายหลัง
        this.worker = worker;
      } else {
        throw new Error('Failed to create worker');
      }
    } catch (error) {
      console.error('❗ Error:', error.message);
      wx.showToast({
        title: 'Worker Error',
        icon: 'error'
      });
    }
  },

  // ❌ ฟังก์ชันหยุดการทำงานของ Worker
  terminateWorker() {
    if (this.worker) {
      this.worker.terminate();
      console.log('❌ Worker Terminated');
      wx.showToast({
        title: 'Worker Terminated',
        icon: 'none'
      });
      this.worker = null;
    }
  },


  // ฟังก์ชันสำหรับการแสดงภาพในโหมดเต็มหน้าจอ
  previewImage() {
    const imageUrls = [
      'https://www.sarakadee.com/blog/oneton/wp-content/uploads/2017/12/cat-cute-e1533862828469.jpg',
      'https://s.isanook.com/wo/0/ud/46/231281/a.jpg?ip/crop/w670h402/q80/jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHBsaenrlQWuS4zFo4cYGm0wUACu1suziTbA&s'
    ];

    const currentImageUrl = imageUrls[0];

    wx.previewImage({
      current: currentImageUrl,
      urls: imageUrls
    });
  },

  login() {
    wx.login({
      success: (res) => {
        if (res.code) {
          console.log('✅ Login code:', res.code);

          wx.request({
            url: 'http://localhost:8080/login',
            method: 'POST',
            header: {
              'Content-Type': 'application/json',
            },
            data: { code: res.code },

            success: (response) => {
              console.log('🎯 Server response:', response.data);

              if (response.data && response.data.openid) {
                wx.showToast({
                  title: '🎉 Login Success!',
                  icon: 'success',
                });
                this.setData({
                  userInfo: response.data,
                });
              } else {
                wx.showToast({
                  title: '⚠️ Login Failed',
                  icon: 'none',
                });
                console.error('❗ Invalid response:', response.data);
              }
            },

            fail: (error) => {
              console.error('❌ Request failed:', error);
              wx.showToast({
                title: 'Network Error',
                icon: 'error',
              });
            },
          });
        } else {
          console.log('❗ Login failed:', res.errMsg);
          wx.showToast({
            title: 'Login Failed',
            icon: 'none',
          });
        }
      },

      fail: (err) => {
        console.error('❌ wx.login failed:', err);
        wx.showToast({
          title: 'Login Error',
          icon: 'error',
        });
      },
    });
  },

  copyLink() {
    wx.getClipboardData({
      success: (res) => {
        console.log('Clipboard content:', res.data);
        this.setData({
          copiedUrl: res.data,
        });
        wx.showToast({
          title: 'Link copied!',
          icon: 'none',
        });
      },
    });
  },

  fetchUserData() {
    const opts = {
      api_name: 'fetchExternalAPI',  // ชื่อ API ที่กำหนดเอง
      success: (res) => {
        console.log('API Response:', res);
        if (res.success) {
          this.setData({
            userData: res.data
          });
          // แจ้งเตือนเมื่อข้อมูลถูกส่งกลับมาจาก server
          wx.showToast({
            title: 'ข้อมูลถูกดึงเรียบร้อย',
            icon: 'success',
            duration: 2000  // ระยะเวลาที่แจ้งเตือนจะแสดง
          });
        } else {
          this.setData({
            errorMessage: 'ไม่สามารถดึงข้อมูลผู้ใช้ได้'
          });
          // แจ้งเตือนเมื่อไม่สามารถดึงข้อมูลได้
          wx.showToast({
            title: 'เกิดข้อผิดพลาดในการดึงข้อมูล',
            icon: 'none',
            duration: 2000
          });
        }
      },
      fail: (res) => {
        this.setData({
          errorMessage: 'เกิดข้อผิดพลาด: ' + res.errMsg
        });
        // แจ้งเตือนเมื่อเกิดข้อผิดพลาดในการเรียก API
        wx.showToast({
          title: 'ไม่สามารถเชื่อมต่อ API ได้',
          icon: 'none',
          duration: 2000
        });
      },
      complete: (res) => {
        console.log('API request completed', res);
      },
      data: { // ข้อมูลที่จะส่งไปยัง API
        url: 'http://localhost:8080/api/user',  // URL ของ API ภายนอก
        method: 'GET',  // HTTP Method
        headers: {
          'Content-Type': 'application/json'
        }
      }
    };

    wx.invokeNativePlugin(opts);
  },

});
