import translate from '../translate';
import en from '../en';

describe('translate mixin', () => {

  describe('when vue-i18n is not installed', () => {

    describe('with a nested string key', () => {

      it('returns the corresponding translation', () => {
        expect(translate.methods.t('datepicker.closeLabel')).toEqual(en.datepicker.closeLabel);
      });

    });

    describe('with a non-nested string key', () => {

      beforeEach(() => {
        en.testLabel = 'test;';
      });

      it('returns the corresponding translation', () => {
        expect(translate.methods.t('testLabel')).toEqual(en.testLabel);
      });

    });

    describe('with a key that does not exist in our fallbacks', () => {

      it('returns the key', () => {
        expect(translate.methods.t('nonexistent')).toEqual('nonexistent');
      });

    });

  });

});
