<template>
  <nav class="flex">
    <img
      v-if="iconSrc"
      :src="iconSrc"
      :alt="iconAltText"
      class="w-6 mr-1.5 align-bottom"
    />
    <router-link
      v-for="crumb in crumbs"
      :key="crumb.name"
      :to="crumb.path"
      exact
      class="flex items-center text-sm text-gray-500"
      active-class="!text-primary-500"
    >
      {{ crumb.name }}
      <chevron-right class="w-4 h-4 mx-2" />
    </router-link>
  </nav>
</template>

<script>
import ChevronRight from "../Icons/ChevronRight";
import { START_LOCATION } from "vue-router";

export default {
  name: "Breadcrumb",
  components: { ChevronRight },
  props: {
    startName: {
      // START_LOCATION does not have a name so we need to know what to display
      type: String,
      required: true,
    },
    iconSrc: {
      type: String,
      default: "",
    },
    iconAltText: {
      type: String,
      default: "",
    },
  },
  computed: {
    crumbs() {
      const routes = [
        { name: this.startName, path: START_LOCATION.path },
        ...this.$route.matched,
      ];
      return routes.map((routeRecord) => {
        const pathSegments = routeRecord.path.split("/");
        const lastChildInPath = pathSegments[pathSegments.length - 1];

        return {
          name: routeRecord.name || this.titleize(lastChildInPath),
          path: routeRecord.path,
        };
      });
    },
  },
  methods: {
    titleize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    },
  },
};
</script>

<style scoped lang="scss">
a:last-child {
  svg {
    @apply hidden;
  }
}
</style>
