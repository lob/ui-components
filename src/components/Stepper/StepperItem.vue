<template>
  <div
    :class="['w-16 text-xs md:text-base md:w-32 text-center inline-block border-t relative marker',
             {'border-primary-500': finished || active},
             {'marker-finished': finished},
             {'marker-active': active},
             {'border-error marker-error': error},
             {'border-gray-100 marker-unfinished': unfinished},
             {'half-border': first || last},
             {'half-border-right': first},
             {'half-border-left': last}]"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: 'StepperItem',
  props: {
    position: {
      type: String,
      default: 'middle',
      validator: (prop) => ['first', 'middle', 'last'].includes(prop)
    },
    variant: {
      type: String,
      default: 'finished',
      validator: (prop) => ['finished', 'active', 'error', 'unfinished'].includes(prop)
    }
  },
  computed: {
    finished () {
      return this.variant === 'finished';
    },
    active () {
      return this.variant === 'active';
    },
    error () {
      return this.variant === 'error';
    },
    unfinished () {
      return this.variant === 'unfinished';
    },
    first () {
      return this.position === 'first';
    },
    last () {
      return this.position === 'last';
    }
  }
};
</script>

<style scoped lang="scss">

  .marker-finished::before {
    @apply bg-primary-500;
    @apply text-white;
    content: "✔" !important;
    font-size: 9px;
    line-height: 15px;
  }

  .marker-active::before {
    @apply bg-primary-500;
    @apply p-1;
    @apply border-2;
    @apply border-white;
    box-shadow: 0 0 0 1px var(--color-primary-rgb);
  }

  .marker-error::before {
    @apply bg-error;
  }

  .marker-unfinished::before {
    @apply bg-gray-100;
  }

  .marker::before {
    @apply rounded-full;
    @apply relative;
    @apply block;
    @apply w-3.5;
    @apply h-3.5;
    @apply z-10;
    top: -7px;
    content: "";
    margin-left: calc(50% - 7px);
  }

  .half-border::after {
    @apply p-0;
    @apply m-0;
    @apply block;
    @apply w-3/6;
    @apply h-1;
    @apply bg-white;
    @apply absolute;
    @apply -top-1;
    content: "";
  }

  .half-border-left::after {
    @apply right-0;
  }

  .half-border-right::after {
    @apply left-0;
  }
</style>
