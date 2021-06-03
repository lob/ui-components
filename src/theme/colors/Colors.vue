<template>
  <div>
    <div
      v-for="color in Object.keys(themeColors)"
      :key="color"
      class="pb-8"
    >
      <h1
        :class="`text-${color}`"
      >
        {{ color }}
      </h1>

      <template
        v-if="typeof themeColors[color] === 'object'"
      >
        <div
          v-for="nestedColor in Object.keys(themeColors[color])"
          :key="nestedColor"
        >
          <h1
            v-if="typeof themeColors[color][nestedColor] === 'string' && nestedColor !== 'DEFAULT'"
            :class="`text-${color}-${nestedColor}`"
          >
            {{ color }}-{{ nestedColor }}
          </h1>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { theme } from '../../../tailwind.config';

const { colors } = theme;

export default {
  name: 'Theme',
  computed: {
    themeColors () {
      return colors;
    }
  }
};
</script>
