<template>
  <div id="trendChart" class="arr2_chart" />
</template>

<script>
export default {

  data () {
    return {
      chart: null,
      color: ['#2F6BFF', '#0DC6A4'],
      dataTrend: [
        {
          name: '物联卡',
          value: 36,
          rate: 12,
          itemStyle: {
            color: '#44BBFE'
          }
        },
        {
          name: 'ICT',
          value: 20,
          rate: 20,
          itemStyle: {
            color: '#3DD1B6'
          }
        },
        {
          name: 'IDC',
          value: 16,
          rate: -40,
          itemStyle: {
            color: '#2F6BFF'
          }
        },
        {
          name: '其他',
          value: 10,
          rate: -15,
          itemStyle: {
            color: '#A9A3FF'
          }
        },
        {
          name: '云',
          value: 9,
          rate: 12,
          itemStyle: {
            color: '#DCE7FF'
          }
        },
        {
          name: '大数据',
          value: 9,
          rate: -6,
          itemStyle: {
            color: '#FFAE6D'
          }
        },
        {
          name: '专线',
          value: 9,
          rate: -6,
          itemStyle: {
            color: '#FB7676'
          }
        }
      ],
    }
  },
  methods: {
  },
  mounted () {
    this.$chart.chartLine("trendChart");
  },

}
</script>

