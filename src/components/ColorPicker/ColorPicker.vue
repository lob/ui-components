<template>
  <div ref="container" class="uic-color-picker">
    <InputMask
      v-if="showHexInput"
      :id="accessibleInputId"
      :model-value="hexValue"
      :tabindex="tabindex"
      :disabled="disabled"
      placeholder="#ffffff"
      class="sr-only"
      mask="#******"
      @blur="onHiddenInputBlur"
      @keydown="onHiddenInputKeydown"
      @focus="onHiddenInputFocus"
    />
    <input
      v-if="!inline"
      ref="input"
      type="text"
      class="uic-color-picker__input"
      readonly="readonly"
      tabindex="-1"
      data-testid="color-picker-input"
      :disabled="disabled"
      @click="onInputClick"
      @keydown="onInputKeydown"
    />
    <Portal :append-to="appendTo" :disabled="inline">
      <transition
        name="p-connected-overlay"
        @enter="onOverlayEnter"
        @leave="onOverlayLeave"
        @after-leave="onOverlayAfterLeave"
      >
        <div
          v-if="inline ? true : overlayVisible"
          :ref="pickerRef"
          :class="[
            'uic-color-picker__panel',
            panelClass,
            showHexInput ? 'uic-color-picker__panel--hex-input' : '',
            inline ? 'uic-color-picker__panel--inline' : ''
          ]"
          data-testid="color-picker-panel"
          @click="onOverlayClick"
        >
          <div class="uic-color-picker__content">
            <div
              :ref="colorSelectorRef"
              class="uic-color-picker__selector"
              @mousedown="onColorMousedown($event)"
              @touchstart="onColorDragStart($event)"
              @touchmove="onDrag($event)"
              @touchend="onDragEnd()"
            >
              <div class="uic-color-picker__color">
                <div
                  :ref="colorHandleRef"
                  class="uic-color-picker__color-handle"
                ></div>
              </div>
            </div>
            <div
              :ref="hueViewRef"
              class="uic-color-picker__hue"
              @mousedown="onHueMousedown($event)"
              @touchstart="onHueDragStart($event)"
              @touchmove="onDrag($event)"
              @touchend="onDragEnd()"
            >
              <div
                :ref="hueHandleRef"
                class="uic-color-picker__hue-handle"
              ></div>
            </div>
          </div>
          <InputMask
            v-if="showHexInput"
            :model-value="hexValue"
            mask="#******"
            placeholder="#ffffff"
            class="uic-color-picker__hex-input"
            data-testid="color-picker-hex-input"
            @blur="onHexInputBlur"
            @keydown="onHexInputKeydown"
            @paste="onHexInputPaste"
          />
        </div>
      </transition>
    </Portal>
  </div>
</template>

<script>
import OverlayEventBus from 'primevue/overlayeventbus';
import Portal from 'primevue/portal';
import {
  ConnectedOverlayScrollHandler,
  DomHandler,
  ZIndexUtils
} from 'primevue/utils';
import BaseColorPicker from './BaseColorPicker.vue';
import InputMask from 'primevue/inputmask';

