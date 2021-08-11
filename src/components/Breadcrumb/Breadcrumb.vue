<template>
  <nav class="flex">
    <img
      v-if="iconSrc"
      :src="iconSrc"
      :alt="iconAltText"
      class="w-6 mr-1.5 align-bottom"
    >
    <router-link
      v-for="crumb in crumbs"
      :key="crumb.name"
      :to="crumb.path"
      class="flex items-center text-sm text-gray-500"
      exact-active-class="!text-primary-500"
    >
      {{ crumb.name }}
      <chevron-right class="w-4 h-4 mx-2" />
    </router-link>
  </nav>
</template>

<script>
import { ChevronRight } from '@/components/Icons';
import { START_LOCATION } from 'vue-router';

export default {
  name: 'Breadcrumb',
  components: { ChevronRight },
  props: {
    startName: {
      // START_LOCATION does not have a name so we need to know what to display
      type: String,
      required: true
    },
    iconSrc: {
      type: String,
      default: ''
    },
    iconAltText: {
      type: String,
      default: ''
    }
  },
  computed: {
    crumbs () {
      let routes = [
        { name: this.startName, path: START_LOCATION.path }
      ];

      if (this.$route.path !== START_LOCATION.path) {
        // unique matched route records by path, grabbing the last duplicated if more than one
        const uniqueMatchedByPath = [...new Map(this.$route.matched.map((matched) => [matched.path, matched])).values()];
        routes = [...routes, ...uniqueMatchedByPath];
      }

      return routes.map((routeRecord) => {
        const pathSegments = routeRecord.path.split('/');
        const lastChildInPath = pathSegments[pathSegments.length - 1];

        return {
          name: this.titleize(routeRecord.name) || this.titleize(lastChildInPath),
          path: routeRecord.path
        };
      });
    }
  },
  methods: {
    titleize (str) {
      if (!str) {
        return null;
      }

      let sanitizedStr = str.toLowerCase();

      let splitStr = sanitizedStr.split(' ');
      splitStr = splitStr.map((word) => word.replace(/^[a-z]/i, (letter) => {
        return letter.toUpperCase();
      }));

      sanitizedStr = splitStr.join(' ');
      return sanitizedStr.trim();
    }
  }
};
</script>

<style scoped lang="scss">
a:last-child {
  svg {
    @apply hidden;
  }
}
</style>
