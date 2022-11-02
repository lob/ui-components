import '@testing-library/jest-dom';
import { render } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import MegaButton from '../MegaButton.vue';

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
      const props = {
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
      const props = megatextProps;
      const { getByLabelText, emitted } = render(MegaButton, {
        props
      });
      const mega = getByLabelText(props.label);

      await userEvent.click(mega);
      const emittedEvent = emitted();
      expect(emittedEvent).toHaveProperty('click');
      expect(emittedEvent).toHaveProperty('input');
      expect(emittedEvent.input[0]).toEqual([props.value]);
    });

    describe('when disabled', () => {

      describe('without disabled banner', () => {

        it('has faded text and not allowed cursor', () => {
          const props = {
            ...megatextProps,
            disabled: true
          };

          const { getByText } = render(MegaButton, {
            props
          });

          const label = getByText(props.label).closest('label');
          expect(label).toHaveClass('peer-disabled:text-gray-100');
          expect(label).toHaveClass('peer-disabled:cursor-not-allowed');
        });

        it('does not display a banner box', () => {
          const props = {
            ...megatextProps,
            disabled: true
          };

          const { queryByTestId } = render(MegaButton, {
            props
          });

          const disabledBanner = queryByTestId('disabledBanner');
          expect(disabledBanner).toBeNull;
          const imageDisabledBanner = queryByTestId('imageDisabledBanner');
          expect(imageDisabledBanner).toBeNull;
        });

      });

      describe('with disabled banner', () => {

        it('has faded text and not allowed cursor', () => {
          const props = {
            ...megatextProps,
            disabled: true,
            disabledBanner: 'Bruce'
          };

          const { getByText } = render(MegaButton, {
            props
          });

          const label = getByText(props.label).closest('label');
          expect(label).toHaveClass('peer-disabled:text-gray-100');
          expect(label).toHaveClass('peer-disabled:cursor-not-allowed');
        });

        it('does not display the strikethru line', () => {
          const props = {
            ...megatextProps,
            disabled: true,
            disabledBanner: 'Bruce'
          };

          const { queryByTestId } = render(MegaButton, {
            props
          });

          const strikethruBox = queryByTestId('strikethru');
          expect(strikethruBox).toBeNull;
        });

        it('displays the standard banner box', () => {
          const props = {
            ...megatextProps,
            disabled: true,
            disabledBanner: 'Bruce'
          };

          const { queryByTestId } = render(MegaButton, {
            props
          });

          const disabledBanner = queryByTestId('disabledBanner');
          expect(disabledBanner).toHaveTextContent(props.disabledBanner);

          const imageDisabledBanner = queryByTestId('imageDisabledBanner');
          expect(imageDisabledBanner).toBeNull;
        });

      });

    });

  });

  describe('Small text', () => {

    const smallTextProps = {
      id: 'megabutton',
      modelValue: '',
      name: 'Fine print',
      label: 'Megabutton with text',
      text: 'This is some text',
      value: 'bigOlButton'
    };

    it('renders the label in smaller text', () => {
      const props = smallTextProps;

      const { getByText } = render(MegaButton, {
        props
      });

      const label = getByText(props.label);
      expect(label).toHaveClass('text-lg');
    });

    it('renders the text', () => {
      const props = smallTextProps;

      const { getByText } = render(MegaButton, {
        props
      });

      const text = getByText(props.text);
      expect(text).toBeInTheDocument();
    });

  });

  describe('Small text with image', () => {

    const textWithImageProps = {
      id: 'megabutton',
      modelValue: '',
      name: 'Fine print',
      label: 'Megabutton with text',
      text: 'This also has an image',
      imageSource: 'fake_image.egg',
      value: 'bigOlButton'
    };

    it('renders the label in smaller text', () => {
      const props = textWithImageProps;

      const { getByText } = render(MegaButton, {
        props
      });

      const label = getByText(props.label);
      expect(label).toHaveClass('text-lg');
    });

    it('renders the text', () => {
      const props = textWithImageProps;

      const { getByText } = render(MegaButton, {
        props
      });

      const text = getByText(props.text);
      expect(text).toBeInTheDocument();
    });

    it('displays the image', () => {
      const props = textWithImageProps;

      const { getByTestId } = render(MegaButton, {
        props
      });

      const imageContainer = getByTestId('imageContainer');
      expect(imageContainer).toBeInTheDocument();
    });

    describe('with disabled banner', () => {

      it('has faded text and not allowed cursor', () => {
        const props = {
          ...textWithImageProps,
          disabled: true,
          disabledBanner: 'Bruce'
        };

        const { getByText } = render(MegaButton, {
          props
        });

        const label = getByText(props.label).closest('label');
        expect(label).toHaveClass('peer-disabled:text-gray-100');
        expect(label).toHaveClass('peer-disabled:cursor-not-allowed');
      });

      it('does not display the strikethru line', () => {
        const props = {
          ...textWithImageProps,
          disabled: true,
          disabledBanner: 'Bruce'
        };

        const { queryByTestId } = render(MegaButton, {
          props
        });

        const strikethruBox = queryByTestId('strikethru');
        expect(strikethruBox).toBeNull;
      });

      it('displays the standard banner box', () => {
        const props = {
          ...textWithImageProps,
          disabled: true,
          disabledBanner: 'Bruce'
        };

        const { queryByTestId } = render(MegaButton, {
          props
        });

        const disabledBanner = queryByTestId('disabledBanner');
        expect(disabledBanner).toBeNull;

        const imageDisabledBanner = queryByTestId('imageDisabledBanner');
        expect(imageDisabledBanner).toHaveTextContent(props.disabledBanner);
      });

    });

  });

  describe('Small text with image', () => {

    const textWithImageProps = {
      id: 'megabutton',
      modelValue: '',
      name: 'Fine print',
      label: 'Megabutton with text',
      text: 'This also has an image',
      imageSource: 'fake_image.egg',
      value: 'bigOlButton'
    };

    it('renders the label in smaller text', () => {
      const props = textWithImageProps;

      const { getByText } = render(MegaButton, {
        props
      });

      const label = getByText(props.label);
      expect(label).toHaveClass('text-lg');
    });

    it('renders the text', () => {
      const props = textWithImageProps;

      const { getByText } = render(MegaButton, {
        props
      });

      const text = getByText(props.text);
      expect(text).toBeInTheDocument();
    });

    it('displays the image', () => {
      const props = textWithImageProps;

      const { getByTestId } = render(MegaButton, {
        props
      });

      const imageContainer = getByTestId('imageContainer');
      expect(imageContainer).toBeInTheDocument();
    });

    describe('with disabled banner', () => {

      it('has faded text and not allowed cursor', () => {
        const props = {
          ...textWithImageProps,
          disabled: true,
          disabledBanner: 'Bruce'
        };

        const { getByText } = render(MegaButton, {
          props
        });

        const label = getByText(props.label).closest('label');
        expect(label).toHaveClass('peer-disabled:text-gray-100');
        expect(label).toHaveClass('peer-disabled:cursor-not-allowed');
      });

      it('does not display the strikethru line', () => {
        const props = {
          ...textWithImageProps,
          disabled: true,
          disabledBanner: 'Bruce'
        };

        const { queryByTestId } = render(MegaButton, {
          props
        });

        const strikethruBox = queryByTestId('strikethru');
        expect(strikethruBox).toBeNull;
      });

      it('displays the standard banner box', () => {
        const props = {
          ...textWithImageProps,
          disabled: true,
          disabledBanner: 'Bruce'
        };

        const { queryByTestId } = render(MegaButton, {
          props
        });

        const disabledBanner = queryByTestId('disabledBanner');
        expect(disabledBanner).toBeNull;

        const imageDisabledBanner = queryByTestId('imageDisabledBanner');
        expect(imageDisabledBanner).toHaveTextContent(props.disabledBanner);
      });

    });

  });

});
