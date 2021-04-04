<template>
  <header class="fixed-head">
    <div class="e-page-head-left">
      <i class="el-icon-arrow-left"></i>
    </div>
    <span>{{ title }}</span>
  </header>
</template>
<script>
  export default {
    props: ["title"]
  }
</script>
