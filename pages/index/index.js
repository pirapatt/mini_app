Page({
  data: {
    imagePath: '',
    info: '',                  // ข้อมูลแสดงผล
    currentPage: 0,            // หน้าเริ่มต้น
    buttonsPerPage: 3,         // จำนวนปุ่มต่อหน้า
    title: '',                 // หัวข้อหน้า
    allButtons: [              // รายการปุ่มทั้งหมด
      { label: 'Get SystemInfoSync', action: 'getSystemInfoSync' },
      { label: 'Get UpdateManager', action: 'getUpdateManager' },
      { label: 'Get LaunchOptionsSync', action: 'getLaunchOptionsSync' },
      { label: 'NavigateTo', action: 'navigateTo' },
      { label: 'NavigateBack', action: '' },
      { label: 'EventChanel', action: 'handleEventChanelTap' },
      { label: 'ExitMiniProgram', action: 'handleExitMiniProgram' },
      { label: 'NavigateToMiniProgram', action: 'handleNavigateToMiniProgram' },
      { label: 'NavigateBackMiniProgram', action: '' },
      { label: 'ShowShareMenu', action: 'showShareMenu' },
      { label: 'UpdateShareMenu', action: 'updateShareMenu' },
      { label: 'OnCopyUrl', action: 'onCopyUrl' },
      { label: 'ShowLoding', action: 'showLoding' },
      { label: 'ShowModal', action: 'showModal' },
      { label: 'ShowToast', action: 'showToast' },
      { label: 'UploadFile', action: 'uploadFile' },
      { label: 'ConnectSocket', action: 'connectSocket' },
      { label: 'DownloadFile', action: 'downloadFile' },
      { label: 'SetStroageSync', action: 'setStorageData' },
      { label: 'GetStroage', action: 'getStorageData' },
      { label: 'ClearStroage', action: 'clearStorageData' },
      { label: 'ReportEvent', action: 'reportEvent' },
      { label: '', action: '' },
      { label: '', action: '' },
      { label: 'GoToCanvas', action: 'navigateToCanvas' },
      { label: '', action: '' },
      { label: '', action: '' },
      // { label: 'CreateOffscreenCanvas', action: '' },
      // { label: 'CreateCanvasContext', action: '' },
      // { label: 'CanvasToTempFilePath', action: '' },
      { label: 'CreateWorker', action: 'createWorkerFunction' },
      { label: '', action: '' },
      { label: '', action: '' },
      { label: 'CreateVideoContext', action: 'navigateToVideoContext' },
      { label: 'PreviewImage', action: 'previewImage' },
      { label: 'ChooseImage', action: 'chooseImage' },
      { label: 'CreateSelectorQuery', action: '' },
      { label: 'CreateIntersectionObserver', action: '' },
      { label: 'NodesRef', action: '' },
      { label: 'SaveFile & OpenDocument', action: 'saveFile' },
      { label: '', action: '' },
      { label: 'GetSavedFileList', action: 'getSavedFileList' },
      { label: 'ScanCode', action: 'scanQRCode' },
      { label: '', action: '' },
      { label: '', action: '' },
      { label: 'GetLocation', action: 'getCurrentLocation' },
      { label: 'ChooseLocation', action: 'chooseLocation' },
      { label: 'OpenLocation', action: 'openLocation' },
      { label: 'Login', action: '' },
      { label: 'CheckSession', action: '' },
      { label: 'GetUserProfile', action: '' },
      { label: 'SndWebviewEvent', action: '' },

    ],
    visibleButtons: []         // ปุ่มที่จะแสดงในหน้า
  },

  onLoad() {
    this.updateVisibleButtons();  // โหลดปุ่มสำหรับหน้าแรก
  },

  // ฟังก์ชันอัปเดตปุ่มที่แสดง
  updateVisibleButtons() {
    const { currentPage, buttonsPerPage, allButtons } = this.data;
    const start = currentPage * buttonsPerPage;
    const end = start + buttonsPerPage;
    const visibleButtons = allButtons.slice(start, end);  // ตัดแบ่งรายการปุ่มตามหน้า

    // กำหนด title สำหรับหน้า
    const pageTitles = [
      '1. Foundation',
      '2. Routing',
      '3. Jump',
      '4. Forward',
      '5. interface',
      '6. Internet',
      '7. Data Cache',
      '8. Data analysis',
      '9. Canvas',
      '10. Worker',
      '11. Media',
      '12. WXML',
      '13. Document',
      '14. Equipment',
      '15. Location',
      '16. Open Interfaces',
      '19. H5 Real-Time Communication',
    ];

    const title = pageTitles[currentPage] || `Page ${currentPage + 1}`;  // อัปเดตชื่อหัวข้อให้ตามหน้าที่แสดง

    this.setData({ visibleButtons, title });  // อัปเดตข้อมูลสำหรับแสดงผล
  },

  // ฟังก์ชันเรียกใช้งานเมื่อกดปุ่ม
  handleButtonTap(e) {
    const action = e.currentTarget.dataset.action;
    if (this[action]) {
      this[action]();
    }
  },

  // ฟังก์ชันสำหรับเปลี่ยนหน้า (Next)
  nextPage() {
    const { currentPage, buttonsPerPage, allButtons } = this.data;
    if ((currentPage + 1) * buttonsPerPage < allButtons.length) {
      this.setData(
        { currentPage: currentPage + 1 },
        () => this.updateVisibleButtons()   // เรียกอัปเดตปุ่มหลังเปลี่ยนหน้า
      );
    }
  },

  // ฟังก์ชันสำหรับเปลี่ยนหน้า (Previous)
  prevPage() {
    if (this.data.currentPage > 0) {
      this.setData(
        { currentPage: this.data.currentPage - 1 },
        () => this.updateVisibleButtons()   // เรียกอัปเดตปุ่มหลังเปลี่ยนหน้า
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
    updateManager.onCheckForUpdate((res) => {
      this.setData({ info: 'Has Update: ' + res.hasUpdate });
    });
  },

  //🚀 ฟังก์ชันสำหรับดึงข้อมูลการเปิดแอป เช่น วิธีที่ผู้ใช้เปิดแอป (ผ่าน QR Code, การแชร์, หรือปุ่มลัด)
  getLaunchOptionsSync() {
    const res = wx.getLaunchOptionsSync();
    this.setData({ info: JSON.stringify(res, null, 2) });
  },

  navigateTo() {
    // ใช้ wx.navigateTo เพื่อไปยังหน้าใหม่
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
    // ใช้ wx.navigateTo เพื่อไปยังหน้าใหม่
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
    // ใช้ wx.navigateTo เพื่อไปยังหน้าใหม่
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
      url: '/pages/newPage2/newPage2',  // ไปยังหน้าที่ต้องการ
      success: (res) => {
        // ใช้ EventChannel ในการส่งข้อมูล
        const eventChannel = res.eventChannel;
        eventChannel.emit('sendData', { message: 'Hello from first page! CCCCC' });
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
      appId: 'test_video',  // ใส่ appId ของ Mini Program ที่ต้องการนำทางไป
      path: 'pages/index/index',  // ระบุ path ถ้าต้องการไปยังหน้าที่เฉพาะ
      extraData: {
        key: 'value'  // ข้อมูลเพิ่มเติมที่ต้องการส่งไป
      },
      envVersion: 'release',  // สามารถเลือกสภาพแวดล้อม ('release', 'develop', 'trial')
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
      menus: ['shareAppMessage', 'shareTimeline'],  // ตัวเลือกการแชร์ที่ต้องการ
      success() {
        console.log('Share menu shown successfully');
      },
      fail() {
        console.log('Failed to show share menu');
      }
    });
  },

  updateShareMenu() {
    wx.updateShareMenu({
      withShareTicket: true,  // ถ้าต้องการให้สามารถแชร์โดยใช้ shareTicket
      success() {
        console.log('Share menu updated');
      },
      fail() {
        console.log('Failed to update share menu');
      }
    });

  },

  // Show Loading
  showLoding() {
    wx.showLoading({
      title: 'กำลังโหลด...',  // ข้อความที่จะแสดงในหน้าจอโหลด
      mask: true,              // ให้มีพื้นหลังมืดทับเหนือ UI เพื่อป้องกันการคลิก
    });

    // รอ 4 วินาทีแล้วซ่อนหน้าจอโหลด
    setTimeout(() => {
      wx.hideLoading();
      console.log('โหลดเสร็จแล้ว');
    }, 4000);
  },



  // Show Modal
  showModal() {
    wx.showModal({
      title: 'คำเตือน',             // หัวข้อของ Modal
      content: 'คุณต้องการดำเนินการนี้หรือไม่?',  // ข้อความใน Modal
      showCancel: true,             // การแสดงปุ่ม Cancel
      cancelText: 'ยกเลิก',        // ข้อความปุ่ม Cancel
      confirmText: 'ยืนยัน',       // ข้อความปุ่ม Confirm
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
      title: 'สำเร็จ',          // ข้อความที่จะแสดงใน Toast
      icon: 'success',          // ประเภทของไอคอน (success, loading, error)
      duration: 2000,           // ระยะเวลาที่ Toast จะแสดง (ในมิลลิวินาที)
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
    wx.downloadFile({
      url: 'http://localhost:8080/download/The2024.pdf',
      success: (res) => {
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
      wx.setStorageSync('username', 'pirapat');
      const storedData = wx.getStorageSync('username');
      this.setData({
        info: `✅ ข้อมูลถูกจัดเก็บเรียบร้อย! ข้อมูลที่จัดเก็บ: ${storedData}`
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

  onCopyUrl() {
    const url = 'https://yourwebsite2222.com';
    wx.onCopyUrl({
      data: url,  // ข้อมูลที่จะคัดลอก
      success() {
        wx.showToast({
          title: 'URL ได้ถูกคัดลอกแล้ว!',
          icon: 'success',
        });
      },
      fail() {
        wx.showToast({
          title: 'ไม่สามารถคัดลอกได้',
          icon: 'error',
        });
      }
    });
  },

  reportEvent() {
    // รายงานเหตุการณ์ 'purchase_button_click'
    wx.reportEvent({
      event: 'purchase_button_click',  // ชื่อของเหตุการณ์
      params: {
        item_id: '12345',  // ไอดีของสินค้าที่ถูกคลิก
        price: 100,        // ราคาสินค้า
        user_id: 'user123' // ไอดีผู้ใช้
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

  createWorkerFunction() {
    const worker = wx.createWorker('workers/worker.js');

    if (worker) {
      // ส่งข้อความไปยัง worker
      worker.postMessage({
        action: 'start',
        data: 'Hello from main thread!',
      });

      // ฟังการตอบกลับจาก worker
      worker.onMessage((msg) => {
        console.log('Received from worker:', msg.data);
      });
    } else {
      console.error('Failed to create worker');
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
  }




});
