<!-- Implementation based on the accesible single select <div role="combobox" />  https://www.24a11y.com/2019/select-your-poison-part-2/ -->
<!-- Code samples https://github.com/microsoft/sonder-ui/tree/master/src/components/select -->
<template>
  <div>
    <label
      :id="id"
      :class="['pb-2 text-gray-500',
               {'text-xs': small},
               {'text-sm': default_}]"
    >{{ label }}</label>
    <div
      :class="[
        'relative',
        {'cursor-not-allowed': disabled}
      ]"
    >
      <div
        :id="`${id}-value`"
        ref="input"
        role="combobox"
        aria-autocomplete="none"
        aria-haspopup="listbox"
        :aria-activedescendant="activeId"
        :aria-expanded="open"
        :aria-labelledby="`${id} ${id}-value`"
        :aria-controls="`${id}-listbox`"
        :aria-required="required"
        :aria-disabled="disabled"
        :class="[
          'cursor-default bg-white border rounded border-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-transparent hover:shadow',
          {'text-sm py-2 px-2.5': small},
          {'py-3 px-4': default_},
          {'!bg-white-300 pointer-events-none': disabled},
          {'border-error': error}
        ]"
        tabindex="0"
        @blur="onSelectBlur"
        @click="updateMenuState(!open)"
        @keydown="onSelectKeydown"
      >
        <span
          :class="['mr-8',
                   {'text-sm': small},
                   {'underline': value && value !== placeholder}
          ]"
        >
          {{ value || placeholder }}
        </span>
        <chevron-down
          :class="[
            'w-4 h-4 absolute right-2',
            {'top-3': small},
            {'top-5': default_}
          ]"
        />
      </div>
      <div
        :id="`${id}-listbox`"
        ref="listbox"
        role="listbox"
        :class="[
          'max-h-96 bg-white rounded-sm text-sm py-4 overflow-y-auto absolute left-0 top-full hidden w-full z-100 shadow',
          {'!block': open }
        ]"
      >
        <div
          v-for="item in optionItems"
          :key="item.label || item"
        >
          <div
            v-if="isOptGroup(item)"
            role="group"
          >
            <dropdown-item-group
              :id="id"
              :ref="activeIndex === flattenedOptions.indexOf(item) ? 'activeOption' : null"
              :group="item"
              :active-index="activeIndex"
              :placeholder-text="placeholder"
              :flattened-options="flattenedOptions"
              @mousedown="onOptionMousedown"
              @click="($event) => onOptionClick($event, flattenedOptions.indexOf(item))"
            />
          </div>
          <div
            v-else
          >
            <dropdown-item
              :id="`${id}-${flattenedOptions.indexOf(item)}`"
              :ref="activeIndex === flattenedOptions.indexOf(item) ? 'activeOption' : null"
              :option="item"
              :index="flattenedOptions.indexOf(item)"
              :active="activeIndex === flattenedOptions.indexOf(item)"
              :placeholder="item.label === placeholder"
              @mousedown="onOptionMousedown"
              @click="($event) => onOptionClick($event, flattenedOptions.indexOf(item))"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ChevronDown } from '@/components/Icons';
import DropdownItemGroup from './DropdownItemGroup';
import DropdownItem from './DropdownItem';
import { findLastIndex } from '@/utils';

