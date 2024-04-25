<template>
  <Menu
    ref="menu"
    class="uic-menu"
    :model="pvMenuItems as PrimeVueMenuItem[]"
    :popup="true"
    :pt="{
      transition: {
        enterFromClass: 'opacity-0 scale-[.98]',
        enterActiveClass: 'transition duration-250 ease-out',
        leaveActiveClass: 'transition duration-250 ease-out',
        leaveToClass: 'opacity-0 scale-[.98]'
      }
    }"
  >
    <template #submenuheader="item">
      <span class="uic-menu-item-parent">
        <Icon
          v-if="
            item.item.icon &&
            Object.values<string>(IconName).includes(item.item.icon)
          "
          :icon="item.item.icon as IconName"
        />
        {{ item.item.label }}
      </span>
    </template>

    <template #item="item">
      <ConditionalWrapper
        :tag="getWrappingTag(item.item.url)"
        :to="item.item.url"
        :href="item.item.url"
        :target="item.item.target"
      >
        <span class="uic-menu-item-child">
          <Icon
            v-if="
              item.item.icon &&
              Object.values<string>(IconName).includes(item.item.icon)
            "
            :icon="item.item.icon as IconName"
          />
          <span>{{ item.item.label }}</span>
        </span>
      </ConditionalWrapper>
    </template>

    <template v-if="$slots.footer" #end>
      <div class="uic-menu-footer">
        <slot name="footer" />
      </div>
    </template>
  </Menu>
</template>

<script setup lang="ts">
import Menu from 'primevue/menu';
import { MenuItem as PrimeVueMenuItem } from 'primevue/menuitem';
import { computed, defineSlots, ref } from 'vue';
import { IconName } from '../Icon';
import Icon from '../Icon/Icon.vue';
import { MenuItem, MenuItemParent } from './types';
import ConditionalWrapper from '@/utils/ConditionalWrapper.vue';

const props = withDefaults(
  defineProps<{
    items: (MenuItem | MenuItemParent)[];
  }>(),
  {}
);

defineSlots<{
  footer(): any;
}>();

const menu = ref();

defineExpose({
  toggle: (e: Event) => menu.value.toggle(e)
});

/** Translates our MenuItem to a PrimeVue MenuItem */
const pvMenuItems = computed<PrimeVueMenuItem[]>(() =>
  props.items.map((item) => {
    const pvItem: PrimeVueMenuItem = {
      label: item.label,
      icon: item.icon,
      key: item.key
    };

    if (!('items' in item)) {
      pvItem.command = item.clickHandler;
      pvItem.url = item.to;
      pvItem.disabled = item.disabled;
      pvItem.visible = item.visible;
      pvItem.target = item.target;
    }

    return pvItem;
  })
);

const getWrappingTag = (to?: string) => {
  if (to) {
    return to.startsWith('http') ? 'a' : 'router-link';
  }
  return undefined;
};
</script>

<style lang="scss">
.uic-menu {
  @apply my-1 p-2 w-72;
  @apply border border-gray-100 rounded-lg;
  @apply bg-white;
  @apply shadow-large;

  .uic-menu-item-parent {
    @apply flex items-center gap-2;
    @apply px-2 py-1;
    @apply type-base-600 text-gray-800;
  }

  .uic-menu-item-child {
    @apply flex items-center gap-2;
    @apply cursor-pointer;
    @apply p-2;
    @apply type-base-400 text-gray-800;
    @apply rounded-md;
    @apply transition-colors;

    &:hover {
      @apply bg-gray-25;
    }
  }

  .uic-menu-footer {
    @apply w-full p-3;
    @apply border-t border-gray-100;
  }
}
</style>
