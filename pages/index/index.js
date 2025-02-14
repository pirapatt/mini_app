
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
          { label: 'NavigateToMiniProgram', action: 'handleNavigateToMiniProgram' },
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
      {
        category: 'Custom APIs',
        buttons: [
          { label: 'CallApiRegistered', action: 'callApiRegistered' },
        ]
      },
      {
        category: 'Flutter Param',
        buttons: [
          { label: 'LaunchOptions', action: 'launchOptions' },
        ]
      },
    ],
  },

  onLoad() {
    let that = this;
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userLocation']) {
          // ถ้ายังไม่ได้อนุญาตการเข้าถึงตำแหน่ง
          wx.authorize({
            scope: 'scope.userLocation',
            success() {
              // ถ้าอนุญาตแล้ว ก็สามารถดึงตำแหน่งได้
              wx.getLocation({
                success: (res) => {
                  const latitude = res.latitude;
                  const longitude = res.longitude;
                  console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
                  that.setData({  // ใช้ that เพื่อเรียก setData
                    info: `Latitude: ${latitude}, Longitude: ${longitude}`
                  });
                },
                fail: (error) => {
                  console.log('ไม่สามารถดึงตำแหน่งได้:', error);
                  that.setData({
                    info: 'ไม่สามารถดึงตำแหน่งได้: ' + error.errMsg
                  });
                }
              });
            },
            fail() {
              // ถ้าผู้ใช้ไม่อนุญาต
              wx.showToast({
                title: 'โปรดอนุญาตการเข้าถึงตำแหน่ง',
                icon: 'error'
              });
              that.setData({
                info: 'โปรดอนุญาตการเข้าถึงตำแหน่ง'
              });
            }
          });
        } else {
          // ถ้าอนุญาตแล้ว ดึงตำแหน่งได้เลย
          wx.getLocation({
            success: (res) => {
              const latitude = res.latitude;
              const longitude = res.longitude;
              console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
              that.setData({
                info: `Latitude: ${latitude}, Longitude: ${longitude}`
              });
            },
            fail: (error) => {
              console.log('ไม่สามารถดึงตำแหน่งได้:', error);
              that.setData({
                info: 'ไม่สามารถดึงตำแหน่งได้: ' + error.errMsg
              });
            }
          });
        }
      }
    });
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

  showShareMenu() {
    wx.showShareMenu({
      showShareItems: ['qq', 'qzone', 'wechatFriends', 'wechatMoment'],
      success() {
        wx.showToast({
          title: 'เปิดเมนูการแชร์',
          icon: 'success',
        });
        this.setData({
          info: 'เมนูการแชร์เปิดสำเร็จ'
        });
        console.log('Share menu shown successfully');
      },
      fail(error) {
        this.setData({
          info: 'ไม่สามารถเปิดเมนูการแชร์: ' + error.errMsg
        });
        console.log('Failed to show share menu', error);
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
          url: 'https://testfile.free.beeceptor.com',
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
      title: 'กำลังดาวน์โหลด...',
      mask: true
    });

    wx.downloadFile({
      url: 'https://server-for-miniapp.onrender.com/download/Test_PDF.pdf',
      success: (res) => {
        wx.hideLoading();

        if (res.statusCode === 200) {
          const tempFilePath = res.tempFilePath;

          console.log('ดาวน์โหลดไฟล์สำเร็จ:', tempFilePath);

          wx.showToast({
            title: 'ดาวน์โหลดสำเร็จ',
            icon: 'success',
          });
          this.setData({
            info: 'ดาวน์โหลดไฟล์สำเร็จ: ' + tempFilePath + '\nStatus Code: ' + res.statusCode
          });
        } else {
          wx.showToast({
            title: 'ดาวน์โหลดล้มเหลว (Status Code: ' + res.statusCode + ')',
            icon: 'error',
          });
          console.log('ดาวน์โหลดล้มเหลว, Status Code:', res.statusCode);

          this.setData({
            info: 'ดาวน์โหลดล้มเหลว (Status Code: ' + res.statusCode + ')'
          });
        }
      },
      fail: (error) => {
        wx.hideLoading();
        console.log('ดาวน์โหลดล้มเหลว:', error);
        wx.showToast({
          title: 'ดาวน์โหลดล้มเหลว (Error: ' + error.errMsg + ')',
          icon: 'error',
        });
        this.setData({
          info: 'ดาวน์โหลดล้มเหลว (Error: ' + error.errMsg + ')'
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

    wx.showToast({
      title: 'บันทึกเหตุการณ์เรียบร้อย!',
      icon: 'success'
    });
  },

  getCurrentLocation() {
    return new Promise((resolve, reject) => {
      wx.getLocation({
        success: (res) => {
          const latitude = res.latitude;
          const longitude = res.longitude;
          console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
          this.setData({
            info: `Latitude: ${latitude}, Longitude: ${longitude}`,
          });
          resolve(res); // ส่งค่าผลลัพธ์เมื่อสำเร็จ
        },
        fail: (error) => {
          console.log('Error:', error);
          this.setData({
            info: 'Failed to get location: ' + error.errMsg,
          });
          wx.showToast({
            title: 'Failed to get location: ' + error.errMsg,
            icon: 'error',
          });
          reject(error); // ส่งข้อผิดพลาดเมื่อไม่สามารถดึงตำแหน่งได้
        }
      });
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

        console.log(`Location chosen: ${name}, Address: ${address}, Latitude: ${latitude}, Longitude: ${longitude}`);
        this.setData({
          info: `Location: ${name}, Address: ${address}, Latitude: ${latitude}, Longitude: ${longitude}`,
        });
      },
      fail: (error) => {
        console.log('Error:', error);  // แสดงข้อผิดพลาดใน console
        this.setData({
          info: 'Failed to choose location: ' + error.errMsg
        });
        wx.showToast({
          title: 'Failed to choose location: ' + error.errMsg,  // แสดงข้อความผิดพลาดใน Toast
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

    try {
      wx.openLocation({
        latitude,
        longitude,
        name,
        address,
        scale: 18,
        success: () => {
          this.setData({
            info: `เปิดตำแหน่ง: ${name}, ที่อยู่: ${address}, ละติจูด: ${latitude}, ลองจิจูด: ${longitude}`
          });
        },
        fail: (error) => {
          console.log('ไม่สามารถเปิดแผนที่ได้:', error);
          wx.showToast({
            title: 'ไม่สามารถเปิดแผนที่ได้',
            icon: 'error',
          });
          this.setData({
            info: `ไม่สามารถเปิดตำแหน่งได้ (Error: ${error.errMsg})`
          });
        }
      });
    } catch (error) {
      console.log('เกิดข้อผิดพลาด:', error);
      wx.showToast({
        title: 'เกิดข้อผิดพลาดในการเปิดแผนที่',
        icon: 'error',
      });
      this.setData({
        info: `เกิดข้อผิดพลาดในการเปิดแผนที่: ${error.message}`
      });
    }
  },

  scanQRCode() {
    wx.scanCode({
      success: (res) => {
        this.setData({ info: 'สแกน QR Code สำเร็จ' });
        const qrCodeUrl = res.result;

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
    wx.showLoading({
      title: 'กำลังดาวน์โหลด...',
      mask: true
    });

    const fs = wx.getFileSystemManager();

    wx.downloadFile({
      url: 'https://server-for-miniapp.onrender.com/download/Test_PDF.pdf',
      success: (res) => {
        wx.hideLoading();
        if (res.statusCode === 200) {
          const tempFilePath = res.tempFilePath;
          console.log('ดาวน์โหลดไฟล์สำเร็จ:', tempFilePath);

          fs.saveFile({
            tempFilePath: tempFilePath,
            success: (saveRes) => {
              console.log('บันทึกไฟล์สำเร็จ:', saveRes.savedFilePath);
              this.setData({
                info: 'ดาวน์โหลดและบันทึกไฟล์สำเร็จ: ' + saveRes.savedFilePath + '\nStatus Code: ' + res.statusCode
              });
              wx.showToast({
                title: 'บันทึกไฟล์สำเร็จ',
                icon: 'success',
              });

              // เปิดไฟล์ที่บันทึก
              wx.openDocument({
                filePath: saveRes.savedFilePath,
                success: (openRes) => {
                  console.log('เปิดไฟล์สำเร็จ');
                  wx.showToast({
                    title: 'เปิดไฟล์สำเร็จ',
                    icon: 'success',
                  });
                },
                fail: (err) => {
                  console.log('เปิดไฟล์ล้มเหลว:', err);
                  wx.showToast({
                    title: 'ไม่สามารถเปิดไฟล์ได้',
                    icon: 'error',
                    duration: 5000
                  });
                }
              });

            },
            fail: (err) => {
              console.log('บันทึกไฟล์ล้มเหลว:', err);
              wx.showToast({
                title: 'ไม่สามารถบันทึกไฟล์ได้',
                icon: 'error',
              });
              // แสดงข้อความการบันทึกล้มเหลวใน setData
              this.setData({
                info: 'ไม่สามารถบันทึกไฟล์ได้ (Error: ' + err.errMsg + ')'
              });
            }
          });
        } else {
          wx.showToast({
            title: 'ดาวน์โหลดล้มเหลว (Status Code: ' + res.statusCode + ')',
            icon: 'error',
          });
          console.log('ดาวน์โหลดล้มเหลว, Status Code:', res.statusCode);

          // แสดงข้อความสถานะดาวน์โหลดล้มเหลวใน setData
          this.setData({
            info: 'ดาวน์โหลดล้มเหลว (Status Code: ' + res.statusCode + ')'
          });
        }
      },
      fail: (error) => {
        console.log('ดาวน์โหลดล้มเหลว:', error);
        wx.showToast({
          title: 'ดาวน์โหลดล้มเหลว (Error: ' + error.errMsg + ')',
          icon: 'error',
        });

        // แสดงข้อความสถานะดาวน์โหลดล้มเหลวใน setData
        this.setData({
          info: 'ดาวน์โหลดล้มเหลว (Error: ' + error.errMsg + ')'
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
      // ตรวจสอบว่าอุปกรณ์รองรับ Web Worker หรือไม่
      if (!wx.canIUse('createWorker')) {
        console.log('❌ อุปกรณ์ไม่รองรับ Web Worker');
        this.setData({ info: 'อุปกรณ์ไม่รองรับ Web Worker' });
        return;  // หยุดทำงานถ้าอุปกรณ์ไม่รองรับ
      }

      // ตรวจสอบว่า Worker เดิมยังทำงานอยู่หรือไม่ ถ้ามีให้ยุติ
      if (this.worker) {
        console.log('❌ Worker กำลังทำงานอยู่! ทำการยุติการทำงาน');
        this.worker.terminate();  // ยุติการทำงานของ Worker เดิม
      }

      // สร้าง Web Worker ใหม่
      const worker = wx.createWorker('workers/workers.js');

      if (worker) {
        console.log('✅ Worker Created Successfully');

        const messageToSend = 'Hello from main thread!';

        // 📤 ส่งข้อความไปยัง Worker
        worker.postMessage({
          data: messageToSend
        });

        // ✅ อัปเดต info สำหรับข้อความที่ส่ง
        this.setData({
          info: `📤 Sent: ${messageToSend}`
        });

        // แสดง toast ว่าการส่งข้อมูลสำเร็จ
        wx.showToast({
          title: 'ข้อมูลถูกส่งไปยัง Worker!',
          icon: 'success',
          duration: 2000
        });

        // 📩 รับข้อความตอบกลับจาก Worker
        worker.onMessage((msg) => {
          console.log('📥 Received from Worker:', msg.data);

          // ✅ เพิ่มข้อความที่ได้รับลงใน info
          this.setData({
            info: `${this.data.info}\n📥 Received: ${msg.data}`
          });

          // แสดง toast สำหรับการตอบกลับจาก Worker
          wx.showToast({
            title: `Reply: ${msg.data}`,
            icon: 'success',
            duration: 2000
          });
        });

        // เก็บ worker ไว้ใช้งานภายหลัง
        this.worker = worker;
      } else {
        throw new Error('Failed to create worker');
      }
    } catch (error) {
      console.error('❗ Error:', error.message);
      this.setData({
        info: error.errMsg
      });
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

  //miniApp to flutter
  callApiRegistered() {
    this.getCurrentLocation()
      .then((location) => {
        var opts = {
          api_name: 'testMyApi',
          success: function (res) {
            console.log(res);
            wx.showToast({
              title: 'Success!',
              icon: 'success',
            });
          },
          fail: function (res) {
            console.log(res);
          },
          complete: function (res) {
            console.log(res);
            wx.showToast({
              title: 'Success!',
              icon: 'success',
            });
          },
          data: {
            latitude: location.latitude,
            longitude: location.longitude
          }
        };

        // เรียก wx.invokeNativePlugin ด้วย options ที่ได้จากการเก็บตำแหน่ง
        wx.invokeNativePlugin(opts);
      })
      .catch((error) => {
        console.error('Error getting location: ', error);
        wx.showToast({
          title: 'ไม่สามารถดึงตำแหน่งได้',
          icon: 'error',
        });
      });
  },

  //ส่งมาจาก Flutter เพื่อกำหนดค่าเริ่มต้นใน Mini Program
  launchOptions() {
    var paramFromFlutter = wx.getLaunchOptionsSync()
    const val = "Client param: " + JSON.stringify(paramFromFlutter.extendData)
    this.setData({
      info: val
    })
  }
});
