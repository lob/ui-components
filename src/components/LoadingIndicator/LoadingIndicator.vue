<template>
  <div
    :class="{ `animate-spin loading-gif ${loadingClass}`: loading }"
    aria-live="polite"
    :aria-busy="loading"
    data-testId="loading-indicator"
  >
    <slot />
  </div>
</template>

<script>
import { Comment } from 'vue';

export default {
  name: 'LoadingIndicator',
  props: {
    loadingClass: {
      type: String,
      default: ''
    }
  },
  computed: {
    loading () {
      return !this.$slots.default || this.$slots.default().findIndex((o) => o.type !== Comment) === -1;
    }
  }
};
</script>

<style lang="scss" scoped>
.loading-gif {
  background: #fff url(https://s3-us-west-2.amazonaws.com/public.lob.com/sites/spinner-medium.svg) no-repeat center;
  background-size: 24px 24px;
  width: 100%;
  height: 50px;
  margin: 0 auto;
}
</style>
