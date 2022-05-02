<template>
  <div
    :class="['whitespace-nowrap cursor-pointer text-lg font-thin',
             'customHoverTrigger focus-visible:font-bold',
             { 'text-primary-500 focus-visible:outline-primary-500': !darkMode },
             { 'text-white focus-visible:outline-white': darkMode },
             { 'font-bold': active }]"
    tabindex="0"
    @keydown.enter="selectStep"
  >
    <div
      :class="['rounded-r-full py-1 my-6',
               'transition-all ease-linear duration-300',
               { 'bg-primary-500': !darkMode },
               { 'bg-white': darkMode },
               { 'text-white': active && !darkMode },
               { 'text-primary-500': active && darkMode },
               { 'w-20 customHoverW': !active },
               { 'w-full delay-100': active }]"
    >
      <span
        :class="['ml-14 inline-block w-4',
                 { 'text-white': !darkMode },
                 { 'text-primary-500': darkMode }]"
      > {{ index }}
      </span>
      <span
        :class="['ml-7 mr-12',
                 { 'text-white': active && !darkMode },
                 { 'text-primary-500': active && darkMode }]"
      >
        {{ step.pathName }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StepperVerticalItem',
  props: {
    step: { type: Object, required: true },
    index: { type: Number, required: true },
    active: { type: Boolean, default: false },
    darkMode: { type: Boolean, default: false }
  },
  methods: {
    selectStep (kbdEvent) {
      kbdEvent.path[0].click();
    }
  }
};
</script>

<style scoped>
.customHoverTrigger:hover .customHoverW {
  width: 5.5rem; /* 88px */
  font-weight: bold;
}
</style>
