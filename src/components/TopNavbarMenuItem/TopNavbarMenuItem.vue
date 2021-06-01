<template>
  <div class="megadropdown-row">
    <a :href="href" 
      class="w-inline-block" tabindex="0"
      style="outline: none;"
    >
      <img :src="imageSource" alt="" class="megaicon">
    </a>
    <div class="megalinksub-2">
      <a :href="href" tabindex="0" style="outline: none;"
        class="dropdown-link-2 megalink w-dropdown-link" 
      > {{ title }}
      </a>
      <div class="text-small-4 muted-80 hidden-on-mobile">{{ subtitle }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TopNavbarMenuItem',
  props: {
    href: {
      type: String,
      required: true
    },
    imageSource: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      required: false
    }
  }
};
</script>