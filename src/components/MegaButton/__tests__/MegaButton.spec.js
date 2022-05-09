import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import MegaButton from '../MegaButton.vue';

let label;
let props;

describe('Megabutton', () => {

  describe('Megatext format', () => {

    const megatextProps = {
      id: 'megabutton',
      modelValue: '',
      name: 'Chonky Boi',
      label: 'Megabutton',
      value: 'bigOlButton',
      disabled: false
    };

    it('disables the input when disabled prop is true', () => {
      props = {
        ...megatextProps,
        disabled: true
      };

      const { getByLabelText } = render(MegaButton, {
        props
      });

      const mega = getByLabelText(props.label);
      expect(mega).toBeDisabled();
    });

    it('checks the input when the value matches the modelValue', () => {
      const props = {
        ...megatextProps,
        modelValue: megatextProps.value
      };
      const { getByLabelText } = render(MegaButton, {
        props
      });

      const mega = getByLabelText(props.label);
      expect(mega).toBeChecked();
    });

    it('fires the input and click events when the input is clicked', async () => {
      props = megatextProps;
      const { getByLabelText, emitted } = render(MegaButton, {
        props
      });
      const mega = getByLabelText(props.label);

      await fireEvent.click(mega);
      const emittedEvent = emitted();
      expect(emittedEvent).toHaveProperty('click');
      expect(emittedEvent).toHaveProperty('input');
      expect(emittedEvent.input[0]).toEqual([props.value]);
    });

    describe('when disabled', () => {

      describe('without disabled banner', () => {

        beforeAll(() => {

          props = {
            ...megatextProps,
            disabled: true
          };

          const { getByText } = render(MegaButton, {
            props
          });

          label = getByText(props.label).closest('label');

        });

        it('has faded text and not allowed cursor', () => {
          expect(label).toHaveClass('peer-disabled:text-gray-100');
          expect(label).toHaveClass('peer-disabled:cursor-not-allowed');
        });

        it('displays the strikethru line', () => {
          expect(label).toHaveClass('strikethru-line');
        });

      });

      describe('with disabled banner', () => {

        beforeAll(() => {

          props = {
            ...megatextProps,
            disabled: true,
            disabledBanner: 'Bruce'
          };

          const { getByText } = render(MegaButton, {
            props
          });

          label = getByText(props.label).closest('label');

        });

        it('has faded text and not allowed cursor', () => {
          expect(label).toHaveClass('peer-disabled:text-gray-100');
          expect(label).toHaveClass('peer-disabled:cursor-not-allowed');
        });

        it('does not display the strikethru line', () => {
          expect(label).not.toHaveClass('strikethru-line');
        });

      });

    });

  });

});
