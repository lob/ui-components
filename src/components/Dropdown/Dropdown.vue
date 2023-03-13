<!-- Implementation based on the accessible single select <div role="combobox" />  https://www.24a11y.com/2019/select-your-poison-part-2/ -->
<!-- Code samples https://github.com/microsoft/sonder-ui/tree/master/src/components/select -->
<template>
  <div>
    <lob-label
      v-if="label"
      :id="`${id}-label`"
      :label="label"
      :label-for="id"
      :required="required"
      :sr-only-label="srOnlyLabel"
      :tooltip-content="tooltipContent"
    />
    <div :class="[ 'relative', { 'cursor-not-allowed': disabled } ]">
      <div
        :id="`${id}-value`"
        ref="input"
        role="combobox"
        aria-autocomplete="none"
        aria-haspopup="listbox"
        :aria-activedescendant="activeId"
        :aria-expanded="open"
        :aria-labelledby="`${id}-label`"
        :aria-controls="`${id}-listbox`"
        :aria-required="required"
        :aria-disabled="disabled"
        :class="[
          'flex items-center justify-between bg-white rounded-sm border border-gray-200 hover:border-gray-300',
          'focus:border-blue-500 focus-visible:outline-[1.5px] focus-visible:outline-dashed focus-visible:outline-black focus-visible:outline-offset-1',
          'type-small-500 h-11 py-2 px-4',
          { '!border-green-700 !bg-green-50': success && !error },
          { '!border-red-600 !bg-red-50': error },
          { '!bg-gray-50 pointer-events-none': disabled },
          { 'border-gray-300' : open || activeIndex > -1 && !disabled }
        ]"
        tabindex="0"
        @blur="onSelectBlur"
        @click="updateMenuState(!open)"
        @keydown="onSelectKeydown"
      >
        <div
          :class="[
            'mr-8 truncate type-small-500',
            value ? 'text-gray-800' : 'text-gray-500',
            { '!text-gray-300': disabled },
            { 'text-gray-800' : open || activeIndex > -1 },
            { 'text-gray-500' : activeIndex < 0 },
            { 'text-green-600': success },
            { 'text-red-600': error }
          ]"
        >
          {{ value || placeholder }}
        </div>
        <chevron-down
          size="s"
          :class="[
            'transition-all duration-100',
            { 'text-gray-500': !success && !error && !disabled },
            { 'text-green-600': success },
            { 'text-red-600': error },
            { 'text-gray-300': disabled },
            { '-rotate-180': open }
          ]"
          data-testid="chevron-down"
        />
      </div>
      <transition
        enter-active-class="duration-100 ease-out"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="duration-100 ease-out"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-2"
      >
        <div
          v-show="open"
          :id="`${id}-listbox`"
          ref="listbox"
          data-testid="listbox"
          role="listbox"
          :class="[
            'bg-white absolute z-20 shadow-large overflow-y-auto left-0 top-full w-full h-auto max-h-80',
            { 'custom-list-height': listHeight }
          ]"
        >
          <div
            v-for="item in optionItems"
            :key="item.id || item.label || item"
          >
            <div
              v-if="isOptGroup(item)"
              role="group"
            >
              <dropdown-item-group
                :id="id"
                :ref="(el) => setOptionRef(el, item)"
                :group="item"
                :active-index="activeIndex"
                :selected-index="selectedIndex"
                :placeholder-text="placeholder"
                :flattened-options="flattenedOptions"
                @mousedown="onOptionMousedown"
                @mouseenter="onOptionMouseover"
                @click="tryOnOptionClick"
              />
            </div>
            <div
              v-else
            >
              <dropdown-item
                :id="`${id}-${flattenedOptions.indexOf(item)}`"
                :ref="(el) => setOptionRef(el, item)"
                :option="item"
                :index="flattenedOptions.indexOf(item)"
                :active="activeIndex === flattenedOptions.indexOf(item)"
                :selected="selectedIndex === flattenedOptions.indexOf(item)"
                :placeholder="item.label === placeholder"
                @mousedown="onOptionMousedown"
                @mouseenter="onOptionMouseover"
                @click="tryOnOptionClick"
              />
            </div>
          </div>
        </div>
      </transition>
    </div>
    <ConfirmChangeModal
      v-if="confirmChangeModal"
      :visible="confirmChangeModalVisible"
      :title="confirmModalTitle"
      :subtext="confirmModalSubtext"
      :confirm-button-text="confirmModalConfirmBtnText"
      @close="confirmChangeModalVisible=false; open=false"
      @confirmClicked="changeOptionConfirmed"
    />
  </div>
</template>

