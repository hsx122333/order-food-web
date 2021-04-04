<template>
  <div id="picChart" class="arr_chart" />
</template>

<script>
import echarts from 'echarts'

export default {
  data () {
    return {
      chart: null,
      color: ['#2F6BFF', '#0DC6A4']
    }
  },
  mounted () {
    this.$chart.chartYear("picChart");
  },
  beforeDestroy () {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },

}
</script>

