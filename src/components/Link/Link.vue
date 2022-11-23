<template>
  <span :class="[{ 'cursor-not-allowed': disabled, 'cursor-pointer': !disabled }]">
    <component
      :is="tag"
      :[linkProp]="to"
      :target="target"
      :rel="target === '_blank' ? 'noopener noreferrer' : ''"
      :aria-disabled="disabled"
      v-bind="$attrs"
      :class=" [ { 'pointer-events-none': disabled },
                 { 'text-blue-600': link },
                 { 'underline': link && underline },
                 link ? `type-${size}-600`: '',
                 link && bold ? `type-${size}-800 no-underline`: '',
                 { '!text-gray-400': link && disabled }
      ]"
    >
      <slot />
      <ChevronRight
        v-if="link && withChevron"
        class="h-4 inline-flex -mr-1"
      />
    </component>
  </span>
</template>

<script>
import { ChevronRight } from '@/components/Icons';
export default {
  name: 'LobLink',
  components: { ChevronRight },
  inheritAttrs: false,
  props: {
    variant: {
      type: String,
      default: 'link',
      validator: function (value) {
        return ['link', 'primary-button', 'secondary-button'].includes(value);
      }
    },
    size: {
      type: String,
      default: 'base',
      validator: function (value) {
        return ['small', 'base', 'large', 'xl'].includes(value);
      }
    },
    underline: {
      type: Boolean,
      default: true
    },
    bold: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    to: {
      type: [String, Object],
      default: ''
    },
    target: {
      type: String,
      default: '_self'
    },
    withChevron: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    link () {
      return this.variant === 'link';
    },
    isExternal () {
      const protocolRelativePattern = /^https?:\/\/|^\/\//i;
      return typeof this.to === 'string' && protocolRelativePattern.test(this.to);
    },
    tag () {
      return this.isExternal ? 'a' : 'router-link';
    },
    linkProp () {
      return this.isExternal ? 'href' : 'to';
    }
  }
};
</script>
