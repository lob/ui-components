<!-- Implementation based on the accesible single select <div role="combobox" />  https://www.24a11y.com/2019/select-your-poison-part-2/ -->
<!-- Code samples https://github.com/microsoft/sonder-ui/tree/master/src/components/select -->
<template>
  <label
    :id="id"
    class="text-xs pb-2 text-gray-500"
  >{{ label }}</label>
  <div class="relative">
    <div
      :id="`${id}-value`"
      ref="input"
      role="combobox"
      :aria-activedescendant="activeId"
      aria-autocomplete="none"
      aria-haspopup="listbox"
      :aria-expanded="open"
      :aria-labelledby="`${id} ${id}-value`"
      :aria-controls="`${id}-listbox`"
      class="combo-input cursor-default bg-white py-1.5 px-2.5 border rounded border-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-transparent"
      tabindex="0"
      @blur="onComboBlur"
      @click="updateMenuState(true)"
      @keydown="onComboKeyDown"
    >
      <span class="mr-8 text-sm">
        {{ value }}
      </span>
      <chevron-down
        class="w-4 h-4 absolute right-0 top-3 right-2"
      />
    </div>
    <div
      :id="`${id}-listbox`"
      ref="listbox"
      :class="[
        'lob-dropdown-options cursor-default max-h-96 bg-white rounded-sm text-sm py-4 overflow-y-auto absolute left-0 top-full hidden w-full z-100',
        {'!block': open}]"
      role="listbox"
    >
      <div
        v-for="(option, i) in options"
        :id="`${id}-${i}`"
        :key="option"
        :ref="activeIndex === i ? 'activeOption' : null"
        :class="['combo-option py-1 px-8 truncate hover:bg-turquoise-100', {'bg-turquoise-100': activeIndex === i}]"
        :aria-selected="activeIndex === i"
        role="option"
        @mousedown="onOptionMouseDown"
        @click="($event) => onOptionClick($event, i)"
      >
        {{ option }}
      </div>
    </div>
  </div>
</template>

<script>
import { ChevronDown } from '../Icons';

const Keys = {
  Backspace: 'Backspace',
  Clear: 'Clear',
  Down: 'ArrowDown',
  End: 'End',
  Enter: 'Enter',
  Escape: 'Escape',
  Home: 'Home',
  Left: 'ArrowLeft',
  PageDown: 'PageDown',
  PageUp: 'PageUp',
  Right: 'ArrowRight',
  Space: ' ',
  Tab: 'Tab',
  Up: 'ArrowUp'
};

const MenuActions = {
  Close: 'Close',
  CloseSelect: 'CloseSelect',
  First: 'First',
  Last: 'Last',
  Next: 'Next',
  Open: 'Open',
  PageDown: 'PageDown',
  PageUp: 'PageUp',
  Previous: 'Previous',
  Select: 'Select',
  Space: 'Space',
  Type: 'Type'
};

