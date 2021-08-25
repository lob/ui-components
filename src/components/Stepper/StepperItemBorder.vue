<template>
  <div
    class="w-full"
    :style="`color: ${backgroundColor}`"
  >
    <div
      :class="[
        'stepper-item-border flex flex-col relative border-current',
        {'items-start': alignLeft},
        {'items-center': alignCenter},
        {'items-end': alignRight},
        {'border-none': alignLeft && last},
        {'half-border': alignCenter},
        {'half-border-right': first},
        {'half-border-left': last},
        {'half-border-bottom': (first || last) && textBottom},
        {'half-border-top': (first || last) && textTop},
        {'border-none': alignRight && first},
        {'border-dashed ': dashedBorder},
        { 'border-t ': textBottom },
        { 'border-b': textTop }

      ]"
      :style="`border-color: ${borderColor || color}`"
    />
  </div>
</template>

<script>
export default {
  name: 'StepperItemBorder',
  props: {
    backgroundColor: {
      type: String,
      required: true
    },
    borderColor: {
      type: String,
      required: true
    },
    color: {
      type: String,
      required: true
    },
    alignLeft: {
      type: Boolean,
      required: true
    },
    alignCenter: {
      type: Boolean,
      required: true
    },
    alignRight: {
      type: Boolean,
      required: true
    },
    first: {
      type: Boolean,
      required: true
    },
    last: {
      type: Boolean,
      required: true
    },
    textBottom: {
      type: Boolean,
      required: true
    },
    textTop: {
      type: Boolean,
      required: true
    },
    dashedBorder: {
      type: Boolean,
      required: true
    }
  }
};
</script>

<style scoped lang="scss">
.stepper-item-border {
  min-width: 4rem;

  @screen md {
    min-width: 8rem;
  }
}

  .half-border::after {
    @apply p-0;
    @apply m-0;
    @apply block;
    @apply w-1/2;
    @apply h-1;
    @apply bg-current;
    @apply absolute;

    content: "";
  }

  .half-border.border-b:not(.half-border-left):not(.half-border-right):after {
    @apply -top-3;
  }

  .half-border-left::after {
    @apply right-0;
  }

  .half-border-right::after {
    @apply left-0;
  }

  .half-border-bottom::after {
    @apply -top-1;
  }

  .half-border-top::after {
    @apply top-0;
  }
</style>
