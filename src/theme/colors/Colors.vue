<template>
  <div>
    <div>
      <div
        v-for="color in graidentColors"
        :key="color"
        class="pb-8"
      >
        <h1 :class="`tw-text-${color}`">
          {{ color }}
        </h1>
        <div
          v-for="modifier in modifiers"
          :key="`tw-${color}-${modifier}`"
        >
          <h1 :class="`tw-text-${color}-${modifier}`">
            {{ color }}-{{ modifier }}
          </h1>
        </div>
      </div>
    </div>
    <div
      v-for="color in singleColors"
      :key="color"
      class="pb-8"
    >
      <h1 :class="`tw-text-${color}`">
        {{ color }}
      </h1>
    </div>
  </div>
</template>

<script>
import { theme } from '../../../tailwind.config';

const { colors } = theme;

export default {
  name: 'Theme',
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
  }
};
</script>
