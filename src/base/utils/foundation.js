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
var Foundation = {
	//获取appid
	getBaseAppId: function () {
		if (YixinFlag && !HWFlag) {
			return new Promise(function (resolve, reject) {
				var data = new Object();
				YixinJSBridge.invoke("getBaseAppId", data, e => {
					resolve(e.err_msg);
				})
			});
		} else {
			return new Promise(function (resolve, reject) {
				window.ado.parameters("token", "tenant_code", "tenant_name", "language", "user_id", "user_account", "user_name", "user_mobile", "user_email", "user_sub_account", "user_sub_account_list", "tenant_regions", "tenant_roles", "tenant_orgs", "mobile_model", "virtual_directory", "public_url").then(data => {
					resolve(JSON.stringify(data.data));
					//-----------------
					// var dataJson = {};
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
				var data = new Object();
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
						var dataJson = {};
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
				var data = new Object();
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
				var data = new Object();
				data.maxNum = num;
				data.rate = rate;
				YixinJSBridge.invoke("getMultiplePhotos", data, e => {
					resolve(e.err_msg);
				})
			});
		} else {

			var max = num;
			var maxWidth = 1000;
			var maxHeight = 1000;
			var quality = 80;
			var callbackType = 2;
			return new Promise(function (resolve, reject) {
				window.ado.selectImageFromAlbum({ "maxNumber": max, "maxWidth": maxWidth, "maxHeight": maxHeight, "quality": quality, "callbackType": callbackType }).then(data => {
					if (data.code == 1) {
						var dataJson = {};
						var imageArr = [];
						dataJson['status'] = data.code;
						for (let index = 0; index < data.data.length; index++) {
							var imageJson = {};
							imageJson['image'] = data.data[index].base64;
							imageJson['imageType'] = data.data[index].extension;
							imageJson['imageName'] = data.data[index].fileName;
							imageArr.push(imageJson);
						}
						dataJson['images'] = imageArr;
						resolve(JSON.stringify(dataJson));
					} else {
						var dataJson = {};
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
				var data = new Object();
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
					var dataJson = {};
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
				var data = new Object();
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
					var dataJson = {};
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
				var data = new Object();
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
					var dataJson = {};
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
				var data = new Object();
				YixinJSBridge.invoke("getElectronicSignature", data, e => {
					resolve(e.err_msg);
				})
			});
		} else {
			return new Promise(function (resolve, reject) {
				window.ado.getSignatureImage({ "width": "1000", "height": "1000", "quality": 100 }).then((data) => {
					if (data.data != "" && data.data != null) {
						var dataJson = {};
						dataJson['image'] = data.data;
						resolve(JSON.stringify(dataJson));

					} else {
						var dataJson = {};
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
			var agent = navigator.userAgent,
				app = navigator.appVersion;
			var isAndroid =
				agent.indexOf("Android") > -1 || agent.indexOf("Linux") > -1; //Android
			var isIOS = !!agent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //iOS
			if (isAndroid) {
				window.open(url, "_blank");
			}
			if (isIOS) {
				return new Promise(function (resolve, reject) {
					var data = new Object();
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
					var dataJson = {};
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
				var data = new Object();
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
				var data = new Object();
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
					var dataJson = {};
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
				var data = new Object();
				data.appid = "cqyiqi";
				YixinJSBridge.invoke("clearLocalStore", data, e => {
					resolve(e.err_msg);
				})
			});
		} else {

		}
	},

	//获取用户信息
	getUserInfo: function () {
		if (YixinFlag && !HWFlag) {
			return new Promise(function (resolve, reject) {
				var data = new Object();
				YixinJSBridge.invoke("getUserInfo", data, e => {
					resolve(e.err_msg);
				})
			});
		} else {

		}
	},

	//显示登录页面
	showLoginPage: function () {
		if (YixinFlag && !HWFlag) {
			return new Promise(function (resolve, reject) {
				var data = new Object();
				YixinJSBridge.invoke("showLoginPage", data, e => {
					resolve(e.err_msg);
				})
			});
		} else {

		}
	},

	//显示退出 切换账号菜单
	showLogoutMenu: function () {
		if (YixinFlag && !HWFlag) {
			return new Promise(function (resolve, reject) {
				var data = new Object();
				data.type = "custom_cqyiqi";
				YixinJSBridge.invoke("showLogoutMenu", data, e => {
					resolve(e.err_msg);
				})
			});
		} else {

		}
	},

	//易信登录验证
	validateAppCredential: function (phone, password) {
		if (YixinFlag && !HWFlag) {
			return new Promise(function (resolve, reject) {
				var data = new Object();
				data.account = phone;
				data.password = password;
				data.countryCode = "0086";
				data.useGesture = "0";
				YixinJSBridge.invoke("validateAppCredential", data, e => {
					resolve(e.err_msg);
				})
			});
		} else {

		}
	},

	//选择app的bar
	selectAppBar: function (index, refresh) {
		if (YixinFlag && !HWFlag) {
			return new Promise(function (resolve, reject) {
				var data = new Object();
				data.index = index;
				data.refresh = refresh;
				YixinJSBridge.invoke("selectAppBar", data, e => {
					resolve(e.err_msg);
				})
			});
		} else {

		}
	},

	//水印相机
	getPhoto2: function (rate, currTime, position, watermark, phoneNo) {
		if (YixinFlag && !HWFlag) {
			return new Promise(function (resolve, reject) {
				var data = new Object();
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
						var dataJson = {};
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
				var data = new Object();
				data.source = "2";
				data.rate = "1";
				YixinJSBridge.invoke("getPhoto", data, e => {
					resolve(e.err_msg);
				})
			});
		} else {
			return new Promise(function (resolve, reject) {

				var Width = 1000;
				var Height = 1000;
				var quality = 85;
				var callbackType = 2;
				window.ado.selectImageFromSystemCamera(Width, Height, quality, callbackType).then((data) => {
					if (data.code == 1) {
						var dataJson = {};
						dataJson['image'] = data.data[0].base64;
						dataJson['imageType'] = data.data[0].extension;
						dataJson['imagePath'] = data.data[0].fileName;
						resolve(JSON.stringify(dataJson));
					} else {
						var dataJson = {};
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
				var data = new Object();
				data.source = source;
				YixinJSBridge.invoke("getVideoScreenshots", data, e => {
					resolve(e.err_msg);
				})
			});
		} else {

		}
	},

	//打开app（app间的跳转）
	openApp: function (url) {
		if (YixinFlag && !HWFlag) {
			return new Promise(function (resolve, reject) {
				var data = new Object();
				data.url = url;
				YixinJSBridge.invoke("openApp", data, e => {
					resolve(e.err_msg);
				})
			});
		} else {

		}
	},

	//查询是否安装了其他app
	queryAppIsInstalled: function (appid, urlscheme) {
		if (YixinFlag && !HWFlag) {
			return new Promise(function (resolve, reject) {
				var data = new Object();
				data.appid = appid;
				data.urlscheme = urlscheme;
				YixinJSBridge.invoke("queryAppIsInstalled", data, e => {
					resolve(e.err_msg);
				})
			});
		} else {

		}
	},

	//关闭app
	closeApp: function () {
		if (YixinFlag && !HWFlag) {
			return new Promise(function (resolve, reject) {
				var data = new Object();
				YixinJSBridge.invoke("closeApp", data, e => {
					resolve(e.err_msg);
				})
			});
		} else {

		}
	},

	//获取app被拉起时的url
	getUrlWithAppActivated: function () {
		if (YixinFlag && !HWFlag) {
			return new Promise(function (resolve, reject) {
				var data = new Object();
				YixinJSBridge.invoke("getUrlWithAppActivated", data, e => {
					resolve(e.err_msg);
				})
			});
		} else {

		}
	},

	//app开启持续定位
	startBGLocation: function (time, distance, deviceID) {
		if (YixinFlag && !HWFlag) {
			return new Promise(function (resolve, reject) {
				var data = new Object();
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
				var data = new Object();
				YixinJSBridge.invoke("getScreenshotInfo", data, e => {
					resolve(e.err_msg);
				})
			});
		} else {

		}
	},

	//融合app人脸识别
	faceDetection: function (reqUrl, reqBody, header) {
		if (YixinFlag && !HWFlag) {

		} else {

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
				var data = new Object();
				data.enable = "false";
				YixinJSBridge.invoke("setWebRotateAble", data, e => {
					resolve(e.err_msg);
				})
			});
		} else {

		}
	},

	//判断是易信还是华为 易信的话返回true 华为的话返回false
	YixinOrHW: function () {
		if (YixinFlag && !HWFlag) {
			return true;
		} else {
			return false;
		}

	},

	//获取工号信息
	getlogininfo: function () {


		if (YixinFlag && !HWFlag) {


			console.log("666666666");
			console.log(BASE64.encode("getSignNum"));

			//在一起app中
			var dataJson = {};
			dataJson['loginNo'] = window.localStorage.getItem("loginNo");
			dataJson['roleCodes'] = window.localStorage.getItem("roleCodes");
			dataJson['crmLoginNo'] = window.localStorage.getItem("crmLoginNo");
			dataJson['ecrmOrgId'] = window.localStorage.getItem("ecrmOrgId");
			dataJson['loginName'] = window.localStorage.getItem("loginName");
			dataJson['crmlogin_no'] = window.localStorage.getItem("crmlogin_no");
			dataJson['phoneNo'] = window.localStorage.getItem("phoneNo");
			dataJson['password'] = window.localStorage.getItem("password");
			dataJson['PASSWORD'] = window.localStorage.getItem("PASSWORD");
			dataJson['rootOrgName'] = window.localStorage.getItem("rootOrgName");
			dataJson['rootOrgId'] = window.localStorage.getItem("rootOrgId");
			dataJson['orgId'] = window.localStorage.getItem("orgId");
			dataJson['orgName'] = window.localStorage.getItem("orgName");
			return (dataJson);
		} else {
			return new Promise(function (resolve, reject) {
				var dataJson = {};
				window.ado
					.getSecondUserInfo("Esop")
					.then(data => {

						console.log("1111111111融合app");
						console.log("1111111111获取二类账号返回值是" + JSON.stringify(data));
						var crmNo = data.data.bossid;
						var esopNo = data.data.esopid;
						var systemUserCode = window.localStorage.getItem("loginNo")

						if (esopNo == undefined ||
							esopNo == null ||
							esopNo == "") {
							//esop工号不存在
							console.log("11111111111esop工号不存在");

							if (confirm("该用户ESOP工号不存在，请核实后登录")) {
								window.ado.close().then(data => {
								}).catch(error => {
									console.log(error);
								});
							} else {
								window.ado.close().then(data => {
								}).catch(error => {
									console.log(error);
								});
							}
						}
						if (systemUserCode == undefined ||
							systemUserCode == null ||
							systemUserCode == "" ||
							(systemUserCode != undefined &&
								systemUserCode != null &&
								systemUserCode != "" &&
								esopNo != systemUserCode)) {
							console.log("1111111111localstorage里边工号为空 或者和当前融合app登录的工号不一致");

							//localstorage里边工号为空 或者和当前融合app登录的工号不一致
							var reqxml =
								"<request>" +
								"<extra_param>" +
								"<channel>ESOP</channel>" +
								"<service_name>LoginMixApp</service_name>" +
								"<method_name>getLoginInfoByEsopId</method_name>" +
								"</extra_param>" +
								"<esoplogin_no>" +
								esopNo +
								"</esoplogin_no>" +
								"</request>";
							$.ajax({
								type: "post",
								url: encodeURI(
									"http://10.191.143.246:9091/EPServer_S/UniServlet" + "?param=" + BASE64.encode(reqxml)
								),
								headers: {
									"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
									authorizationFlag: BASE64.encode("login" + Math.random()),
								},
								dataType: "jsonp",
								jsonp: "callback",
								success: res => {

									console.log("通过crm工号查esop工号的接口返回值是" + JSON.stringify(res));

									if (res.RSP.ret_code == "0") {
										var loginInfo = res.RSP.login_info;
										if (loginInfo.length != 0) {
											localStorage.clear();
											for (var key in loginInfo) {
												localStorage.setItem(key, loginInfo[key]);
												dataJson[key] = loginInfo[key];
											}
											resolve(dataJson);


										} else {
											console.log("111111111ESOP不存在此用户！请申请ESOP工号权限");

										}
									} else {
										console.log("111111111111无法获取用户信息请关闭应用后重试1");


									}
								},
								error: error => {
									console.log("111111111111111无法获取用户信息请关闭应用后重试2");

								}
							});
						} else {

							//localstorage里边的工号不为空 而且和当前融合app登录的工号一致
							console.log("11111111111localstorage里边的工号不为空 而且和当前融合app登录的工号一致");

						}


					})
					.catch(error => {
						console.log(error);

					});

			});
		}

	},



}


//base64加密
var BASE64 = {
	// private property
	_keyStr: "efghiABCDEFNOPQRS456TUVWXYZabcdjklmnGHIJKLMopqrstuvwxyz0123789|/_"



	// public method for getlogininfo
	, getlogininfo: function () {



	} // End Function getlogininfo 

	// public method for encoding
	, encode: function (input) {
		var output = "";
		var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
		var i = 0;

		input = BASE64._utf8_encode(input);

		while (i < input.length) {
			chr1 = input.charCodeAt(i++);
			chr2 = input.charCodeAt(i++);
			chr3 = input.charCodeAt(i++);

			enc1 = chr1 >> 2;
			enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
			enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
			enc4 = chr3 & 63;

			if (isNaN(chr2)) {
				enc3 = enc4 = 64;
			}
			else if (isNaN(chr3)) {
				enc4 = 64;
			}

			output = output +
				this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
				this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
		}

		return output;
	} // End Function encode 

	// public method for decoding
	, decode: function (input) {
		var output = "";
		var chr1, chr2, chr3;
		var enc1, enc2, enc3, enc4;
		var i = 0;

		input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
		while (i < input.length) {
			enc1 = this._keyStr.indexOf(input.charAt(i++));
			enc2 = this._keyStr.indexOf(input.charAt(i++));
			enc3 = this._keyStr.indexOf(input.charAt(i++));
			enc4 = this._keyStr.indexOf(input.charAt(i++));

			chr1 = (enc1 << 2) | (enc2 >> 4);
			chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
			chr3 = ((enc3 & 3) << 6) | enc4;

			output = output + String.fromCharCode(chr1);

			if (enc3 != 64) {
				output = output + String.fromCharCode(chr2);
			}

			if (enc4 != 64) {
				output = output + String.fromCharCode(chr3);
			}

		}

		output = BASE64._utf8_decode(output);

		return output;
	} // End Function decode 


	// private method for UTF-8 encoding
	, _utf8_encode: function (string) {
		var utftext = "";
		string = string.replace(/\r\n/g, "\n");

		for (var n = 0; n < string.length; n++) {
			var c = string.charCodeAt(n);

			if (c < 128) {
				utftext += String.fromCharCode(c);
			}
			else if ((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			}
			else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}

		} // Next n 

		return utftext;
	} // End Function _utf8_encode 

	// private method for UTF-8 decoding
	, _utf8_decode: function (utftext) {
		var string = "";
		var i = 0;
		var c, c1, c2, c3;
		c = c1 = c2 = 0;

		while (i < utftext.length) {
			c = utftext.charCodeAt(i);

			if (c < 128) {
				string += String.fromCharCode(c);
				i++;
			}
			else if ((c > 191) && (c < 224)) {
				c2 = utftext.charCodeAt(i + 1);
				string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
				i += 2;
			}
			else {
				c2 = utftext.charCodeAt(i + 1);
				c3 = utftext.charCodeAt(i + 2);
				string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
				i += 3;
			}

		}

		return string;
	} // End Function _utf8_decode 

}



export default Foundation
