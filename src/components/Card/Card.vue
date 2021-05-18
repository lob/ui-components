<template>
  <div class="card">
    <slot name="content" />
  </div>
</template>

<script>
export default {
  name: 'Card'
};
</script>

<style scoped lang="scss">
  .card {
    padding: 24px;
    box-shadow: 0 5px 14px rgba(44, 67, 81, 0.13), 0 0 4px rgba(44, 67, 81, 0.02);
  }
</style>
