<template>
  <li class="w-full my-1 max-h-12 hover:bg-gray-50 relative">
    <div
      v-if="isActive"
      class="absolute top-2 -left-[3px] w-1 h-5 bg-gray-800 rounded-full"
    />
    <LobLink
      :to="to"
      :class="[
        'block !w-full py-2 pl-4 whitespace-nowrap focus:ring-0 focus-visible:bg-gray-50 focus-visible:!ring-0 focus-visible:!rounded-none focus-visible:!ring-offset-0',
        [ isActive ? 'type-small-600 text-gray-800 hover:!text-gray-800 active:!text-gray-800' : 'type-small-500 text-gray-500 hover:!text-gray-500 active:!text-gray-500' ]
      ]"
      :underline="false"
      @click.stop="handleNavigation"
    >
      {{ title }}
    </LobLink>
  </li>
</template>

<script>
import LobLink from '../Link/Link';

export default {
  name: 'MainNavigationChildItem',
  components: { LobLink },
  props: {
    title: {
      type: String,
      required: true
    },
    to: {
      type: String,
      required: true
    }
  },
  emits: ['nav'],
  computed: {
    isActive () {
      return this.$route.path.startsWith(this.to);
    }
  },
  watch: {
    isActive (val) {
      if (val) {
        //nextTick if true, so that true overwrittes the false coming from the other child item
        this.$nextTick(() => {
          this.$parent.hasActiveChild = true;
        });
      } else {
        this.$parent.hasActiveChild = false;
      }
    }
  },
  methods: {
    handleNavigation () {
      this.$emit('nav', this.to);
    }
  }
};
</script>
