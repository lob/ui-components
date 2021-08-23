<template>
  <div
    :class="[
      'w-16 md:w-32 min-w-max flex flex-col relative border-current',
      {'items-start': alignLeft},
      {'items-center': alignCenter},
      {'items-end': alignRight}
    ]"
  >
    <div
      :style="`color: ${backgroundColor}`"
    >
      <div
        :class="[
          'w-16 md:w-32 min-w-max flex flex-col relative border-current',
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
    <div
      :class="[
        'w-16 md:w-32 min-w-max  flex flex-col relative',
        {'items-start': alignLeft},
        {'items-center': alignCenter},
        {'items-end': alignRight}
      ]"
    >
      <div
        v-if="textTop"
        class="mb-6"
      >
        <slot />
      </div>
      <div
        :class="[
          'z-10 rounded-full w-5 h-5 absolute border border-transparent bg-white',
          { '!border-current': active },
          { '-top-2.5': textBottom },
          { 'top-10': textTop }
        ]"
        :style="`color: ${color}`"
      >
        <div
          class="rounded-full w-3 h-3 absolute bg-current"
          style="left: 0.1875rem; top: 0.1875rem; color: ${color};"
        >
          <check
            v-if="finished"
            class="w-2 absolute top-0.5 left-0.5 z-20 text-white"
          />
        </div>
      </div>
      <div
        v-if="textBottom"
        class="mt-6"
      >
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import { Check } from '../Icons';
import { config } from 'tailwind-plugin-lob';

const { theme } = config;
const { colors } = theme;

export default {
  name: 'StepperItem',
  components: { Check },
  props: {
    position: {
      type: String,
      default: 'middle',
      validator: (prop) => ['first', 'middle', 'last'].includes(prop)
    },
    alignment: {
      type: String,
      default: 'center',
      validator: (prop) => ['left', 'center', 'right'].includes(prop)
    },
    textVerticalAlign: {
      type: String,
      default: 'bottom',
      validator: (prop) => ['bottom', 'top'].includes(prop)
    },
    color: {
      type: String,
      default: colors.primary['500']
    },
    // will default to color if not provided
    borderColor: {
      type: String,
      default: null
    },
    backgroundColor: {
      type: String,
      default: null
    },
    active: {
      type: Boolean,
      default: false
    },
    finished: {
      type: Boolean,
      default: false
    },
    dashedBorder: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    first () {
      return this.position === 'first';
    },
    last () {
      return this.position === 'last';
    },
    alignLeft () {
      return this.alignment === 'left';
    },
    alignCenter () {
      return this.alignment === 'center';
    },
    alignRight () {
      return this.alignment === 'right';
    },
    textTop () {
      return this.textVerticalAlign === 'top';
    },
    textBottom () {
      return this.textVerticalAlign === 'bottom';
    }
  }
};
</script>

<style scoped lang="scss">
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
    @apply top-12;
  }
</style>
