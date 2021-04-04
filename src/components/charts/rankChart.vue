<template>
  <div id="rankChart" class="arr2_chart" />
</template>

<script>
export default {
  data () {
    return {
      chart: null,
    }
  },
  mounted () {
    this.$chart.chartRank("rankChart");
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

