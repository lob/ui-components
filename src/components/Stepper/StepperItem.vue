<template>
  <div
    :class="['w-16 text-xs md:text-base md:w-32 inline-block border-t relative marker',
             {'border-dashed': dashedBorder},
             {'text-center': !alignLeft},
             {'marker-center': !alignLeft},
             {'border-primary-500': finished || active},
             {'marker-finished': finished},
             {'marker-active': active},
             {'border-error marker-error': error},
             {'border-gray-100 marker-unfinished': unfinished},
             {'half-border half-border-right': first && !alignLeft},
             {'half-border half-border-left': last && !alignLeft},
             {'border-none': last && alignLeft}]"
  >
    <check
      v-if="finished"
      :class="['check absolute -top-1 z-30 text-white',
               {'check-center': !alignLeft}]"
    />
    <slot />
  </div>
</template>

<script>
import { Check } from '../Icons';
export default {
  name: 'StepperItem',
  components: { Check },
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
    },
    alignLeft: {
      type: Boolean,
      default: false
    },
    dashedBorder: {
      type: Boolean,
      default: false
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
  }

  .check {
    @apply w-3.5;
    @apply -mt-1;

    padding-top: 1px;
  }

  .marker-center::before,
  .check-center {
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