if (!Array.prototype.findLastIndex) {
  Array.prototype.findLastIndex = findLastIndex; //eslint-disable-line 
}

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
  components: { ChevronDown, DropdownItemGroup, DropdownItem },
  props: {
    modelValue: {
      type: [String, Object],
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
    placeholder: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      required: true,
      validator: function (value) {
        // The value must match be a string, an object with a label property, or an object with label and options
        return value.every((o) => {
          const isString = typeof o === 'string';
          const isOption = typeof o === 'object' && o.hasOwnProperty('label');
          const isOptGroup = typeof o === 'object' && o.hasOwnProperty('label') && o.hasOwnProperty('options');
          return isString || isOption || isOptGroup;
        });
      }
    },
    size: {
      type: String,
      default: 'default',
      validator: function (value) {
        return ['default', 'small'].includes(value);
      }
    },
    required: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    error: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue', 'input', 'change'],
  data () {
    return {
      // active option index
      activeIndex: (this.options && this.options.findIndex((o) => o.label === this.modelValue || o === this.modelValue)) || -1,
      // selected option index
      selectedIndex: (this.options && this.options.findIndex((o) => o.label === this.modelValue || o === this.modelValue)) || -1,
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
    small () {
      return this.size === 'small';
    },
    default_ () {
      return this.size === 'default';
    },
    optionItems () {
      return this.placeholder ? [{ label: this.placeholder, disabled: this.required }, ...this.options] : this.options;
    },
    flattenedOptions () {
      const flattened = [...this.options].flatMap((o) => o.options || o);
      return this.placeholder ? [{ label: this.placeholder, disabled: this.required }, ...flattened] : flattened;
    },
    selectedOptionItem () {
      return this.flattenedOptions[this.selectedIndex] || null;
    },
    value () {
      if (this.selectedOptionItem) {
        return this.selectedOptionItem.label || this.selectedOptionItem;
      }
      return '';
    },
    // minIndex that user can select (with mouse or keyboard)
    minIndex () {
      return this.flattenedOptions.findIndex((item) => !item.disabled);
    },
    // maxIndex that user can select (with mouse or keyboard)
    maxIndex () {
      return this.flattenedOptions.findLastIndex((item) => !item.disabled);
    },
    activeId () {
      return this.open ? `${this.id}-${this.activeIndex}` : '';
    }
  },
  updated () {
    if (this.open && this.isScrollable(this.$refs.listbox) && this.$refs.activeOption) {
      this.maintainScrollVisibility(this.$refs.activeOption, this.$refs.listbox);
    }
  },
  methods: {
    isOptGroup (optionItem) {
      return optionItem.hasOwnProperty('options');
    },

    /* SCROLL UTILITIES */

    // check if an element is currently scrollable
    isScrollable (element) {
      return element && element.clientHeight < element.scrollHeight;
    },
    // ensure given child element is within the parent's visible scroll area
    maintainScrollVisibility (activeElement, scrollParent) {
      // const { offsetHeight, offsetTop } = activeElement;
      const offsetHeight = activeElement.getOffsetHeight();
      const offsetTop = activeElement.getOffsetTop();
      const { offsetHeight: parentOffsetHeight, scrollTop } = scrollParent;

      const isAbove = offsetTop < scrollTop;
      const isBelow = (offsetTop + offsetHeight) > (scrollTop + parentOffsetHeight);

      if (isAbove) {
        scrollParent.scrollTo(0, offsetTop);
      } else if (isBelow) {
        scrollParent.scrollTo(0, offsetTop - parentOffsetHeight + offsetHeight);
      }
    },

    /* TYPING/STRING UTILITIES */

    // filter an array of options against an input string
    // returns an array of options that begin with the filter string, case-independent
    filterOptions (options = [], filter = '', exclude = []) {
      const filterString = filter.toLowerCase().trim();
      return options.filter((option) => {
        let matches;
        if (typeof option === 'object') {
          matches = option.label.toLowerCase().indexOf(filterString) === 0;
        } else {
          matches = option.toLowerCase().indexOf(filterString) === 0;
        }
        return matches && exclude.indexOf(option) < 0;
      });
    },
    // return select action from key press
    getActionFromKey ($event, menuOpen) {
      const { key, altKey, ctrlKey, metaKey } = $event;
      const openKeys = ['ArrowDown', 'ArrowUp', 'Enter', ' ', 'Home', 'End']; // all keys that will open the select

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
    getIndexByLetter (filter, startIndex = 0) {
      const orderedOptions = [...this.flattenedOptions.slice(startIndex), ...this.flattenedOptions.slice(0, startIndex)];
      const excludedOptions = [...this.flattenedOptions].filter((item) => item.disabled);
      const firstMatch = this.filterOptions(orderedOptions, filter, excludedOptions)[0];
      const allSameLetter = (array) => array.every((letter) => letter === array[0]);

      // first check if there is an exact match for the typed string
      if (firstMatch) {
        return this.flattenedOptions.indexOf(firstMatch);
      } else if (allSameLetter(filter.split(''))) {
        const matches = this.filterOptions(orderedOptions, filter[0], excludedOptions);
        return this.flattenedOptions.indexOf(matches[0]);
      } else {
        return -1;
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
    getUpdatedIndex (current, action) {
      switch (action) {
        case MenuActions.First:
          return this.minIndex;
        case MenuActions.Last:
          return this.maxIndex;
        case MenuActions.Previous:
          let prevIndex = current - 1;
          if (this.flattenedOptions[prevIndex] && this.flattenedOptions[prevIndex].disabled) {
            prevIndex--;
          }
          return Math.max(this.minIndex, prevIndex);
        case MenuActions.Next:
          let nextIndex = current + 1;
          if (this.flattenedOptions[nextIndex] && this.flattenedOptions[nextIndex].disabled) {
            nextIndex++;
          }
          return Math.min(this.maxIndex, nextIndex);
        default:
          return current;
      }
    },

    /* EVENTS */

    onSelectKeydown ($event) {
      const { key } = $event;

      const action = this.getActionFromKey($event, this.open);

      switch (action) {
        case MenuActions.Next:
        case MenuActions.Last:
        case MenuActions.First:
        case MenuActions.Previous:
          $event.preventDefault();
          const updatedIndex = this.getUpdatedIndex(this.activeIndex, action);
          this.onOptionChange(updatedIndex);
          return this.selectOption($event, updatedIndex);
        case MenuActions.CloseSelect:
        case MenuActions.Space:
          $event.preventDefault();
          this.selectOption($event, this.activeIndex);
          return this.updateMenuState(false);
        case MenuActions.Close:
          $event.preventDefault();
          return this.updateMenuState(false);
        case MenuActions.Type:
          this.onSelectType(key);
        case MenuActions.Open:
          $event.preventDefault();
          return this.updateMenuState(true);
      }
    },
    onSelectType (letter) {
      // open the listbox if it is closed
      this.updateMenuState(true);

      // find the index of the first matching option
      const searchString = this.getSearchString(letter);
      const searchIndex = this.getIndexByLetter(searchString, this.activeIndex + 1);

      // if a match was found, go to it
      if (searchIndex >= 0) {
        this.onOptionChange(searchIndex);
      }
    },
    onSelectBlur ($event) {
      if (this.ignoreBlur) {
        this.ignoreBlur = false;
        return;
      }

      if (this.open) {
        this.selectOption($event, this.activeIndex);
        this.updateMenuState(false, false);
      }
    },
    onOptionMousedown () {
      this.ignoreBlur = true;
    },
    onOptionChange (index) {
      this.activeIndex = index;
    },
    onOptionClick ($event, index) {
      if (this.flattenedOptions[index].disabled) {
        return;
      }

      this.onOptionChange(index);
      this.selectOption($event, index);
      this.updateMenuState(false);
    },
    updateMenuState (open, focus = true) {
      this.open = open;
      focus && this.$refs.input.focus();
    },
    selectOption ($event, index) {
      this.selectedIndex = index;
      const selected = this.flattenedOptions[index];
      this.$emit('update:modelValue', selected);
      this.$emit('input', selected);
      this.$emit('change', $event);
    }
  }
};
</script>
