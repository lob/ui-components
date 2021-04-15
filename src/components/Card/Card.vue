<template>
  <div class="card">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Card'
}
</script>

<style scoped lang="scss">
  .card {
    padding: 24px;
    box-shadow: 0px 5px 14px rgba(44, 67, 81, 0.13), 0px 0px 4px rgba(44, 67, 81, 0.02);
  }
</style>
