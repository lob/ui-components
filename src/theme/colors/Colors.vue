<template>
  <div>
    <div>
      <div
        v-for="color in graidentColors"
        :key="color"
        class="pb-8"
      >
        <h1>{{ color }}</h1>
        <h2 :class="colorClassName(color)">
          {{ color }}
        </h2>
        <div
          v-for="modifier in modifiers"
          :key="`${color}-${modifier}`"
        >
          <h2 :class="colorClassName(color, modifier)">
            {{ color }}-{{ modifier }}
          </h2>
        </div>
      </div>
    </div>
    <div
      v-for="color in singleColors"
      :key="color"
      class="pb-8"
    >
      <h1>{{ color }}</h1>
      <h2 :class="colorClassName(color)">
        {{ color }}
      </h2>
    </div>
  </div>
</template>

<script>
import { theme } from '../../../tailwind.config';

const { colors } = theme;

export default {
  name: 'Colors',
  computed: {
    singleColors () {
      return Object.keys(colors).reduce((singles, color) => {
        if (typeof colors[color] === 'string') {
          singles.push(color);
        }
        return singles;
      }, []);
    },
    graidentColors () {
      return Object.keys(colors).reduce((gradients, color) => {
        if (typeof colors[color] === 'object') {
          gradients.push(color);
        }
        return gradients;
      }, []);
    },
    modifiers () {
      return ['xd', 'd', 'l', 'xl'];
    }
  },
  methods: {
    colorClassName (color, modifier = null) {
      return modifier ? `tw-text-${color}-${modifier}` : `tw-text-${color}`;
    }
  }
};
</script>
