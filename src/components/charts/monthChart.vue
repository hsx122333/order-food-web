<template>
  <div id="monthChart" class="arr2_chart" />
</template>

<script>


export default {
  data () {
    return {
      chart: null,
    }
  },
  mounted () {
    this.$chart.chartMonth("monthChart");
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

