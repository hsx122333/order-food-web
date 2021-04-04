<template>
  <div id="serviceChart" class="arr2_chart" />
</template>

<script>


export default {
  data () {
    return {
      chart: null,
    }
  },
  mounted () {
    this.$chart.chartService("serviceChart");
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

