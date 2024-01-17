<template>
  <nav class="overflow-x-auto h-12 border-b border-gray-100 customOutline">
    <ul :class="`flex items-baseline ${ulClass}`">
      <slot />
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Subnavigation',
  props: {
    ulClass: {
      type: String,
      default: ''
    }
  }
};
</script>

<style scoped>
.customOutline:has(:focus-visible) {
  @apply outline-1;
  @apply outline-dashed;
  @apply outline-black;
  @apply outline-offset-1;
}
</style>