export default {
  name: 'ColorPicker',
  components: {
    InputMask,
    Portal
  },
  extends: BaseColorPicker,
  inheritAttrs: false,
  props: {
    showHexInput: {
      type: Boolean,
      default: true
    },
    accessibleInputId: {
      type: String,
      default: null
    }
  },
  emits: ['update:modelValue', 'change', 'show', 'hide'],
  data() {
    return {
      overlayVisible: false,
      hexValue: null
    };
  },
  hsbValue: null,
  outsideClickListener: null,
  documentMouseMoveListener: null,
  documentMouseUpListener: null,
  scrollHandler: null,
  resizeListener: null,
  hueDragging: null,
  colorDragging: null,
  selfUpdate: null,
  picker: null,
  colorSelector: null,
  colorHandle: null,
  hueView: null,
  hueHandle: null,
  watch: {
    modelValue: {
      immediate: true,
      handler(newValue) {
        this.hsbValue = this.toHSB(newValue);

        if (this.selfUpdate) this.selfUpdate = false;
        else this.updateUI();
      }
    }
  },
  /* c8 ignore start */
  beforeUnmount() {
    this.unbindOutsideClickListener();
    this.unbindDragListeners();
    this.unbindResizeListener();

    if (this.scrollHandler) {
      this.scrollHandler.destroy();
      this.scrollHandler = null;
    }

    if (this.picker && this.autoZIndex) {
      ZIndexUtils.clear(this.picker);
    }

    this.clearRefs();
  },
  mounted() {
    this.updateUI();
  },
  /* c8 ignore stop */
  methods: {
    pickColor(event) {
      const rect = this.colorSelector.getBoundingClientRect();
      const top =
        rect.top +
        (window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop ||
          0);
      const left = rect.left + document.body.scrollLeft;
      const saturation = Math.floor(
        (100 *
          Math.max(
            0,
            Math.min(150, (event.pageX || event.changedTouches[0].pageX) - left)
          )) /
          150
      );
      const brightness = Math.floor(
        (100 *
          (150 -
            Math.max(
              0,
              Math.min(
                150,
                (event.pageY || event.changedTouches[0].pageY) - top
              )
            ))) /
          150
      );

      this.hsbValue = this.validateHSB({
        h: this.hsbValue.h,
        s: saturation,
        b: brightness
      });

      this.selfUpdate = true;
      this.updateColorHandle();
      this.updateInput();
      this.updateHexValue();
      this.updateModel(event);
    },
    pickHue(event) {
      const top =
        this.hueView.getBoundingClientRect().top +
        (window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop ||
          0);

      this.hsbValue = this.validateHSB({
        h: Math.floor(
          (360 *
            (150 -
              Math.max(
                0,
                Math.min(
                  150,
                  (event.pageY || event.changedTouches[0].pageY) - top
                )
              ))) /
            150
        ),
        s: 100,
        b: 100
      });

      this.selfUpdate = true;
      this.updateColorSelector();
      this.updateHue();
      this.updateModel(event);
      this.updateInput();
      this.updateHexValue();
    },
    updateModel(event) {
      let value = this.modelValue;

      switch (this.format) {
        case 'hex':
          value = this.HSBtoHEX(this.hsbValue);
          break;

        case 'rgb':
          value = this.HSBtoRGB(this.hsbValue);
          break;

        case 'hsb':
          value = this.hsbValue;
          break;

        default:
          //NoOp
          break;
      }

      this.$emit('update:modelValue', value);
      this.$emit('change', { event, value });
    },
    updateColorSelector() {
      if (this.colorSelector) {
        const hsbValue = this.validateHSB({
          h: this.hsbValue.h,
          s: 100,
          b: 100
        });

        this.colorSelector.style.backgroundColor =
          '#' + this.HSBtoHEX(hsbValue);
      }
    },
    updateColorHandle() {
      if (this.colorHandle) {
        this.colorHandle.style.left =
          Math.floor((150 * this.hsbValue.s) / 100) + 'px';
        this.colorHandle.style.top =
          Math.floor((150 * (100 - this.hsbValue.b)) / 100) + 'px';
      }
    },
    updateHue() {
      if (this.hueHandle) {
        this.hueHandle.style.top =
          Math.floor(150 - (150 * this.hsbValue.h) / 360) + 'px';
      }
    },
    updateInput() {
      if (this.$refs.input) {
        this.$refs.input.style.backgroundColor =
          '#' + this.HSBtoHEX(this.hsbValue);
      }
    },
    updateHexValue() {
      this.hexValue = this.HSBtoHEX(this.hsbValue);
    },
    updateUI() {
      this.updateHue();
      this.updateColorHandle();
      this.updateInput();
      this.updateColorSelector();
      this.updateHexValue();
    },
    validateHSB(hsb) {
      return {
        h: Math.min(360, Math.max(0, hsb.h)),
        s: Math.min(100, Math.max(0, hsb.s)),
        b: Math.min(100, Math.max(0, hsb.b))
      };
    },
    validateRGB(rgb) {
      return {
        r: Math.min(255, Math.max(0, rgb.r)),
        g: Math.min(255, Math.max(0, rgb.g)),
        b: Math.min(255, Math.max(0, rgb.b))
      };
    },
    validateHEX(hex) {
      var len = 6 - hex.length;

      if (len > 0) {
        var o = [];

        for (var i = 0; i < len; i++) {
          o.push('0');
        }

        o.push(hex);
        hex = o.join('');
      }

      return hex;
    },
    HEXtoRGB(hex) {
      const hexValue = parseInt(
        hex.indexOf('#') > -1 ? hex.substring(1) : hex,
        16
      );

      return {
        r: hexValue >> 16,
        g: (hexValue & 0x00ff00) >> 8,
        b: hexValue & 0x0000ff
      };
    },
    HEXtoHSB(hex) {
      return this.RGBtoHSB(this.HEXtoRGB(hex));
    },
    RGBtoHSB(rgb) {
      var hsb = {
        h: 0,
        s: 0,
        b: 0
      };
      var min = Math.min(rgb.r, rgb.g, rgb.b);
      var max = Math.max(rgb.r, rgb.g, rgb.b);
      var delta = max - min;

      hsb.b = max;
      hsb.s = max !== 0 ? (255 * delta) / max : 0;

      if (hsb.s !== 0) {
        if (rgb.r === max) {
          hsb.h = (rgb.g - rgb.b) / delta;
        } else if (rgb.g === max) {
          hsb.h = 2 + (rgb.b - rgb.r) / delta;
        } else {
          hsb.h = 4 + (rgb.r - rgb.g) / delta;
        }
      } else {
        hsb.h = -1;
      }

      hsb.h *= 60;

      if (hsb.h < 0) {
        hsb.h += 360;
      }

      hsb.s *= 100 / 255;
      hsb.b *= 100 / 255;

      return hsb;
    },
    HSBtoRGB(hsb) {
      var rgb = {
        r: null,
        g: null,
        b: null
      };
      var h = Math.round(hsb.h);
      var s = Math.round((hsb.s * 255) / 100);
      var v = Math.round((hsb.b * 255) / 100);

      if (s === 0) {
        rgb = {
          r: v,
          g: v,
          b: v
        };
      } else {
        var t1 = v;
        var t2 = ((255 - s) * v) / 255;
        var t3 = ((t1 - t2) * (h % 60)) / 60;

        if (h === 360) h = 0;

        if (h < 60) {
          rgb.r = t1;
          rgb.b = t2;
          rgb.g = t2 + t3;
        } else if (h < 120) {
          rgb.g = t1;
          rgb.b = t2;
          rgb.r = t1 - t3;
        } else if (h < 180) {
          rgb.g = t1;
          rgb.r = t2;
          rgb.b = t2 + t3;
        } else if (h < 240) {
          rgb.b = t1;
          rgb.r = t2;
          rgb.g = t1 - t3;
        } else if (h < 300) {
          rgb.b = t1;
          rgb.g = t2;
          rgb.r = t2 + t3;
        } else if (h < 360) {
          rgb.r = t1;
          rgb.g = t2;
          rgb.b = t1 - t3;
        } else {
          rgb.r = 0;
          rgb.g = 0;
          rgb.b = 0;
        }
      }

      return {
        r: Math.round(rgb.r),
        g: Math.round(rgb.g),
        b: Math.round(rgb.b)
      };
    },
    RGBtoHEX(rgb) {
      var hex = [rgb.r.toString(16), rgb.g.toString(16), rgb.b.toString(16)];

      for (var key in hex) {
        if (hex[key].length === 1) {
          hex[key] = '0' + hex[key];
        }
      }

      return hex.join('');
    },
    HSBtoHEX(hsb) {
      return this.RGBtoHEX(this.HSBtoRGB(hsb));
    },
    toHSB(value) {
      let hsb;

      if (value) {
        switch (this.format) {
          case 'hex':
            hsb = this.HEXtoHSB(value);
            break;

          case 'rgb':
            hsb = this.RGBtoHSB(value);
            break;

          case 'hsb':
            hsb = value;
            break;

          default:
            break;
        }
      } else {
        hsb = this.HEXtoHSB(this.defaultColor);
      }

      return hsb;
    },
    /* c8 ignore start */
    onOverlayEnter(el) {
      this.updateUI();
      this.alignOverlay();
      this.bindOutsideClickListener();
      this.bindScrollListener();
      this.bindResizeListener();

      if (this.autoZIndex) {
        ZIndexUtils.set(
          'overlay',
          el,
          this.baseZIndex,
          this.$primevue.config.zIndex.overlay
        );
      }

      this.$emit('show');
    },
    onOverlayLeave() {
      this.unbindOutsideClickListener();
      this.unbindScrollListener();
      this.unbindResizeListener();
      this.clearRefs();
      this.$emit('hide');
    },
    onOverlayAfterLeave(el) {
      if (this.autoZIndex) {
        ZIndexUtils.clear(el);
      }
    },
    alignOverlay() {
      if (this.appendTo === 'self')
        DomHandler.relativePosition(this.picker, this.$refs.input);
      else DomHandler.absolutePosition(this.picker, this.$refs.input);
    },
    /* c8 ignore stop */
    onInputClick() {
      if (this.disabled) {
        return;
      }

      this.overlayVisible = !this.overlayVisible;
    },
    onInputKeydown(event) {
      switch (event.code) {
        case 'Space':
          this.overlayVisible = !this.overlayVisible;
          event.preventDefault();
          break;

        case 'Escape':
        case 'Tab':
          this.overlayVisible = false;
          break;

        default:
          //NoOp
          break;
      }
    },
    onColorMousedown(event) {
      if (this.disabled) {
        return;
      }

      this.bindDragListeners();
      this.onColorDragStart(event);
    },
    onColorDragStart(event) {
      if (this.disabled) {
        return;
      }

      this.colorDragging = true;
      this.pickColor(event);
      this.$el.setAttribute('p-colorpicker-dragging', 'true');
      !this.isUnstyled &&
        DomHandler.addClass(this.$el, 'p-colorpicker-dragging');
      event.preventDefault();
    },
    onDrag(event) {
      if (this.colorDragging) {
        this.pickColor(event);
        event.preventDefault();
      }

      if (this.hueDragging) {
        this.pickHue(event);
        event.preventDefault();
      }
    },
    onDragEnd() {
      this.colorDragging = false;
      this.hueDragging = false;
      this.$el.setAttribute('p-colorpicker-dragging', 'false');
      !this.isUnstyled &&
        DomHandler.removeClass(this.$el, 'p-colorpicker-dragging');
      this.unbindDragListeners();
    },
    onHueMousedown(event) {
      if (this.disabled) {
        return;
      }

      this.bindDragListeners();
      this.onHueDragStart(event);
    },
    onHueDragStart(event) {
      if (this.disabled) {
        return;
      }

      this.hueDragging = true;
      this.pickHue(event);
      !this.isUnstyled &&
        DomHandler.addClass(this.$el, 'p-colorpicker-dragging');
    },
    isInputClicked(event) {
      return this.$refs.input && this.$refs.input.isSameNode(event.target);
    },
    /* c8 ignore start */
    bindDragListeners() {
      this.bindDocumentMouseMoveListener();
      this.bindDocumentMouseUpListener();
    },
    unbindDragListeners() {
      this.unbindDocumentMouseMoveListener();
      this.unbindDocumentMouseUpListener();
    },
    bindOutsideClickListener() {
      if (!this.outsideClickListener) {
        this.outsideClickListener = (event) => {
          if (
            this.overlayVisible &&
            this.picker &&
            !this.picker.contains(event.target) &&
            !this.isInputClicked(event)
          ) {
            this.overlayVisible = false;
          }
        };

        document.addEventListener('click', this.outsideClickListener);
      }
    },
    unbindOutsideClickListener() {
      if (this.outsideClickListener) {
        document.removeEventListener('click', this.outsideClickListener);
        this.outsideClickListener = null;
      }
    },
    bindScrollListener() {
      if (!this.scrollHandler) {
        this.scrollHandler = new ConnectedOverlayScrollHandler(
          this.$refs.container,
          () => {
            if (this.overlayVisible) {
              this.overlayVisible = false;
            }
          }
        );
      }

      this.scrollHandler.bindScrollListener();
    },
    unbindScrollListener() {
      if (this.scrollHandler) {
        this.scrollHandler.unbindScrollListener();
      }
    },
    bindResizeListener() {
      if (!this.resizeListener) {
        this.resizeListener = () => {
          if (this.overlayVisible && !DomHandler.isTouchDevice()) {
            this.overlayVisible = false;
          }
        };

        window.addEventListener('resize', this.resizeListener);
      }
    },
    unbindResizeListener() {
      if (this.resizeListener) {
        window.removeEventListener('resize', this.resizeListener);
        this.resizeListener = null;
      }
    },
    bindDocumentMouseMoveListener() {
      if (!this.documentMouseMoveListener) {
        this.documentMouseMoveListener = this.onDrag.bind(this);
        document.addEventListener('mousemove', this.documentMouseMoveListener);
      }
    },
    unbindDocumentMouseMoveListener() {
      if (this.documentMouseMoveListener) {
        document.removeEventListener(
          'mousemove',
          this.documentMouseMoveListener
        );
        this.documentMouseMoveListener = null;
      }
    },
    bindDocumentMouseUpListener() {
      if (!this.documentMouseUpListener) {
        this.documentMouseUpListener = this.onDragEnd.bind(this);
        document.addEventListener('mouseup', this.documentMouseUpListener);
      }
    },
    unbindDocumentMouseUpListener() {
      if (this.documentMouseUpListener) {
        document.removeEventListener('mouseup', this.documentMouseUpListener);
        this.documentMouseUpListener = null;
      }
    },
    pickerRef(el) {
      this.picker = el;
    },
    colorSelectorRef(el) {
      this.colorSelector = el;
    },
    colorHandleRef(el) {
      this.colorHandle = el;
    },
    hueViewRef(el) {
      this.hueView = el;
    },
    hueHandleRef(el) {
      this.hueHandle = el;
    },
    clearRefs() {
      this.picker = null;
      this.colorSelector = null;
      this.colorHandle = null;
      this.hueView = null;
      this.hueHandle = null;
    },
    onOverlayClick(event) {
      OverlayEventBus.emit('overlay-click', {
        originalEvent: event,
        target: this.$el
      });
    },
    /* c8 ignore stop */
    onHexInputBlur(event) {
      const hex = event.target.value;
      const hsb = this.HEXtoHSB(hex);

      this.hsbValue = hsb;
      this.updateUI();
      this.updateModel(event);
    },
    onHexInputKeydown($event) {
      if (
        $event.key === 'Tab' ||
        $event.key === 'Meta' ||
        $event.key === 'Control' ||
        ($event.key === 'v' && ($event.metaKey || $event.ctrlKey))
      ) {
        return;
      }
      if (!/[a-f0-9]/i.test($event.key)) {
        $event.preventDefault();
      }
    },
    onHiddenInputFocus() {
      if (this.inline) {
        this.$refs.picker?.classList.add('uic-color-picker__panel--focused');
      } else {
        this.$refs.input?.classList.add('uic-color-picker__input--focused');
      }
    },
    onHiddenInputBlur($event) {
      if (this.inline) {
        this.$refs.picker?.classList.remove('uic-color-picker__panel--focused');
      } else {
        this.$refs.input?.classList.remove('uic-color-picker__input--focused');
      }

      this.onHexInputBlur($event);
    },
    onHiddenInputKeydown($event) {
      if (!/[a-f0-9]/i.test($event.key)) {
        $event.preventDefault();
      }

      this.onInputKeydown($event);
    },
    onHexInputPaste($event) {
      const hex = this.validateHEX($event.clipboardData.getData('text'));
      const hsb = this.HEXtoHSB(hex);

      this.hsbValue = hsb;
      this.updateUI();
      this.updateModel($event);
    }
  }
};
</script>

