let pcFlag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);

let YixinFlag = true;
let HWFlag = false;

try {
	window.ado.saveNativeData("ishw", "1").then((data) => {
		HWFlag = true;
	}).catch(error => {
		HWFlag = false;
		console.log(error);
	});
} catch (error) {
	HWFlag = false;
}

try {
	if (window.YixinJSBridge) {
		YixinJSBridge.invoke('getBaseAppId', '', function (e) { });
	} else {
		//添加监听事件
		document.addEventListener(
			"YixinJSBridgeReady",
			() => {
				YixinJSBridge.invoke('getBaseAppId', '', function (e) {
					YixinFlag = true;
				});
			},
			false
		);
	}

} catch (error) {
	YixinFlag = false;

}
let Foundation = {
	//获取appid
	getBaseAppId: function () {
		if (YixinFlag && !HWFlag) {
			return new Promise(function (resolve, reject) {
				let data = {};
				YixinJSBridge.invoke("getBaseAppId", data, e => {
					resolve(e.err_msg);
				})
			});
		} else {
			return new Promise(function (resolve, reject) {
				window.ado.parameters("token", "tenant_code", "tenant_name", "language", "user_id", "user_account", "user_name", "user_mobile", "user_email", "user_sub_account", "user_sub_account_list", "tenant_regions", "tenant_roles", "tenant_orgs", "mobile_model", "virtual_directory", "public_url").then(data => {
					resolve(JSON.stringify(data.data));
					//-----------------
					// let dataJson = {};
					// dataJson['status'] = data.code;
					// dataJson['user_name'] = data.data.user_name;
					// dataJson['user_mobile'] = data.data.user_mobile;
					// dataJson['user_account'] = data.data.user_account;
					// //-----------------

					// resolve(JSON.stringify(dataJson));
				}).catch(error => {
					console.log(error);
				});
			});
		}
	},

	//获取定位
	getCurrentPosition: function () {
		if (YixinFlag && !HWFlag) {
			return new Promise(function (resolve, reject) {
				let data = {};
				data.reqLocAddrStr = "1";
				YixinJSBridge.invoke("getCurrentPositionGD", data, e => {
					resolve(e.err_msg);
				})
			});
		} else {
			return new Promise(function (resolve, reject) {

				window.ado
					.startLocationFromBaidu({
						timeout: 3000,
						loop: false,
						coordinateType: "BD09",
						accuracy: true,
						loadAddress: true,
					})
					.then((res) => {
						//-----------------
						let dataJson = {};
						dataJson['status'] = res.code;
						dataJson['latitude'] = res.data.cur.lat;
						dataJson['lontitude'] = res.data.cur.lng;
						dataJson['locAddrStr'] = res.data.cur.address;
						//-----------------
						resolve(JSON.stringify(dataJson));
					})
					.catch((error) => {
						console.log(error);
					});
			});
		}
	},

	//关闭当前页 无返回值
	closePage: function () {

		if (YixinFlag && !HWFlag) {
			return new Promise(function (resolve, reject) {
				YixinJSBridge.invoke("closePage", '', e => {
					resolve(e.err_msg);
				})
			});
		} else {
			return new Promise(function (resolve, reject) {
				window.ado.close().then(data => {
					resolve(JSON.stringify(data));
				}).catch(error => {
					console.log(error);
				});
			});

		}
	},

	//打开新的webview 无返回值
	startNewWebView: function (url, title, titletext) {
		if (YixinFlag && !HWFlag) {
			return new Promise(function (resolve, reject) {
				let data = {};
				data.url = url;
				if (title == "1") {
					data.hideTitle = "1";
				} else {
					data.hideTitle = "0";
				}
				YixinJSBridge.invoke("startNewWebView", data, e => {
					resolve(e.err_msg);
				})

			});
		} else {
			if (title == "1") {

				return new Promise(function (resolve, reject) {
					window.ado.open(url, true, titletext).then(data => {
						resolve(JSON.stringify(data));
					}).catch(error => {
						console.log(error);
					});
				});
			} else {

				return new Promise(function (resolve, reject) {
					window.ado.open(url).then(data => {
						resolve(JSON.stringify(data));
					}).catch(error => {
						console.log(error);
					});
				});
			}
		}
	},
	//获取多张图片
	getMultiplePhotos: function (num, rate) {
		if (YixinFlag && !HWFlag) {
			return new Promise(function (resolve, reject) {
				let data = {};
				data.maxNum = num;
				data.rate = rate;
				YixinJSBridge.invoke("getMultiplePhotos", data, e => {
					resolve(e.err_msg);
				})
			});
		} else {

			let max = num;
			let maxWidth = 1000;
			let maxHeight = 1000;
			let quality = 80;
			let callbackType = 2;
			return new Promise(function (resolve, reject) {
				window.ado.selectImageFromAlbum({ "maxNumber": max, "maxWidth": maxWidth, "maxHeight": maxHeight, "quality": quality, "callbackType": callbackType }).then(data => {
					if (data.code == 1) {
						let dataJson = {};
						let imageArr = [];
						dataJson['status'] = data.code;
						for (let index = 0; index < data.data.length; index++) {
							let imageJson = {};
							imageJson['image'] = data.data[index].base64;
							imageJson['imageType'] = data.data[index].extension;
							imageJson['imageName'] = data.data[index].fileName;
							imageArr.push(imageJson);
						}
						dataJson['images'] = imageArr;
						resolve(JSON.stringify(dataJson));
					} else {
						let dataJson = {};
						dataJson['status'] = 0;
						resolve(JSON.stringify(dataJson));
					}

				}).catch(error => {

				});

			});


		}
	},

	//获取蓝牙设备
	selectBLEDevice: function () {
		if (YixinFlag && !HWFlag) {
			return new Promise(function (resolve, reject) {
				let data = {};
				data.type = "1";
				YixinJSBridge.invoke("selectBLEDevice", data, e => {
					resolve(e.err_msg);
				})
			});
		} else {
			return new Promise(function (resolve, reject) {
				window.ado.bluetoothPairing("").then((data) => {
					//resolve(JSON.stringify(data));
					//-----------------
					let dataJson = {};
					dataJson['status'] = data.code;
					dataJson['deviceID'] = data.data.address;
					dataJson['deviceName'] = data.data.name;
					resolve(JSON.stringify(dataJson));
					//-----------------
				}).catch(error => {
					console.log(error);
				});
			});
		}
	},

	//读卡尔设备
	getKAERIDCard: function (deviceID, deviceName) {
		if (YixinFlag && !HWFlag) {
			return new Promise(function (resolve, reject) {
				let data = {};
				data.deviceID = deviceID;
				data.deviceName = deviceName;
				YixinJSBridge.invoke("getKAERIDCard", data, e => {
					resolve(e.err_msg);
				})
			});
		} else {
			return new Promise(function (resolve, reject) {
				window.ado.getIDCardFromBluetooth({ "deviceType": "0", "address": deviceID }).then((data) => {
					//resolve(JSON.stringify(data));
					//-----------------
					let dataJson = {};
					dataJson['status'] = data.code;
					dataJson['idNum'] = data.data.idNum;
					dataJson['idName'] = data.data.idName;
					dataJson['idAddress'] = data.data.idAddress;
					dataJson['idNation'] = data.data.idNation;
					dataJson['idSex'] = data.data.idSex;
					dataJson['image'] = data.data.image;
					dataJson['idOrg'] = data.data.idOrg;
					dataJson['idDate'] = data.data.idCertvalidDate + "-" + data.data.idCertexpDate;
					if (data.code == '1') {
						dataJson['desc'] = '读卡成功';
					} else {
						dataJson['desc'] = '读卡失败';
					}
					resolve(JSON.stringify(dataJson));
					//-----------------
				}).catch(error => {
					console.log(error);
				})
			});
		}
	},

	//读森瑞设备
	getSRIDCard: function (deviceID, deviceName) {
		if (YixinFlag && !HWFlag) {
			return new Promise(function (resolve, reject) {
				let data = {};
				data.deviceID = deviceID;
				data.deviceName = deviceName;
				YixinJSBridge.invoke("getSRIDCard", data, e => {
					resolve(e.err_msg);
				})
			});
		} else {
			return new Promise(function (resolve, reject) {
				window.ado.getIDCardFromBluetooth({ "deviceType": "1", "address": deviceID }).then((data) => {

					//resolve(JSON.stringify(data));
					//-----------------
					let dataJson = {};
					dataJson['status'] = data.code;
					dataJson['idNum'] = data.data.idNum;
					dataJson['idName'] = data.data.idName;
					dataJson['idAddress'] = data.data.idAddress;
					dataJson['idNation'] = data.data.idNation;
					dataJson['idSex'] = data.data.idSex;
					dataJson['image'] = data.data.image;
					dataJson['idOrg'] = data.data.idOrg;
					dataJson['idDate'] = data.data.idCertvalidDate + "-" + data.data.idCertexpDate;
					if (data.code == '1') {
						dataJson['desc'] = '读卡成功';
					} else {
						dataJson['desc'] = '读卡失败';
					}
					resolve(JSON.stringify(dataJson));
					//-----------------
				}).catch(error => {
					console.log(error);
				})
			});
		}

	},

	//获取电子签名
	getElectronicSignature: function () {
		if (YixinFlag && !HWFlag) {
			return new Promise(function (resolve, reject) {
				let data = {};
				YixinJSBridge.invoke("getElectronicSignature", data, e => {
					resolve(e.err_msg);
				})
			});
		} else {
			return new Promise(function (resolve, reject) {
				window.ado.getSignatureImage({ "width": "1000", "height": "1000", "quality": 100 }).then((data) => {
					if (data.data != "" && data.data != null) {
						let dataJson = {};
						dataJson['image'] = data.data;
						resolve(JSON.stringify(dataJson));

					} else {
						let dataJson = {};
						dataJson['image'] = "";
						resolve(JSON.stringify(dataJson));

					}
				}).catch(error => {
					console.log(error);
				});
			});
		}
	},

	//预览附件 无返回值
	previewFile: function (url) {
		if (YixinFlag && !HWFlag) {

			//获取设备类型
			let agent = navigator.userAgent
			let isAndroid =agent.indexOf("Android") > -1 || agent.indexOf("Linux") > -1; //Android
			let isIOS = !!agent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //iOS
			if (isAndroid) {
				window.open(url, "_blank");
			}
			if (isIOS) {
				return new Promise(function (resolve, reject) {
					let data = {};
					data.url = url;
					YixinJSBridge.invoke("previewFile", data, e => {
						resolve(e.err_msg);
					})
				});

			}

		} else {
			return new Promise(function (resolve, reject) {
				window.ado.systemOpenFile(url).then((data) => {
					//resolve(JSON.stringify(data));
					//-----------------
					let dataJson = {};
					dataJson['status'] = data.code;
					resolve(JSON.stringify(dataJson));
					//-----------------
				}).catch(error => {
					console.log(error);
				});
			});
		}
	},
	//设置本地存储
	setLocalItem: function (key, value) {
		if (YixinFlag && !HWFlag) {
			return new Promise(function (resolve, reject) {
				let data = {};
				data.appid = "cqyiqi";
				data.key = key;
				data.value = value;
				YixinJSBridge.invoke("setLocalItem", data, e => {
					resolve(e.err_msg);
				})
			});
		} else {
			return new Promise(function (resolve, reject) {
				window.ado.saveNativeData(key, value).then((data) => {
				}).catch(error => {
					console.log(error);
				});
			});
		}
	},

	//获取本地存储
	getLocalItem: function (key) {
		if (YixinFlag && !HWFlag) {
			return new Promise(function (resolve, reject) {
				let data = {};
				data.appid = "cqyiqi";
				data.key = key;
				YixinJSBridge.invoke("getLocalItem", data, e => {
					resolve(e.err_msg);
				})
			});
		} else {
			return new Promise(function (resolve, reject) {
				window.ado.getNativeData(key).then((data) => {
					//-----------------
					let dataJson = {};
					dataJson['value'] = data.data;
					resolve(JSON.stringify(dataJson));
					//-----------------
				}).catch(error => {
					console.log(error);
				});
			});
		}
	},

	//清除本地存储
	clearLocalStore: function () {
		if (YixinFlag && !HWFlag) {
			return new Promise(function (resolve, reject) {
				let data = {};
				data.appid = "cqyiqi";
				YixinJSBridge.invoke("clearLocalStore", data, e => {
					resolve(e.err_msg);
				})
			});
		}
	},

	//获取用户信息
	getUserInfo: function () {
		if (YixinFlag && !HWFlag) {
			return new Promise(function (resolve, reject) {
				let data = {};
				YixinJSBridge.invoke("getUserInfo", data, e => {
					resolve(e.err_msg);
				})
			});
		}
	},

	//显示登录页面
	showLoginPage: function () {
		if (YixinFlag && !HWFlag) {
			return new Promise(function (resolve, reject) {
				let data = {};
				YixinJSBridge.invoke("showLoginPage", data, e => {
					resolve(e.err_msg);
				})
			});
		}
	},

	//显示退出 切换账号菜单
	showLogoutMenu: function () {
		if (YixinFlag && !HWFlag) {
			return new Promise(function (resolve, reject) {
				let data = {};
				data.type = "custom_cqyiqi";
				YixinJSBridge.invoke("showLogoutMenu", data, e => {
					resolve(e.err_msg);
				})
			});
		}
	},

	//易信登录验证
	validateAppCredential: function (phone, password) {
		if (YixinFlag && !HWFlag) {
			return new Promise(function (resolve, reject) {
				let data = {};
				data.account = phone;
				data.password = password;
				data.countryCode = "0086";
				data.useGesture = "0";
				YixinJSBridge.invoke("validateAppCredential", data, e => {
					resolve(e.err_msg);
				})
			});
		}
	},

	//选择app的bar
	selectAppBar: function (index, refresh) {
		if (YixinFlag && !HWFlag) {
			return new Promise(function (resolve, reject) {
				let data = {};
				data.index = index;
				data.refresh = refresh;
				YixinJSBridge.invoke("selectAppBar", data, e => {
					resolve(e.err_msg);
				})
			});
		}
	},

	//水印相机
	getPhoto2: function (rate, currTime, position, watermark, phoneNo) {
		if (YixinFlag && !HWFlag) {
			return new Promise(function (resolve, reject) {
				let data = {};
				data.source = "2";
				data.rate = "1";
				data.currTime = "1";
				data.position = "1";
				data.watermark = "0";
				data.phoneNo = phoneNo;
				data.rateScale = "0.5";
				YixinJSBridge.invoke("getPhoto2", data, e => {
					resolve(e.err_msg);
				})
			});
		} else {


			return new Promise(function (resolve, reject) {

				window.ado
					.selectImageFromCustomCamera({
						watermarkText: [currTime, position, phoneNo],
						watermarkPosition: "1",
						maxWidth: "1000",
						maxHeight: "1000",
						quality: "85",
						showProgress: true,
						callbackType: "2"
					})
					.then(data => {
						//resolve(JSON.stringify(data));
						//-----------------
						let dataJson = {};
						dataJson['status'] = data.code;
						dataJson['image'] = data.data[0].base64;
						dataJson['imageType'] = data.data[0].extension;
						dataJson['imagePath'] = data.data[0].fileName;
						resolve(JSON.stringify(dataJson));
						//-----------------
					})
					.catch(error => {
						console.log(error);
					});

			});
		}
	},


	//获取照片base64
	getPhoto: function (source, rate) {
		if (YixinFlag && !HWFlag) {
			return new Promise(function (resolve, reject) {
				let data = {};
				data.source = "2";
				data.rate = "1";
				YixinJSBridge.invoke("getPhoto", data, e => {
					resolve(e.err_msg);
				})
			});
		} else {
			return new Promise(function (resolve, reject) {

				let Width = 1000;
				let Height = 1000;
				let quality = 85;
				let callbackType = 2;
				window.ado.selectImageFromSystemCamera(Width, Height, quality, callbackType).then((data) => {
					if (data.code == 1) {
						let dataJson = {};
						dataJson['image'] = data.data[0].base64;
						dataJson['imageType'] = data.data[0].extension;
						dataJson['imagePath'] = data.data[0].fileName;
						resolve(JSON.stringify(dataJson));
					} else {
						let dataJson = {};
						dataJson['status'] = 0;
						resolve(JSON.stringify(dataJson));

					}
				}).catch(error => {
					console.log(error);
				});
			});
		}
	},

	//获取一段录像的截图
	getVideoScreenshots: function (source) {
		if (YixinFlag && !HWFlag) {
			return new Promise(function (resolve, reject) {
				let data = {};
				data.source = source;
				YixinJSBridge.invoke("getVideoScreenshots", data, e => {
					resolve(e.err_msg);
				})
			});
		}
	},

	//打开app（app间的跳转）
	openApp: function (url) {
		if (YixinFlag && !HWFlag) {
			return new Promise(function (resolve, reject) {
				let data = {};
				data.url = url;
				YixinJSBridge.invoke("openApp", data, e => {
					resolve(e.err_msg);
				})
			});
		}
	},

	//查询是否安装了其他app
	queryAppIsInstalled: function (appid, urlscheme) {
		if (YixinFlag && !HWFlag) {
			return new Promise(function (resolve, reject) {
				let data = {};
				data.appid = appid;
				data.urlscheme = urlscheme;
				YixinJSBridge.invoke("queryAppIsInstalled", data, e => {
					resolve(e.err_msg);
				})
			});
		}
	},

	//关闭app
	closeApp: function () {
		if (YixinFlag && !HWFlag) {
			return new Promise(function (resolve, reject) {
				let data = {};
				YixinJSBridge.invoke("closeApp", data, e => {
					resolve(e.err_msg);
				})
			});
		}
	},

	//获取app被拉起时的url
	getUrlWithAppActivated: function () {
		if (YixinFlag && !HWFlag) {
			return new Promise(function (resolve, reject) {
				let data = {};
				YixinJSBridge.invoke("getUrlWithAppActivated", data, e => {
					resolve(e.err_msg);
				})
			});
		}
	},

	//app开启持续定位
	startBGLocation: function (time, distance, deviceID) {
		if (YixinFlag && !HWFlag) {
			return new Promise(function (resolve, reject) {
				let data = {};
				data.time = time;
				data.distance = distance;
				data.deviceID = deviceID;
				YixinJSBridge.invoke("startBGLocation", data, e => {
					resolve(e.err_msg);
				})
			});
		} else {
			return new Promise(function (resolve, reject) {
				resolve("");
			});

		}
	},

	//获取手机截图
	getScreenshotInfo: function () {
		if (YixinFlag && !HWFlag) {
			return new Promise(function (resolve, reject) {
				let data = {};
				YixinJSBridge.invoke("getScreenshotInfo", data, e => {
					resolve(e.err_msg);
				})
			});
		}
	},

	//融合app人脸识别
	faceDetection: function (reqUrl, reqBody, header) {
		if (!(YixinFlag && !HWFlag)) {
			return new Promise(function (resolve, reject) {
				window.ado
					.faceDetection({
						requestUrl: reqUrl,
						requestBody: reqBody,
						requestHeaders: header,
					})
					.then((data) => {
						resolve(data);
					})
					.catch((error) => {
						console.log(error);
					});
			});

		}
	},


	//禁止页面翻转
	setWebRotateAble: function () {
		if (YixinFlag && !HWFlag) {
			return new Promise(function (resolve, reject) {
				let data = {};
				data.enable = "false";
				YixinJSBridge.invoke("setWebRotateAble", data, e => {
					resolve(e.err_msg);
				})
			});
		}
	},

	//判断是易信还是华为 易信的话返回true 华为的话返回false
	YixinOrHW: function () {
	  var flag
		if (YixinFlag && !HWFlag) {
      flag= true;
		} else {
      flag= false;
		}
    return flag;

	},

};


export default Foundation
