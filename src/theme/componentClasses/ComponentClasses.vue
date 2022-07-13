<template>
  <div>
    <div
      v-for="compClass in compClasses"
      :key="compClass"
      class="mb-6"
    >
      <p :class="`${compClass}`">
        {{ compClass }}
      </p>
    </div>
  </div>
</template>

<script>
const componentClasses = ['banner-small', 'banner-medium', 'banner-default', 'pageheading', 'subheading-1', 'text-default', 'text-default-light', 'text-default-bold', 'text-small', 'text-small-light', 'text-small-bold', 'caps-large', 'caps-medium', 'caps-small'];

export default {
  name: 'Theme',
  computed: {
    compClasses () {
      return componentClasses;
    }
  }
};
</script>
