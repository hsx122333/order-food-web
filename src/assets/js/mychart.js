import echarts from 'echarts'
const install = function (Vue) {
  Object.defineProperties(Vue.prototype, {
    $chart: {
      get() {
        return {
          // 营销沙盘
          chartInfo: function (id, data, Lightcolor, highlighted) {
            this.chart = echarts.init(document.getElementById(id));
            this.chart.clear();
            var option = {
              tooltip: {
                trigger: 'axis',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                  type: 'none' // 默认为直线，可选为：'line' | 'shadow'
                },
                extraCssText: 'box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.18);',
                textStyle: {
                  color: '#666',
                  fontSize: '14'
                },
                padding: [10, 20, 10, 20],
                backgroundColor: '#fff',
                formatter: '{b}<br/>{a0}: {c0}<br />{a1}: {c1}'
              },
              grid: {
                left: '0',
                right: '15px',
                bottom: '30px',
                top: '30px',
                containLabel: true
              },
              legend: {
                bottom: '5px',
                itemWidth: 12,
                itemHeight: 10,
                itemGap: 24,
                borderRadius: 0,
                textStyle: {
                  color: '#666',
                  fontSize: '11'
                }
              },
              xAxis: [{
                type: 'category',
                data: data.xdata,
                axisLabel: {
                  interval: 0,
                  rotate:40,
                  lineStyle: {
                    color: '#EEF0F3'
                  },
                  textStyle: {
                    fontSize: '11',
                    color: '#999'
                  }
                },
                axisTick: {
                  show: false
                },

                axisLine: {
                  show: true,
                  lineStyle: {
                    color: '#EEF0F3'
                  }
                }
              }],
              yAxis: [{
                  type: 'value',
                  name: data.name,
                  nameGap: '18',
                  nameTextStyle: {
                    color: '#999',
                    fontSize: '11',
                    padding: [0, 0, 0, -10]
                  },
                  axisLabel: {
                    formatter: '{value}'
                  },
                  axisTick: {
                    show: false
                  },
                  axisLine: {
                    show: false,
                    lineStyle: {
                      color: '#999',
                      fontSize: '11'
                    }
                  },
                  splitLine: {
                    lineStyle: {
                      color: '#EEF0F3'
                    }
                  }
                },
                {
                  type: 'value',
                  name: '环比',
                  nameGap: '18',
                  nameTextStyle: {
                    color: '#999',
                    fontSize: '11',
                    padding: [0, 0, 0, -10]
                  },
                  axisLabel: {
                    // show: false,
                    formatter: '{value}',
                    color: '#999',
                  },
                  axisTick: {
                    show: false
                  },
                  axisLine: {
                    show: false
                  },
                  splitLine: {
                    show: false
                  }
                }
              ],

              series: [{
                  name: '数值',
                  type: 'bar',
                  barWidth: 9,
                  itemStyle: {
                    normal: {
                      color: Lightcolor
                    }
                  },
                  data:data.ydata1
                },
                {
                  name: '环比',
                  type: 'line',
                  yAxisIndex: 1,
                  smooth: true,
                  symbol: 'emptyCircle',
                  symbolSize: 6,
                  lineStyle: {
                    normal: {
                      width: 1,
                      color: '#FFAE6D'
                    }
                  },
                  itemStyle: {
                    color: '#FFAE6D'

                  },
                  data:  data.ydata2
                }
              ]

            }
            this.chart.setOption(option);
          },

          chartPro: function (id, data) {
            this.chart = echarts.init(document.getElementById(id));
            this.chart.clear();
            var option = {
              legend: {
                selectedMode: false,
                type: 'plain',
                icon: 'circle',
                orient: 'vertical',
                left: '60%',
                top: '29%',
                height: '100px',
                align: 'left',
                itemGap: 15,
                itemWidth: 10, // 设置宽度
                itemHeight: 10, // 设置高度
                symbolKeepAspect: false,
                textStyle: {
                  color: '#666',
                  rich: {
                    name: {
                      verticalAlign: 'right',
                      align: 'left',
                      width: 35,
                      fontSize: 12,
                      color: '#999'
                    },
                  }
                },
                data: data.map(item => item.name),
                formatter: function (name) {

                  if (data && data.length) {
                    for (var i = 0; i < data.length; i++) {
                      if (name === data[i].name) {

                        return (
                          '{name| ' +
                          name +
                          '} '
                        )
                      }
                    }
                  }
                }
              },
              series: [{
                name: '数量',
                type: 'pie',
                radius: ['50%', '65%'],
                center: ['30%', '50%'],
                data: data,
                label: {
                  normal: {
                    show: false,
                    position: 'center',
                    formatter: "{text|{d}%}\n{name|{b}}",
                    rich: {
                      text: {
                        align: 'center',
                        verticalAlign: 'middle',
                        padding: 8,
                        fontSize: 18,
                        color: "#333"
                      },
                      value: {
                        align: 'center',
                        verticalAlign: 'middle',
                        fontSize: 12,
                        color: "#666"
                      },
                      name: {
                        align: 'center',
                        verticalAlign: 'middle',
                        fontSize: 14,
                        color: "#666"
                      }
                    }
                  },
                  emphasis: {
                    show: true,
                    textStyle: {
                      fontSize: '12'
                    }
                  }
                },
                labelLine: {
                  normal: {
                    show: true
                  }
                }
              }]
            }
            this.chart.setOption(option);
            this.chart.resize();
          },
          chartYear: function (id, data) {
            this.chart = echarts.init(document.getElementById(id));
            this.chart.clear();
            var option = {
              backgroundColor: '#FFF',
              tooltip: {
                width: "100%",
                triggerOn: 'click',
                trigger: 'axis',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                  type: 'none', // 默认为直线，可选为：'line' | 'shadow'
                },
                textStyle: {
                  color: '#666',
                  fontSize: '12',

                },
                backgroundColor: '#fff',

                formatter: function (params) { //自动提示工具
                  return params[0].axisValue + '<br />' +
                    params[0].marker + "0-3个月：" + params[0].value + '元' + '<br />' +
                    params[1].marker + "4-6个月：" + params[1].value + '元' + '<br />' +
                    params[2].marker + "7-12个月：" + params[2].value + '元' + '<br />' +
                    params[3].marker + "1-2年：" + params[3].value + '元' + '<br />' +
                    params[4].marker + "2-3年：" + params[4].value + '元' + '<br />' +
                    params[5].marker + "大于3年：" + params[5].value + '元';
                }
              },
              legend: {
                show: false,
                selectedMode: false, //取消图例上的点击事件
                data: ['0-3个月账龄内欠费', '4-6个月账龄内欠费', '7-12个月账龄内欠费',
                  '1-2年账龄内欠费', '2-3年账龄内欠费', '大于3年账龄内欠费'
                ],
                bottom: '10',
                left: 'center',
                itemGap: 45,
                itemWidth: 8,
                itemHeight: 8,
                textStyle: {
                  color: '#999',
                  fontSize: '12'
                }
              },
              grid: {
                left: '10px',
                right: '10px',
                bottom: '10px',
                top: '40px',
                containLabel: true
              },
              dataZoom: {
                type: "inside",
                show: true,
                height: 20,
                bottom: 10,
                startValue: 9, //end-startValue+1 控制柱状图显示数量
                endValue: 16,

              },
              xAxis: [{
                type: 'category',
                data: ['万州', '涪陵', '渝中', '渝北', '江北', '沙坪坝', '九龙坡', '北碚', '南岸', '沙坪坝', '九龙坡', '北碚', '南岸'],
                axisLabel: {
                  interval: 0,
                  lineStyle: {
                    color: '#EEF0F3'
                  },
                  textStyle: {
                    color: '#666'
                  }
                },
                axisTick: {
                  show: false
                },

                axisLine: {
                  show: true,
                  lineStyle: {
                    color: '#EEF0F3'
                  }
                },
              }],
              yAxis: [{
                type: 'value',
                name: '单位：元',
                nameTextStyle: {
                  color: '#666',
                  fontSize: '12',
                  padding: [0, 0, 5, 0],

                },

                axisLabel: {
                  formatter: '{value}'
                },
                axisTick: {
                  show: false
                },
                axisLine: {
                  show: false,
                  lineStyle: {
                    color: '#666'
                  }
                },
                splitLine: {
                  lineStyle: {
                    color: '#EEF0F3',

                  }
                }
              }],
              series: [


                {
                  name: '0-3个月账龄内欠费',
                  type: 'bar',
                  barWidth: 10,

                  color: '#44BBFE',
                  stack: '饱和度',
                  data: [10, 52, 20, 34, 30, 30, 20, 30, 30, 20, 30, 20, 30, 30, 20]
                },
                {
                  name: '4-6个月账龄内欠费',
                  type: 'bar',
                  barWidth: 10,
                  color: '#44BBFE',
                  stack: '饱和度',
                  data: [20, 18, 19, 23, 29, 33, 31, 22, 12, 20, 33, 31]
                },
                {
                  name: '7-12个月账龄内欠费',
                  type: 'bar',
                  barWidth: 10,
                  stack: '饱和度',
                  color: '#44BBFE',
                  barMaxWidth: 30, //柱子的宽度
                  data: [30, 18, 11, 23, 29, 33, 30, 22, 12, 29, 30, 31]
                },
                {
                  name: '1-2年账龄内欠费',
                  type: 'bar',
                  barWidth: 10,
                  color: '#44BBFE',
                  stack: '饱和度',
                  data: [30, 13, 11, 13, 30, 23, 21, 12, 13, 10, 20, 10]
                },
                {
                  name: '2-3年账龄内欠费',
                  type: 'bar',
                  barWidth: 10,
                  color: '#44BBFE',
                  stack: '饱和度',
                  data: [20, 18, 19, 23, 29, 33, 31, 22, 12, 20, 33, 31]
                },
                {
                  name: '大于3年账龄内欠费',
                  type: 'bar',
                  barWidth: 10,
                  stack: '饱和度',
                  color: '#44BBFE',

                  data: [30, 18, 11, 23, 29, 33, 30, 22, 12, 29, 30, 31]
                }

              ]
            }
            this.chart.setOption(option);
            this.chart.setOption({

            })
          },
          chartLine: function (id, data) {
            this.chart = echarts.init(document.getElementById(id));
            this.chart.clear();
            var option = {
              backgroundColor: "#fff",
              tooltip: {
                trigger: 'axis',
                show: true,
                backgroundColor: "rgba(0,0,0,0.4)",
                axisPointer: {

                }
              },
              legend: [{

                  left: 'center',
                  bottom: 25,
                  textStyle: {
                    fontSize: 12,
                    color: '#666'
                  },
                  data: ['物联卡', '云', 'ICT', '搜索引擎']
                },
                {
                  bottom: 0,
                  textStyle: {
                    fontSize: 12,
                    color: '#666'
                  },
                  data: ['大数据', 'IDC', '专线', '其他']
                }

              ],


              grid: {
                left: '2%',
                right: '2%',
                top: '15%',
                bottom: '20%',
                containLabel: true
              },
              xAxis: {
                axisLine: {
                  show: false
                },
                axisTick: {
                  show: false
                },
                axisLabel: {
                  interval: 0,
                },
                data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
              },
              yAxis: [{
                type: 'value',
                name: '单位：元',
                nameTextStyle: {
                  color: '#666',
                  fontSize: '12',
                  padding: [0, 0, 5, 0],

                },

                axisLabel: {
                  formatter: '{value}'
                },
                axisTick: {
                  show: false
                },
                axisLine: {
                  show: false,
                  lineStyle: {
                    color: '#666'
                  }
                },
                splitLine: {
                  lineStyle: {
                    color: '#EEF0F3',

                  }
                }
              }],
              series: [{
                  name: '大数据',
                  type: 'line',
                  smooth: true,
                  symbol: 'emptyCircle',
                  symbolSize: 6,
                  lineStyle: {
                    normal: {
                      width: 2,
                      color: '#FFAE6D',
                    }
                  },
                  itemStyle: {
                    color: '#FFAE6D',

                  },

                  data: [55, 70, 81, 95, 101, 129, 122, 95, 101, 129, 122]
                },
                {
                  name: 'ICT',
                  type: 'line',
                  smooth: true,
                  symbol: 'emptyCircle',
                  symbolSize: 6,
                  lineStyle: {
                    normal: {
                      width: 2,
                      color: '#24b314',
                    }
                  },
                  itemStyle: {
                    color: '#24b314',

                  },

                  data: [50, 60, 75, 85, 95, 100, 90, 85, 95, 100, 90]
                },
                {
                  name: 'IDC',
                  type: 'line',
                  smooth: true,
                  symbol: 'emptyCircle',
                  symbolSize: 6,
                  lineStyle: {
                    normal: {
                      width: 2,

                      color: '#027ad7',
                    }
                  },
                  itemStyle: {
                    color: '#027ad7',

                  },

                  data: [75, 60, 65, 60, 55, 60, 90, 60, 55, 60, 90]
                },
                {
                  name: '专线',
                  type: 'line',
                  smooth: true,
                  symbol: 'emptyCircle',
                  symbolSize: 6,
                  lineStyle: {
                    normal: {
                      width: 2,
                      color: '#FB7676',
                    }
                  },
                  itemStyle: {
                    color: '#FB7676',

                  },

                  data: [40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40]
                },
                {
                  name: '云',
                  type: 'line',
                  smooth: true,
                  symbol: 'emptyCircle',
                  symbolSize: 6,
                  lineStyle: {
                    normal: {
                      width: 2,

                      color: '#C8D1E5',
                    }
                  },
                  itemStyle: {
                    color: '#C8D1E5',
                  },
                  data: [65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65]
                },
                {
                  name: '其他',
                  type: 'line',
                  smooth: true,
                  symbol: 'emptyCircle',
                  symbolSize: 6,
                  lineStyle: {
                    normal: {
                      width: 2,
                      color: '#A9A3FF',
                    }
                  },
                  itemStyle: {
                    color: '#A9A3FF',
                  },
                  data: [15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15]
                },
                {
                  name: '物联卡',
                  type: 'line',
                  smooth: true,
                  symbol: 'emptyCircle',
                  symbolSize: 6,
                  lineStyle: {
                    normal: {
                      width: 2,
                      color: '#44BBFE',
                    }
                  },
                  itemStyle: {
                    color: '#44BBFE',
                  },

                  data: [105, 105, 105, 105, 105, 105, 105, 105, 105, 105, 105, 105]
                },

              ]




            };
            this.chart.setOption(option);
          },
          chartRank: function (id, data) {
            this.chart = echarts.init(document.getElementById(id));
            this.chart.clear();
            var option = {
              tooltip: {
                width: "100%",
                trigger: 'axis',
                triggerOn: 'click',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                  type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                },
                backgroundColor: 'rgba(0,0,0,0.4)',
                formatter: function (params) { //自动提示工具
                  return params[0].axisValue + '<br />' +
                    "<span style='width:10px;height:10px;border-radius:50%;background:#6AE8D8'></span> " + "本次欠费总金额：" + parseInt(params[0].value + params[1].value) + '元' + '<br />' +
                    params[0].marker + "冲销金额：" + params[0].value + '元' + '<br />' +
                    params[1].marker + "未冲销金额：" + params[1].value + '元' + '<br />' +
                    params[2].marker + "欠费冲销率：" + params[2].value + '%' + '<br />'

                },
              },
              // tooltip: {
              //   width: "100%",
              //   triggerOn: 'click',
              //   trigger: 'axis',
              //   axisPointer: { // 坐标轴指示器，坐标轴触发有效
              //     type: 'none', // 默认为直线，可选为：'line' | 'shadow'
              //   },
              //   textStyle: {
              //     color: '#666',
              //     fontSize: '12',

              //   },
              //   backgroundColor: '#fff',

              //   formatter: function (params) { //自动提示工具
              //     return params[0].axisValue + '<br />' +
              //       "<span style='width:10px;height:10px;border-radius:50%;background:#6AE8D8'></span> " + "本次欠费总金额" + parseInt(params[0].value + params[1].value) + '元' + '<br />' +
              //       params[0].marker + "冲销金额：" + params[0].value + '元' + '<br />' +
              //       params[1].marker + "未冲销金额：" + params[1].value + '元' + '<br />' +
              //       params[2].marker + "欠费冲销率" + params[2].value + '%' + '<br />'

              //   }
              // },
              grid: {
                left: '1px',
                right: '15px',
                bottom: '50px',
                top: '50px',
                containLabel: true
              },
              legend: {
                bottom: 20,
                itemWidth: 12,
                itemHeight: 10,
                borderRadius: 0,
                textStyle: {
                  color: '#666',
                },

              },
              dataZoom: {
                type: "inside",
                show: true,
                height: 20,
                bottom: 10,
                startValue: 9, //end-startValue+1 控制柱状图显示数量
                endValue: 16,

              },
              xAxis: [{
                type: 'category',
                data: ['万州', '涪陵', '渝中', '渝北', '江北', '沙坪坝', '北碚', '南岸', '江北', '沙坪坝', '北碚', '南岸'],
                axisLabel: {
                  interval: 0,
                  lineStyle: {
                    color: '#EEF0F3'
                  },
                  textStyle: {
                    color: '#666'
                  }
                },
                axisTick: {
                  show: false
                },

                axisLine: {
                  show: true,
                  lineStyle: {
                    color: '#EEF0F3'
                  }
                },
              }],
              yAxis: [

                {
                  type: 'value',
                  name: '单位：元',
                  nameTextStyle: {
                    color: '#666',
                    fontSize: '12',
                    padding: [0, 0, 5, 10],

                  },

                  axisLabel: {
                    formatter: '{value}'
                  },
                  axisTick: {
                    show: false
                  },
                  axisLine: {
                    show: false,
                    lineStyle: {
                      color: '#666'
                    }
                  },
                  splitLine: {
                    lineStyle: {
                      color: '#EEF0F3',

                    }
                  }
                },
                {
                  type: 'value',
                  name: '单位：pp',
                  nameTextStyle: {
                    color: '#666',
                    fontSize: '12',
                    padding: [0, -10, 5, 0],
                  },
                  axisLabel: {
                    formatter: '{value}'
                  },
                  axisTick: {
                    show: false
                  },
                  axisLine: {
                    show: false,

                  },
                  splitLine: {
                    show: false,
                  }
                }
              ],
              series: [{
                  name: "冲销金额",
                  type: 'bar',
                  barWidth: 0,
                  stack: '饱和度',
                  itemStyle: {
                    normal: {
                      color: '#44BBFE'
                    }
                  },
                  data: [10, 52, 20, 34, 30, 30, 20, 30, 34, 30, 30, 20, 30]
                },
                {
                  type: 'bar',
                  name: '未冲销金额',
                  barWidth: 10,
                  stack: '饱和度',
                  itemStyle: {
                    normal: {
                      color: '#B3E4FE'
                    }
                  },
                  data: [20, 72, 40, 54, 50, 50, 50, 44, 34, 30, 30, 20, 30]
                },
                {
                  name: '冲销率变化',
                  type: 'line',
                  yAxisIndex: 1,
                  smooth: true,
                  symbol: 'emptyCircle',
                  symbolSize: 6,
                  lineStyle: {
                    normal: {
                      width: 2,
                      color: '#FFAE6D',
                    }
                  },
                  itemStyle: {
                    color: '#FFAE6D',

                  },

                  data: [55, 70, 81, 95, 141, 55, 102, 80, 44, 34, 30, 30, 20, 30]
                },
              ]

            }
            this.chart.setOption(option);

          },
          chartMonth: function (id, data) {
            this.chart = echarts.init(document.getElementById(id));
            this.chart.clear();
            var option = {
              tooltip: {
                trigger: 'axis',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                  type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                }
              },
              grid: {
                left: '1px',
                right: '10px',
                bottom: '50px',
                top: '50px',
                containLabel: true
              },
              legend: {
                bottom: 16,
                itemWidth: 10,
                itemHeight: 10,
                borderRadius: 0,
                textStyle: {
                  color: '#666',
                },
              },
              dataZoom: {
                type: "inside",
                show: true,
                height: 20,
                bottom: 10,
                startValue: 9, //end-startValue+1 控制柱状图显示数量
                endValue: 16,

              },
              xAxis: [{
                type: 'category',
                data: ['万州', '涪陵', '渝中', '渝北', '江北', '沙坪坝', '九龙坡', '北碚', '南岸', '沙坪坝', '九龙坡', '北碚', '南岸'],
                axisLabel: {
                  interval: 0,
                  lineStyle: {
                    color: '#EEF0F3'
                  },
                  textStyle: {
                    color: '#666'
                  }
                },
                axisTick: {
                  show: false
                },

                axisLine: {
                  show: true,
                  lineStyle: {
                    color: '#EEF0F3'
                  }
                },
              }],
              yAxis: [{
                type: 'value',
                name: '单位：元',
                nameTextStyle: {
                  color: '#666',
                  fontSize: '12',
                  padding: [0, 0, 5, 0],

                },

                axisLabel: {
                  formatter: '{value}'
                },
                axisTick: {
                  show: false
                },
                axisLine: {
                  show: false,
                  lineStyle: {
                    color: '#666'
                  }
                },
                splitLine: {
                  lineStyle: {
                    color: '#EEF0F3',

                  }
                }
              }],
              series: [{
                  name: '当前账单欠费总金额',
                  type: 'bar',
                  barWidth: 10,
                  itemStyle: {
                    normal: {
                      color: '#44BBFE'
                    }
                  },
                  data: [10, 52, 20, 34, 30, 30, 20, 30, 30, 20, 20, 30, 30, 20]
                },
                {
                  name: '欠费净值',
                  type: 'bar',
                  barWidth: 10,
                  itemStyle: {
                    normal: {
                      color: '#3DD1B6'
                    }
                  },
                  data: [10, 52, 20, 34, 30, 30, 20, 30, 30, 20, 20, 30, 30, 20]
                }


              ]

            }
            this.chart.setOption(option);

          },
          chartDetail: function (id, data) {
            this.chart = echarts.init(document.getElementById(id));
            this.chart.clear();


            var seriesData = [{
              name: "已处理集团数",
              value: "40"
            }, {
              name: "未处理集团数",
              value: "53"
            }];

            var colorList = ['#44BBFE', '#FFAE6D'];
            var option = {
              legend: {
                bottom: 10,
                right: 10,
                width: 120,
                itemWidth: 10,
                itemHeight: 10,
                borderRadius: 0,
                textStyle: {
                  color: '#666',
                },
                data: ['已处理集团数', '未处理集团数']
              },
              tooltip: {
                trigger: 'item',
                borderColor: 'rgba(255,255,255,.3)',
                backgroundColor: 'rgba(13,5,30,.6)',
                borderWidth: 1,
                padding: 5,
                formatter: function (parms) {
                  var str = parms.marker + "" + parms.data.name + "</br>" +
                    "未处理集团数：" + parms.data.value + "</br>" +
                    "未处理集团数占比：" + parms.percent + "%";
                  return str;
                }
              },
              series: [{
                  type: 'pie',
                  z: 3,
                  center: ['50%', '40%'],
                  radius: ['40%', '55%'],
                  itemStyle: {
                    normal: {
                      color: function (params) {
                        return colorList[params.dataIndex]
                      }
                    }
                  },
                  label: {
                    show: false,
                    selectedMode: false,
                    normal: {
                      formatter: params => {
                        return (
                          '{name|' + '数量:' + '}' +
                          '{value|' + params.value + '\n' + '}' +
                          '{name|' + '占比:' + '}' + '{value|' + params.percent.toFixed(1) + '%}'
                        );
                      },
                      // padding: [0, -180, 25, -30],
                      rich: {
                        fontSize: 12,
                        name: {

                          align: 'left',
                          color: '#666'
                        },
                        value: {
                          color: '#44BBFE'
                        }
                      }
                    }
                  },
                  labelLine: {
                    show: false,
                    normal: {
                      // length: 10,
                      // length2: 144,
                      lineStyle: {
                        color: '##BEBEBE'
                      }
                    }
                  },
                  data: seriesData,
                  hoverAnimation: false,
                },

              ]
            };
            this.chart.setOption(option);

          },
          chartNode: function (id, data) {
            this.chart = echarts.init(document.getElementById(id));
            this.chart.clear();
            var salvProName = ["异常数据下发", "催欠待办", "督办待办", "督办反馈", "免催缴审批", "待稽核", "稽核不通过待办"];
            var salvProValue = [239, 181, 154, 144, 135, 117, 74, 72, 67, 55];
            var salvProMax = []; //背景按最大值
            for (let i = 0; i < salvProValue.length; i++) {
              salvProMax.push(salvProValue[0])
            }
            var option = {

              grid: {
                left: '1px',
                right: '1px',
                bottom: '20px',
                top: '40px',
                containLabel: true
              },
              tooltip: {
                trigger: 'axis',
                axisPointer: {
                  type: 'none'
                },
                formatter: function (params) {
                  return params[0].name + ' : ' + params[0].value
                }
              },

              xAxis: {
                type: 'value',
                axisLabel: {
                  wdith: '50',
                  interval: 0,
                  lineStyle: {
                    color: '#EEF0F3'
                  },
                  textStyle: {
                    color: '#666'
                  },

                },
                axisTick: {
                  show: false
                },

                axisLine: {
                  show: true,
                  lineStyle: {
                    color: '#EEF0F3'
                  }
                },
                splitLine: {
                  show: true,
                  lineStyle: {
                    color: '#D8D8D8'
                  }
                },
              },
              yAxis: [{
                name: '单位：个',
                nameLocation: 'start',
                nameTextStyle: {
                  color: '#666',
                  fontSize: '12',
                  padding: [20, 0, 5, -60],

                },

                type: 'category',
                inverse: true,
                axisLabel: {
                  interval: 0,
                  lineStyle: {
                    color: '#EEF0F3'
                  },
                  textStyle: {
                    color: '#666'
                  },
                  formatter: function (params) {
                    var newParamsName = ""; // 最终拼接成的字符串
                    var paramsNameNumber = params.length; // 实际标签的个数
                    var provideNumber = 4; // 每行能显示的字的个数
                    var rowNumber = Math.ceil(paramsNameNumber / provideNumber); // 换行的话，需要显示几行，向上取整
                    /**
                     * 判断标签的个数是否大于规定的个数， 如果大于，则进行换行处理 如果不大于，即等于或小于，就返回原标签
                     */
                    // 条件等同于rowNumber>1
                    if (paramsNameNumber > provideNumber) {
                      /** 循环每一行,p表示行 */
                      for (var p = 0; p < rowNumber; p++) {
                        var tempStr = ""; // 表示每一次截取的字符串
                        var start = p * provideNumber; // 开始截取的位置
                        var end = start + provideNumber; // 结束截取的位置
                        // 此处特殊处理最后一行的索引值
                        if (p == rowNumber - 1) {
                          // 最后一次不换行
                          tempStr = params.substring(start, paramsNameNumber);
                        } else {
                          // 每一次拼接字符串并换行
                          tempStr = params.substring(start, end) + "\n";
                        }
                        newParamsName += tempStr; // 最终拼成的字符串
                      }

                    } else {
                      // 将旧标签的值赋给新标签
                      newParamsName = params;
                    }
                    //将最终的字符串返回
                    return newParamsName
                  },
                },
                axisTick: {
                  show: false
                },


                axisLine: {
                  show: false,
                  lineStyle: {
                    color: '#EEF0F3'
                  }
                },
                data: salvProName
              }, {
                type: 'category',
                inverse: true,
                axisTick: 'none',
                show: true,
                axisLabel: {
                  textStyle: {
                    color: '#ffffff',
                    fontSize: '12'
                  },
                },
                axisLine: {
                  show: false,
                  lineStyle: {
                    color: '#EEF0F3'
                  }
                },
                data: salvProValue
              }],
              series: [{
                  name: '值',
                  type: 'bar',
                  zlevel: 1,
                  itemStyle: {
                    normal: {
                      color: '#3DD1B6',
                    },
                  },
                  barWidth: 10,
                  data: salvProValue
                },

              ]
            };
            this.chart.setOption(option);

          },
          chartSta: function (id, data) {
            this.chart = echarts.init(document.getElementById(id));
            this.chart.clear();
            var option = {
              tooltip: {
                trigger: 'axis',
                axisPointer: {
                  type: 'shadow'
                }
              },
              grid: {
                left: '1px',
                right: '15px',
                bottom: '50px',
                top: '50px',
                containLabel: true
              },
              legend: {
                bottom: 20,
                itemWidth: 12,
                itemHeight: 10,
                borderRadius: 0,
                textStyle: {
                  color: '#666',
                },

              },
              dataZoom: {
                type: "inside",
                show: true,
                height: 20,
                bottom: 10,
                startValue: 9, //end-startValue+1 控制柱状图显示数量
                endValue: 16,

              },
              xAxis: [{
                type: 'category',
                data: ['万州', '涪陵', '渝中', '渝北', '江北', '沙坪坝', '北碚', '南岸', '江北', '沙坪坝', '北碚', '南岸'],
                axisLabel: {
                  interval: 0,
                  lineStyle: {
                    color: '#EEF0F3'
                  },
                  textStyle: {
                    color: '#666'
                  }
                },
                axisTick: {
                  show: false
                },

                axisLine: {
                  show: true,
                  lineStyle: {
                    color: '#EEF0F3'
                  }
                },
              }],
              yAxis: [

                {
                  type: 'value',
                  name: '单位：元',
                  nameTextStyle: {
                    color: '#666',
                    fontSize: '12',
                    padding: [0, 0, 5, -10],

                  },

                  axisLabel: {
                    formatter: '{value}'
                  },
                  axisTick: {
                    show: false
                  },
                  axisLine: {
                    show: false,
                    lineStyle: {
                      color: '#666'
                    }
                  },
                  splitLine: {
                    lineStyle: {
                      color: '#EEF0F3',

                    }
                  }
                },
              ],
              series: [{
                  name: "未处理",
                  type: 'bar',
                  barWidth: 0,
                  stack: '饱和度',
                  itemStyle: {
                    normal: {
                      color: '#44BBFE'
                    }
                  },
                  data: [10, 52, 20, 34, 30, 30, 20, 30, 30, 30, 20, 30]
                },
                {
                  type: 'bar',
                  name: '已处理',
                  barWidth: 10,
                  stack: '饱和度',
                  itemStyle: {
                    normal: {
                      color: '#B3E4FE'
                    }
                  },
                  data: [20, 72, 40, 54, 50, 50, 50, 50, 50, 50, 50, 50]
                },


              ]

            }
            this.chart.setOption(option);

          },
          chartSecond: function (id, data) {
            this.chart = echarts.init(document.getElementById(id));
            this.chart.clear();
            var option = {
              backgroundColor: "#fff",
              tooltip: {
                trigger: 'axis',
                show: true,
                backgroundColor: "rgba(0,0,0,0.4)",
                axisPointer: {

                }
              },
              legend: [{

                  left: 'center',
                  bottom: 25,
                  textStyle: {
                    fontSize: 12,
                    color: '#666'
                  },
                  data: ['物联卡', '云', 'ICT', '搜索引擎']
                },
                {
                  bottom: 0,
                  textStyle: {
                    fontSize: 12,
                    color: '#666'
                  },
                  data: ['大数据', 'IDC', '专线', '其他']
                }

              ],
              grid: {
                left: '2%',
                right: '2%',
                top: '15%',
                bottom: '20%',
                containLabel: true
              },
              xAxis: {
                axisLine: {
                  show: false
                },
                axisTick: {
                  show: false
                },
                axisLabel: {
                  interval: 0,
                },
                data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
              },
              yAxis: [{
                type: 'value',
                name: '单位：元',
                nameTextStyle: {
                  color: '#666',
                  fontSize: '12',
                  padding: [0, 0, 5, 0],

                },

                axisLabel: {
                  formatter: '{value}'
                },
                axisTick: {
                  show: false
                },
                axisLine: {
                  show: false,
                  lineStyle: {
                    color: '#666'
                  }
                },
                splitLine: {
                  lineStyle: {
                    color: '#EEF0F3',

                  }
                }
              }],
              series: [{
                  name: '大数据',
                  type: 'line',
                  symbol: 'emptyCircle',
                  symbolSize: 6,
                  smooth: false, //关键点，为true是不支持虚线的，实线就用true
                  itemStyle: {
                    normal: {
                      lineStyle: {
                        width: 2,
                        color: '#FFAE6D',
                        type: 'dotted' //'dotted'虚线 'solid'实线
                      }
                    }
                  },

                  data: [55, 70, 81, 95, 101, 129, 122, 95, 101, 129, 122]
                },
                {
                  name: 'ICT',
                  type: 'line',
                  smooth: true,
                  symbol: 'emptyCircle',
                  symbolSize: 6,
                  lineStyle: {
                    normal: {
                      width: 2,
                      color: '#24b314',
                    }
                  },
                  itemStyle: {
                    color: '#24b314',

                  },

                  data: [50, 60, 75, 85, 95, 100, 90, 85, 95, 100, 90]
                },
                {
                  name: 'IDC',
                  type: 'line',
                  smooth: true,
                  symbol: 'emptyCircle',
                  symbolSize: 6,
                  lineStyle: {
                    normal: {
                      width: 2,

                      color: '#027ad7',
                    }
                  },
                  itemStyle: {
                    color: '#027ad7',

                  },

                  data: [75, 60, 65, 60, 55, 60, 90, 60, 55, 60, 90]
                },
                {
                  name: '专线',
                  type: 'line',
                  smooth: true,
                  symbol: 'emptyCircle',
                  symbolSize: 6,
                  lineStyle: {
                    normal: {
                      width: 2,
                      color: '#FB7676',
                    }
                  },
                  itemStyle: {
                    color: '#FB7676',

                  },

                  data: [40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40]
                },
                {
                  name: '云',
                  type: 'line',
                  smooth: true,
                  symbol: 'emptyCircle',
                  symbolSize: 6,
                  lineStyle: {
                    normal: {
                      width: 2,

                      color: '#C8D1E5',
                    }
                  },
                  itemStyle: {
                    color: '#C8D1E5',
                  },
                  data: [65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65]
                },
                {
                  name: '其他',
                  type: 'line',
                  smooth: true,
                  symbol: 'emptyCircle',
                  symbolSize: 6,
                  lineStyle: {
                    normal: {
                      width: 2,
                      color: '#A9A3FF',
                    }
                  },
                  itemStyle: {
                    color: '#A9A3FF',
                  },
                  data: [15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15]
                },
                {
                  name: '物联卡',
                  type: 'line',
                  smooth: true,
                  symbol: 'emptyCircle',
                  symbolSize: 6,
                  lineStyle: {
                    normal: {
                      width: 2,
                      color: '#44BBFE',
                    }
                  },
                  itemStyle: {
                    color: '#44BBFE',
                  },

                  data: [105, 105, 105, 105, 105, 105, 105, 105, 105, 105, 105, 105]
                },

              ]




            };
            this.chart.setOption(option);
          },
          chartService: function (id, data) {
            this.chart = echarts.init(document.getElementById(id));
            this.chart.clear();
            var option = {
              tooltip: {
                width: "100%",
                triggerOn: 'click',
                trigger: 'axis',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                  type: 'none', // 默认为直线，可选为：'line' | 'shadow'
                },
                textStyle: {
                  color: '#fff',
                  fontSize: '12',

                },
                backgroundColor: 'rgba(0,0,0,0.4)',
              },
              grid: {
                left: '1px',
                right: '10px',
                bottom: '50px',
                top: '15px',
                containLabel: true
              },
              legend: {
                bottom: 18,
                itemWidth: 8,
                itemHeight: 8,
                borderRadius: 0,
                textStyle: {
                  color: '#666',
                },
              },
              xAxis: [{
                type: 'category',
                data: ['A类', 'B类', 'C类'],
                axisLabel: {
                  interval: 0,
                  lineStyle: {
                    color: '#EEF0F3'
                  },
                  textStyle: {
                    color: '#999'
                  }
                },
                axisTick: {
                  show: false
                },

                axisLine: {
                  show: true,
                  lineStyle: {
                    color: '#EEF0F3'
                  }
                },
              }],
              yAxis: [{
                  type: 'value',
                  axisLabel: {
                    formatter: '{value}'
                  },
                  axisTick: {
                    show: false
                  },
                  axisLine: {
                    show: false,
                    lineStyle: {
                      color: '#999'
                    }
                  },

                  splitLine: {
                    show: false,

                  }
                },
                {
                  type: 'value',
                  axisLabel: {
                    formatter: '{value}%'
                  },
                  axisTick: {
                    show: false
                  },
                  axisLine: {
                    show: false,
                    lineStyle: {
                      color: '#999'
                    }
                  },
                  splitLine: {
                    lineStyle: {
                      color: '#D8D8D8',

                    }
                  }
                },
              ],
              series: [{
                  name: '总量',
                  yAxisIndex: 0,
                  type: 'bar',
                  barWidth: 10,
                  itemStyle: {
                    normal: {
                      color: '#44BBFE'
                    }
                  },
                  data: [10, 52, 20]
                },
                {
                  name: '覆盖率',
                  yAxisIndex: 1,
                  type: 'bar',
                  barWidth: 10,
                  itemStyle: {
                    normal: {
                      color: '#FFAE6D'
                    }
                  },
                  data: [20, 32, 20]
                }


              ]

            }
            this.chart.setOption(option);

          },

          // 收入保障第三期
          chartCheckThird: function (id, data) {
            this.chart = echarts.init(document.getElementById(id));
            this.chart.clear();
            var option = {
              tooltip: {
                trigger: 'axis',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                  type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                }
              },
              grid: {
                left: '1px',
                right: '10px',
                bottom: '50px',
                top: '50px',
                containLabel: true
              },
              legend: {
                icon: 'rect',
                bottom: 16,
                itemWidth: 10,
                itemHeight: 10,
                borderRadius: 0,
                textStyle: {
                  color: '#666',
                },
              },
              dataZoom: {
                type: "inside",
                show: true,
                height: 20,
                bottom: 10,
                startValue: 12, //end-startValue+1 控制柱状图显示数量
                endValue: 16,

              },
              xAxis: [{
                type: 'category',
                data: ['分公司1', '分公司2', '分公司3', '分公司4', '分公司5', '分公司1', '分公司1', '分公司1', '分公司1', '分公司1', '分公司1', '分公司1', '分公司1'],
                axisLabel: {
                  interval: 0,
                  lineStyle: {
                    color: '#EEF0F3'
                  },
                  textStyle: {

                    color: '#999'
                  }
                },
                axisTick: {
                  show: false
                },

                axisLine: {
                  show: true,
                  lineStyle: {
                    color: '#EEF0F3'
                  }
                },
              }],
              yAxis: [{
                type: 'value',
                name: '单位：个',
                nameTextStyle: {
                  color: '#666',
                  fontSize: '12',
                  padding: [0, 0, 5, 0],

                },

                axisLabel: {
                  formatter: '{value}'
                },
                axisTick: {
                  show: false
                },
                axisLine: {
                  show: false,
                  lineStyle: {
                    color: '#666'
                  }
                },
                splitLine: {
                  lineStyle: {
                    color: '#EEF0F3',

                  }
                }
              }],
              series: [{
                  name: '抽检量',
                  type: 'bar',
                  barWidth: 7,
                  itemStyle: {
                    normal: {
                      color: '#44BBFE',
                      barBorderRadius: [2, 2, 0, 0],
                    },
                    emphasis: {
                      barBorderRadius: 2
                    },


                  },
                  data: [10, 52, 20, 34, 30, 30, 20, 30, 30, 20, 20, 30, 30, 20]
                },
                {
                  name: '待稽核数',
                  type: 'bar',
                  barWidth: 7,
                  itemStyle: {
                    normal: {
                      color: '#FFAE6D',
                      barBorderRadius: [2, 2, 0, 0],
                    },
                    emphasis: {
                      barBorderRadius: [2, 2, 0, 0]
                    },
                  },
                  data: [10, 52, 20, 34, 30, 30, 20, 30, 30, 20, 20, 30, 30, 20]
                },
                {
                  name: '退档量',
                  type: 'bar',
                  barWidth: 7,
                  itemStyle: {
                    normal: {
                      color: '#3DD1B6',
                      barBorderRadius: [2, 2, 0, 0],
                    },
                    emphasis: {
                      barBorderRadius: 2
                    },
                  },
                  data: [10, 52, 20, 34, 30, 30, 20, 30, 30, 20, 20, 30, 30, 20]
                }


              ]

            }
            this.chart.setOption(option);

          },

          chartArrea: function (id, data) {
            this.chart = echarts.init(document.getElementById(id));
            this.chart.clear();
            var option = {
              tooltip: {
                trigger: 'axis',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                  type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                }
              },
              grid: {
                left: '1px',
                right: '10px',
                bottom: '50px',
                top: '50px',
                containLabel: true
              },
              legend: {
                selectedMode: false,
                bottom: 16,
                itemWidth: 10,
                itemHeight: 10,
                borderRadius: 0,
                textStyle: {
                  color: '#666',
                },
              },

              xAxis: [{
                type: 'category',
                data: ['短信', '电子函', '双人上门询证', '诉讼函', '律师函'],
                axisLabel: {
                  interval: 0,
                  lineStyle: {
                    color: '#EEF0F3'
                  },
                  textStyle: {
                    color: '#666'
                  }
                },
                axisTick: {
                  show: false
                },

                axisLine: {
                  show: true,
                  lineStyle: {
                    color: '#EEF0F3'
                  }
                },
              }],
              yAxis: [{
                  type: 'value',
                  name: '单位：元',
                  nameTextStyle: {
                    color: '#666',
                    fontSize: '12',
                    padding: [0, 0, 5, 0],

                  },

                  axisLabel: {
                    formatter: '{value}'
                  },
                  axisTick: {
                    show: false
                  },
                  axisLine: {
                    show: false,
                    lineStyle: {
                      color: '#666'
                    }
                  },
                  splitLine: {
                    lineStyle: {
                      color: '#EEF0F3',

                    }
                  }
                },
                {
                  type: 'value',
                  name: '单位：%',
                  nameTextStyle: {
                    color: '#666',
                    fontSize: '12',
                    padding: [0, 0, 5, 0],

                  },

                  axisLabel: {
                    formatter: '{value}'
                  },
                  axisTick: {
                    show: false
                  },
                  axisLine: {
                    show: false,
                    lineStyle: {
                      color: '#666'
                    }
                  },
                  splitLine: {
                    lineStyle: {
                      color: '#EEF0F3',

                    }
                  }
                }

              ],
              series: [{
                  name: '欠费总金额',
                  type: 'bar',
                  barWidth: 7,
                  yAxisIndex: 0,
                  itemStyle: {
                    normal: {
                      color: '#44BBFE',
                      barBorderRadius: [2, 2, 0, 0],
                    },
                    emphasis: {
                      barBorderRadius: 2
                    },
                  },
                  data: [10, 52, 20, 34, 30]
                },
                {
                  name: '回馈',
                  type: 'bar',
                  yAxisIndex: 0,
                  barWidth: 7,
                  itemStyle: {
                    normal: {
                      barBorderRadius: [2, 2, 0, 0],
                      color: '#3DD1B6'
                    },
                    emphasis: {
                      barBorderRadius: 2
                    },
                  },
                  data: [10, 52, 20, 34, 30]
                },
                {
                  name: '大数据',
                  type: 'line',
                  yAxisIndex: 1,
                  itemStyle: {
                    normal: {
                      color: '#FFAE6D'
                    }
                  },
                  data: [10, 42, 30, 34, 30]
                },
                {
                  name: '专线',
                  type: 'line',
                  yAxisIndex: 1,
                  itemStyle: {
                    normal: {
                      color: '#FB7676'
                    }
                  },
                  data: [10, 52, 20, 34, 24]
                },



              ]

            }
            this.chart.setOption(option);

          },
          chartArreaRate: function (id, data) {
            this.chart = echarts.init(document.getElementById(id));
            this.chart.clear();
            var option = {
              legend: {
                selectedMode: false,
                type: 'plain',
                icon: 'circle',
                orient: 'vertical',
                left: '60%',
                top: '19%',

                align: 'left',
                itemGap: 15,
                itemWidth: 10, // 设置宽度
                itemHeight: 10, // 设置高度
                symbolKeepAspect: false,
                textStyle: {
                  color: '#666',
                  rich: {
                    name: {
                      verticalAlign: 'right',
                      align: 'left',
                      width: 35,
                      fontSize: 12,
                      color: '#999'
                    },
                  }
                },
                data: data.map(item => item.name),
                formatter: function (name) {

                  if (data && data.length) {
                    for (var i = 0; i < data.length; i++) {
                      if (name === data[i].name) {

                        return (
                          '{name| ' +
                          name +
                          '} '
                        )
                      }
                    }
                  }
                }
              },
              series: [{
                name: '数量',
                type: 'pie',
                radius: ['50%', '70%'],
                center: ['30%', '50%'],
                data: data,
                label: {
                  normal: {
                    show: false,
                    position: 'center',
                    formatter: "{text|{d}%}\n{name|{b}}",
                    rich: {
                      text: {
                        align: 'center',
                        verticalAlign: 'middle',
                        padding: 8,
                        fontSize: 18,
                        color: "#333"
                      },
                      value: {
                        align: 'center',
                        verticalAlign: 'middle',
                        fontSize: 12,
                        color: "#666"
                      },
                      name: {
                        align: 'center',
                        verticalAlign: 'middle',
                        fontSize: 14,
                        color: "#666"
                      }
                    }
                  },
                  emphasis: {
                    show: true,
                    textStyle: {
                      fontSize: '12'
                    }
                  }
                },
                labelLine: {
                  normal: {
                    show: true
                  }
                }
              }]
            }
            this.chart.setOption(option);
            this.chart.resize();
          },
        }
      }
    }
  })
}

export default {
  install,
}