export default {
  name: 'Dropdown',
  components: { ChevronDown },
  props: {
    modelValue: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    options: {
      type: Array,
      required: true
    }
  },
  emits: ['update:modelValue', 'input', 'change'],
  data () {
    return {
      value: this.modelValue || '',
      // active option index
      activeIndex: this.options.indexOf(this.modelValue) || -1,
      // selected option index
      selectedIndex: this.options.indexOf(this.modelValue) || -1,
      // menu state
      open: false,
      // prevent menu closing before click completed
      ignoreBlur: false,
      // timeout after each typed character
      searchTimeout: 0,
      // current accumulated search string
      searchString: ''
    };
  },
  computed: {
    activeId () {
      return this.open ? `${this.id}-${this.activeIndex}` : '';
    }
  },
  updated () {
    if (this.open && this.isScrollable(this.listbox)) {
      this.maintainScrollVisibility(this.$refs.activeOption, this.$refs.listbox);
    }
  },
  methods: {
    // check if an element is currently scrollable
    isScrollable (element) {
      return element && element.clientHeight < element.scrollHeight;
    },
    // ensure given child element is within the parent's visible scroll area
    maintainScrollVisibility (activeElement, scrollParent) {
      const { offsetHeight, offsetTop } = activeElement;
      const { offsetHeight: parentOffsetHeight, scrollTop } = scrollParent;

      const isAbove = offsetTop < scrollTop;
      const isBelow = (offsetTop + offsetHeight) > (scrollTop + parentOffsetHeight);

      if (isAbove) {
        scrollParent.scrollTo(0, offsetTop);
      } else if (isBelow) {
        scrollParent.scrollTo(0, offsetTop - parentOffsetHeight + offsetHeight);
      }
    },
    // filter an array of options against an input string
    // returns an array of options that begin with the filter string, case-independent
    filterOptions (options = [], filter = '', exclude = []) {
      const filterString = filter.toLowerCase().trim();
      return options.filter((option) => {
        const matches = option.toLowerCase().indexOf(filterString) === 0;
        return matches && exclude.indexOf(option) < 0;
      });
    },
    // return combobox action from key press
    getActionFromKey ($event, menuOpen) {
      const { key, altKey, ctrlKey, metaKey } = $event;
      const openKeys = ['ArrowDown', 'ArrowUp', 'Enter', ' ', 'Home', 'End']; // all keys that will open the combo

      // handle opening when closed
      if (!menuOpen && openKeys.includes(key)) {
        return MenuActions.Open;
      }

      // handle typing characters when open or closed
      if (key === Keys.Backspace || key === Keys.Clear || (key.length === 1 && key !== ' ' && !altKey && !ctrlKey && !metaKey)) {
        return MenuActions.Type;
      }

      // handle keys when open
      if (menuOpen) {
        if (key === Keys.Down && (!altKey || key === Keys.Right)) {
          return MenuActions.Next;
        } else if (key === Keys.Up && altKey) {
          return MenuActions.CloseSelect;
        } else if (key === Keys.Up || key === Keys.Left) {
          return MenuActions.Previous;
        } else if (key === Keys.Home) {
          return MenuActions.First;
        } else if (key === Keys.End) {
          return MenuActions.Last;
        } else if (key === Keys.PageUp) {
          return MenuActions.PageUp;
        } else if (key === Keys.PageDown) {
          return MenuActions.PageDown;
        } else if (key === Keys.Escape) {
          return MenuActions.Close;
        } else if (key === Keys.Enter) {
          return MenuActions.CloseSelect;
        } else if (key === Keys.Space) {
          return MenuActions.Space;
        }
      }
    },
    // return the index of an option from an array of options, based on a search string
    // if the filter is multiple iterations of the same letter (e.g "aaa"), then cycle through first-letter matches
    getIndexByLetter (options, filter, startIndex = 0) {
      const orderedOptions = [...options.slice(startIndex), ...options.slice(0, startIndex)];
      const firstMatch = this.filterOptions(orderedOptions, filter)[0];
      const allSameLetter = (array) => array.every((letter) => letter === array[0]);

      // first check if there is an exact match for the typed string
      if (firstMatch) {
        return options.indexOf(firstMatch);
      } else if (allSameLetter(filter.split(''))) {
        const matches = this.filterOptions(orderedOptions, filter[0]);
        return options.indexOf(matches[0]);
      } else {
        return -1;
      }
    },
    getUpdatedIndex (current, max, action) {
      switch (action) {
        case MenuActions.First:
          return 0;
        case MenuActions.Last:
          return max;
        case MenuActions.Previous:
          return Math.max(0, current - 1);
        case MenuActions.Next:
          return Math.min(max, current + 1);
        default:
          return current;
      }
    },
    getSearchString (char) {
    // reset typing timeout and start new timeout
    // this allows us to make multiple-letter matches, like a native select
      if (typeof this.searchTimeout === 'number') {
        window.clearTimeout(this.searchTimeout);
      }

      this.searchTimeout = window.setTimeout(() => {
        this.searchString = '';
      }, 500);

      // add most recent letter to saved search string
      this.searchString += char;
      return this.searchString;
    },
    onComboKeyDown ($event) {
      const { key } = $event;
      const max = this.options.length - 1;

      const action = this.getActionFromKey($event, this.open);

      switch (action) {
        case MenuActions.Next:
        case MenuActions.Last:
        case MenuActions.First:
        case MenuActions.Previous:
          $event.preventDefault();
          return this.onOptionChange(this.getUpdatedIndex(this.activeIndex, max, action));
        case MenuActions.CloseSelect:
        case MenuActions.Space:
          $event.preventDefault();
          this.selectOption($event, this.activeIndex);
        case MenuActions.Close:
          $event.preventDefault();
          return this.updateMenuState(false);
        case MenuActions.Type:
        // this.activeIndex = Math.max(0, getIndexByLetter(this.options, key));
          this.onComboType(key);
        case MenuActions.Open:
          $event.preventDefault();
          return this.updateMenuState(true);
      }
    },
    onComboType (letter) {
      // open the listbox if it is closed
      this.updateMenuState(true);

      // find the index of the first matching option
      const searchString = this.getSearchString(letter);
      const searchIndex = this.getIndexByLetter(this.options, searchString, this.activeIndex + 1);

      // if a match was found, go to it
      if (searchIndex >= 0) {
        this.onOptionChange(searchIndex);
      }
    },
    onComboBlur ($event) {
      if (this.ignoreBlur) {
        this.ignoreBlur = false;
        return;
      }

      if (this.open) {
        this.selectOption($event, this.activeIndex);
        this.updateMenuState(false, false);
      }
    },
    onOptionChange (index) {
      this.activeIndex = index;
    },
    onOptionClick ($event, index) {
      this.onOptionChange(index);
      this.selectOption($event, index);
      this.updateMenuState(false);
    },
    onOptionMouseDown () {
      this.ignoreBlur = true;
    },
    selectOption ($event, index) {
      const selected = this.options[index];
      this.value = selected;
      this.selectedIndex = index;
      this.$emit('update:modelValue', selected);
      this.$emit('input', selected);
      this.$emit('change', $event);
    },
    updateMenuState (open, callFocus = true) {
      this.open = open;
      callFocus && this.$refs.input.focus();
    }
  }
};
</script>

<style scoped lang="scss">
.lob-dropdown-options {
  box-shadow: 0 5px 14px rgba(44, 67, 81, 0.13), 0 0 4px rgba(44, 67, 81, 0.02);
}
</style>
