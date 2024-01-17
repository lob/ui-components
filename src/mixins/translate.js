import en from './en';

/** nest-i18n mixin
 *
 * Use this mixin for consistent handling of string translation in our Vue Components.
 *
 * It ensures that if the component is used in an app
 */

export default {
  methods: {
    /**
     * This is a wrapper for the normal vue-i18n $t function that allows our components to support i18n
     * without requiring it (without it they should fallback to English)
     * @param {String} str the key to translate
     * @returns {String}
     */
    t(str) {
      if ('$t' in this) {
        const translation = this.$t(str);
        if (translation && translation !== str) {
          return translation;
        }
      }

      const strParts = str.split('.');
      const localEnglishTranslation = strParts.reduce(
        (accumulator, currentValue) => {
          accumulator = accumulator[currentValue];
          return accumulator;
        },
        en
      );

      if (localEnglishTranslation) {
        return localEnglishTranslation;
      }

      return str;
    }
  }
};
