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
      class="flex items-center text-sm leading-4 font-light text-gray-900"
      exact-active-class="!text-primary-500"
    >
      {{ crumb.name }}
      <chevron-right
        size="s"
        class="mx-2"
      />
    </router-link>
  </nav>
</template>

<script>
import { ChevronRight } from '@/components/Icons';
import { START_LOCATION } from 'vue-router';

const URL_DELIMITER = '/';

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

      return routes.map((routeRecord, index) => {
        return {
          name: this.getCrumbDisplay(routeRecord),
          path: this.getCrumbPath(routeRecord, index)
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
    },
    getParamDisplay (lastChildInPath) {
      const lastChildIsParam = lastChildInPath.match(/^:(.*)/);

      let param;
      if (lastChildIsParam) {
        const paramName = lastChildIsParam[1];
        param = this.$route.params[paramName];
      }

      return param;
    },
    getPathDisplay (lastChildInPath) {
      return this.titleize(lastChildInPath);
    },
    getCrumbDisplay (routeRecord) {
      const displayName = routeRecord.meta?.displayName || '';
      const useParamsForDisplay = routeRecord.meta?.useParamsForDisplay || false;
      const pathSegments = routeRecord.path.split(URL_DELIMITER);
      const lastChildInPath = pathSegments[pathSegments.length - 1];

      const paramDisplay = this.getParamDisplay(lastChildInPath);
      const pathDisplay = this.getPathDisplay(lastChildInPath);
      const routeNameDisplay = this.titleize(routeRecord.name);

      let fallbackDisplay;
      if (useParamsForDisplay) {
        fallbackDisplay = paramDisplay || pathDisplay || routeNameDisplay;
      } else {
        fallbackDisplay = routeNameDisplay || pathDisplay;
      }

      return displayName || fallbackDisplay;
    },
    getCrumbPath (routeRecord, index) {
      const routeSubPathWithParams = this.$route.path.split(URL_DELIMITER).slice(0, index + 1).join(URL_DELIMITER);
      return routeSubPathWithParams || routeRecord.path;
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
