<template>
  <nav>
    <ul :class="`flex pb-3.5 border-b border-gray-100 ${ulClass}`">
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
