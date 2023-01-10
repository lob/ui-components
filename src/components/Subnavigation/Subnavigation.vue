<template>
  <nav class="overflow-x-auto h-12 border-b border-gray-100 focus-within:outline-offset-1 focus-within:outline-dashed focus-within:outline-black">
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
