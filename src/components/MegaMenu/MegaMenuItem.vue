<template>
  <div
    :class="[
      {'pb-2': small},
      {'pb-4': !small}
    ]"
    @keyup.esc="onEscape"
  >
    <LobLink
      :to="to"
      class="flex pt-1 flex-nowrap items-center hover:text-primary-500 w-64 no-underline"
    >
      <img
        :src="imageSource"
        alt=""
        :class="[
          'self-center transition-transform duration-200 ease-linear transform hover:scale-110',
          {'w-10 h-10': small},
          {'w-12 h-12': !small},
          // Preserves the spacing this element creates.
          {'invisible': !imageSource}]"
      >
      <div class="pl-2 text-gray-900">
        <span
          :class="['pt-1 opacity-75 transition-colors transition-opacity no-underline xl:pb-0.5 block relative align-top mx-auto whitespace-nowrap border-none text-normal text-lg hover:text-primary-500', {'py-1': small}]"
        >
          <slot />
        </span>
        <div
          v-if="subtitle"
          class="opacity-80 pr-0 text-gray-700 text-sm hidden xl:block"
        >
          {{ subtitle }}
        </div>
      </div>
    </LobLink>
  </div>
</template>

<script>
import LobLink from '@/components/Link/Link.vue';

export default {
  name: 'MegaMenuItem',
  components: { LobLink },
  props: {
    to: {
      type: String,
      required: true
    },
    imageSource: {
      type: String,
      required: false,
      default: null
    },
    subtitle: {
      type: String,
      default: ''
    },
    small: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onEscape () {
      this.$parent.onEscape();
    }
  }
};
</script>
