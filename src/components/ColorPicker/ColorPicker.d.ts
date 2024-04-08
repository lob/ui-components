import {
  ClassComponent,
  GlobalComponentConstructor,
  HintedString
} from 'primevue/ts-helpers';

/**
 *
 * ColorPicker groups a collection of contents in tabs.
 *
 * @module colorpicker
 *
 */

/**
 * Defines valid properties in ColorPicker component.
 */
export interface ColorPickerProps {
  /**
   * Value of the component.
   */
  modelValue?: any;
  /**
   * Initial color to display when value is not defined.
   * @defaultValue ff0000
   */
  defaultColor?: any;
  /**
   * Whether to display as an overlay or not.
   * @defaultValue false
   */
  inline?: boolean | undefined;
  /**
   * Format to use in value binding, supported formats are 'hex', 'rgb' and 'hsb'.
   * @defaultValue hex
   */
  format?: 'hex' | 'rgb' | 'hsb' | undefined;
  /**
   * When present, it specifies that the component should be disabled.
   * @defaultValue false
   */
  disabled?: boolean | undefined;
  /**
   * Index of the element in tabbing order.
   */
  tabindex?: string | undefined;
  /**
   * Whether to automatically manage layering.
   * @defaultValue true
   */
  autoZIndex?: boolean | undefined;
  /**
   * Base zIndex value to use in layering.
   * @defaultValue 0
   */
  baseZIndex?: number | undefined;
  /**
   * Style class of the overlay panel.
   */
  panelClass?: any;
  /**
   * A valid query selector or an HTMLElement to specify where the overlay gets attached. Special keywords are 'body' for document body and 'self' for the element itself.
   * @defaultValue body
   */
  appendTo?: HintedString<'body' | 'self'> | undefined | HTMLElement;
  /**
   * Indicates whether or not to show the hex color input within the panel.
   *
   * @defaultValue true
   */
  showHexInput?: boolean | undefined;
  /**
   * Id for the screen reader hex color input field.
   */
  accessibleInputId?: string | undefined;
}

/**
 * Defines current inline state in ColorPicker component.
 */
export interface ColorPickerState {
  /**
   * Current overlay visible state as a boolean.
   * @defaultValue false
   */
  overlayVisible: boolean;
}

/**
 * Custom passthrough(pt) option method.
 */
export interface ColorPickerPassThroughMethodOptions {
  /**
   * Defines instance.
   */
  instance: any;
  /**
   * Defines valid properties.
   */
  props: ColorPickerProps;
  /**
   * Defines current inline state.
   */
  state: ColorPickerState;
  /**
   * Defines valid attributes.
   */
  attrs: any;
  /**
   * Defines parent options.
   */
  parent: any;
  /**
   * Defines passthrough(pt) options in global config.
   */
  global: object | undefined;
}

/**
 * Custom change event.
 * @see {@link ColorPickerEmits.change}
 */
export interface ColorPickerChangeEvent {
  /**
   * Browser event
   */
  event: Event;
  /**
   * Selected color value.
   */
  value: any;
}

/**
 * Custom passthrough attributes for each DOM elements
 */
export interface ColorPickerPassThroughAttributes {
  [key: string]: any;
}

export interface ColorPickerSlots {}

/**
 * Defines valid emits in ColorPicker component.
 */
export interface ColorPickerEmits {
  /**
   * Emitted when the value changes.
   * @param {*} value - New value.
   */
  'update:modelValue'(value: any): void;
  /**
   * Callback to invoke when a color is selected.
   * @param {ColorPickerChangeEvent} event - Custom add event.
   */
  change(event: ColorPickerChangeEvent): void;
  /**
   * Callback to invoke when input is cleared by the user.
   */
  show(): void;
  /**
   * Callback to invoke when input is cleared by the user.
   */
  hide(): void;
}

declare module './ColorPicker.vue' {
  declare class ColorPicker extends ClassComponent<
    ColorPickerProps,
    ColorPickerSlots,
    ColorPickerEmits
  > {}

  export default ColorPicker;

  declare module 'vue' {
    export interface GlobalComponents {
      ColorPicker: GlobalComponentConstructor<ColorPicker>;
    }
  }
}