<script>
import { ChevronDown } from '@/components/Icons';
import DropdownItemGroup from './DropdownItemGroup';
import DropdownItem from './DropdownItem';
import { findLastIndex, shallowEquals } from '@/utils';
import LobLabel from '../Label/Label.vue';
import ConfirmChangeModal from './ConfirmChangeModal';

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
  components: { ChevronDown, DropdownItemGroup, DropdownItem, LobLabel, ConfirmChangeModal },
  props: {
    tooltipContent: {
      type: String,
      default: null
    },
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
    srOnlyLabel: {
      type: Boolean,
      default: false
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
    },
    success: {
      type: Boolean,
      default: false
    },
    listHeight: {
      type: String,
      default: null
    },
    confirmChangeModal: {
      type: Boolean,
      default: false
    },
    confirmModalTitle: {
      type: String,
      default: ''
    },
    confirmModalSubtext: {
      type: String,
      default: ''
    },
    confirmModalConfirmBtnText: {
      type: String, default: ''
    }
  },
  emits: ['update:modelValue', 'input', 'change', 'open:list', 'close:list', 'hover:option'],
  data () {
    return {
      // active option index
      activeIndex: -1,
      // ref to the option with the activeIndex
      activeOptionRef: null,
      // selected option index
      selectedIndex: -1,
      // menu state
      open: false,
      // prevent menu closing before click completed
      ignoreBlur: false,
      // timeout after each typed character
      searchTimeout: 0,
      // current accumulated search string
      searchString: '',
      confirmChangeModalVisible: false,
      changeOptionEvent: null,
      indexBeingChangedTo: null
    };
  },
  computed: {
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
      return this.placeholder && !this.required ? -1 : this.flattenedOptions.findIndex((item) => !item.disabled);
    },
    // maxIndex that user can select (with mouse or keyboard)
    maxIndex () {
      return this.flattenedOptions.findLastIndex((item) => !item.disabled);
    },
    activeId () {
      return this.open ? `${this.id}-${this.activeIndex}` : '';
    },
    optionsAreStrings () {
      return typeof this.options[0] === 'string';
    }
  },
  watch: {
    open (val) {
      val ? this.$emit('open:list') : this.$emit('close:list');
    },
    options () {
      this.setSelectedInLifecycle();
    },
    modelValue () {
      this.setSelectedInLifecycle();
    }
  },
  created () {
    this.setSelectedInLifecycle();
  },
  updated () {
    if (this.open && this.isScrollable(this.$refs.listbox) && this.activeOptionRef) {
      this.maintainScrollVisibility(this.activeOptionRef, this.$refs.listbox);
    }
  },
  methods: {
    setOptionRef (optionEl, option) {
      if (optionEl && this.activeIndex === this.flattenedOptions.indexOf(option)) {
        this.activeOptionRef = optionEl;
      }
    },
    isOptGroup (optionItem) {
      return optionItem.hasOwnProperty('options');
    },
    setSelectedInLifecycle () {
      if (this.flattenedOptions) {
        const stringIndex = this.flattenedOptions.findIndex((o) => o === this.modelValue);
        const labelIndex = stringIndex === -1 ? this.flattenedOptions.findIndex((o) => o.label === this.modelValue) : -1;
        const objectIndex = labelIndex === -1 ? this.flattenedOptions.findIndex((o) =>  shallowEquals(o, this.modelValue)) : -1;
        const index = Math.max(stringIndex, labelIndex, objectIndex);

        this.activeIndex = index;
        this.selectedIndex = index;
      }
    },

    /* SCROLL UTILITIES */

    // check if an element is currently scrollable
    isScrollable (element) {
      return element && element.clientHeight < element.scrollHeight;
    },
    // ensure given child element is within the parent's visible scroll area
    maintainScrollVisibility (activeElement, scrollParent) {
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
        $event.stopImmediatePropagation();
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
          let prevIndex;
          if (current === 1) {
            prevIndex = current - 2;
          } else {
            prevIndex = current - 1;
          }
          if (this.flattenedOptions[prevIndex] && this.flattenedOptions[prevIndex].disabled) {
            prevIndex--;
          }
          return Math.max(this.minIndex, prevIndex);
        case MenuActions.Next:
          let nextIndex;
          if (current === -1 && this.placeholder) {
            nextIndex = current + 2;
          } else {
            nextIndex = current + 1;
          }
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
          return this.onOptionChange(updatedIndex);
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
    onSelectBlur () {
      if (this.ignoreBlur) {
        this.ignoreBlur = false;
        return;
      }

      if (this.open) {
        this.updateMenuState(false, false);
      }
    },
    onOptionMousedown () {
      this.ignoreBlur = true;
    },
    onOptionMouseover ($event, index) {
      this.onOptionChange(index);
      this.$emit('hover:option', index);
    },
    onOptionChange (index) {
      this.activeIndex = index;
    },
    onOptionClick ($event, index) {
      if (index === -1) {
        this.onOptionChange(index);
        this.selectOption($event, index);
        this.updateMenuState(false);
        return;
      }

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
      if (index === -1) {
        this.$emit('update:modelValue', this.optionsAreStrings ? '' : {});
        this.$emit('input', this.optionsAreStrings ? '' : {});
        this.$emit('change', $event);
        return;
      }
      const selected = this.flattenedOptions[index];
      this.$emit('update:modelValue', selected);
      this.$emit('input', selected);
      this.$emit('change', $event);
    },
    tryOnOptionClick ($event, index) {
      if (this.confirmChangeModal) {
        if (this.selectedIndex === -1 || this.selectedIndex === index) {
          this.onOptionClick($event, index);
        } else {
          this.confirmChangeModalVisible = true;
          this.changeOptionEvent = $event;
          this.indexBeingChangedTo = index;
        }
      } else {
        this.onOptionClick($event, index);
      }
    },
    changeOptionConfirmed () {
      const [event, index] = [this.changeOptionEvent, this.indexBeingChangedTo];
      [this.changeOptionEvent, this.indexBeingChangedTo] = [null, null];
      this.onOptionClick(event, index);
    }
  }
};
</script>

<style>
  .custom-list-height {
    max-height: v-bind(listHeight); /* stylelint-disable-line value-keyword-case */
  }
</style>