<style lang="scss">
.uic-color-picker {
  $root: &;

  &__input {
    @apply w-[32px] h-[32px] rounded-lg border-line-grey border-2 transition-colors duration-200 cursor-pointer;

    &--focused {
      @apply border-blue-500;
    }
  }

  &__panel {
    @apply absolute w-[193px] h-[166px] shadow-transparent bg-gray-800 border-black rounded-lg;

    &--hex-input {
      @apply h-[210px];
    }

    &--inline {
      @apply relative;
    }

    &--focused {
      @apply border-blue-500;
    }
  }

  &__content {
    @apply relative;
  }

  &__selector {
    @apply absolute h-[150px] w-[150px] left-[8px] top-[8px];
  }

  &__color {
    @apply h-[150px] w-[150px];
    background: linear-gradient(to top, #000 0%, rgba(0, 0, 0, 0) 100%),
      linear-gradient(to right, #fff 0%, rgba(255, 255, 255, 0) 100%);
  }

  &__color-handle {
    @apply absolute w-[10px] h-[10px] -mt-[5px] -ml-[5px] border-white border cursor-pointer rounded-[100%];
  }

  &__hue {
    @apply absolute h-[148px] w-[17px] top-[8px] left-[167px];
    background: linear-gradient(
      0deg,
      red 0,
      #ff0 17%,
      #0f0 33%,
      #0ff 50%,
      #00f 67%,
      #f0f 83%,
      red
    );
  }

  &__hue-handle {
    @apply absolute w-[21px] -ml-[2px] -mt-[8px] h-[15px] border-2 border-white-100 rounded text-opacity-90 cursor-pointer;
  }

  &__hex-input {
    @apply absolute w-[175px] h-[30px] left-[9px] top-[170px] bg-gray-800 border border-gray-400 p-1 text-gray-200 rounded-lg uppercase;
  }
}
</style>
