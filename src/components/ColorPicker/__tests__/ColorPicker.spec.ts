import '@testing-library/jest-dom';
import {
  RenderOptions,
  fireEvent,
  createEvent,
  render,
  waitFor,
  screen
} from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import ColorPicker from '../ColorPicker.vue';
import PrimeVue from 'primevue/config';
import { ColorPickerProps } from '@/components/ColorPicker/ColorPicker';

const initialProps: ColorPickerProps = {
  accessibleInputId: 'color-picker-input'
};

const renderComponent = (options: RenderOptions = {}) =>
  render(ColorPicker, {
    global: {
      plugins: [PrimeVue]
    },
    ...options
  });

describe('ColorPicker', () => {
  it('should render correctly', async () => {
    const { baseElement, getByTestId } = renderComponent({
      props: initialProps
    });

    const colorPickerInput = getByTestId('color-picker-input');
    expect(colorPickerInput).toBeInTheDocument();
    expect(colorPickerInput).toBeVisible();
    expect(baseElement).toMatchSnapshot();
  });

  it('should render the color picker when the input is clicked', async () => {
    const { getByTestId } = renderComponent({
      props: initialProps
    });

    const colorPickerInput = getByTestId('color-picker-input');
    expect(colorPickerInput).toBeInTheDocument();

    await userEvent.click(colorPickerInput);

    await waitFor(() => {
      const colorPickerPanel = screen.getByTestId('color-picker-panel'); // uses screen because the panel is transported ot the body
      expect(colorPickerPanel).toBeInTheDocument();
      expect(colorPickerPanel).toBeVisible();
      expect(colorPickerPanel).toMatchSnapshot();
    });
  });

  it('should render the color picker hex input within the color picker panel', async () => {
    const { getByTestId } = renderComponent({
      props: initialProps
    });

    const colorPickerInput = getByTestId('color-picker-input');
    expect(colorPickerInput).toBeInTheDocument();

    await userEvent.click(colorPickerInput);

    await waitFor(() => {
      const colorPickerHexInput = screen.getByTestId('color-picker-hex-input');
      expect(colorPickerHexInput).toBeInTheDocument();
      expect(colorPickerHexInput).toBeVisible();
    });
  });

  it('should change the selected color on blur of the hex input', async () => {
    const { getByTestId } = renderComponent({
      props: initialProps
    });

    const colorPickerInput = getByTestId('color-picker-input');
    expect(colorPickerInput).toBeInTheDocument();

    await userEvent.click(colorPickerInput);

    let colorPickerHexInput: HTMLInputElement | null = null;

    await waitFor(() => {
      colorPickerHexInput = screen.getByTestId(
        'color-picker-hex-input'
      ) as HTMLInputElement;
      expect(colorPickerHexInput).toBeInTheDocument();
      expect(colorPickerHexInput).toBeVisible();
    });

    await fireEvent.update(colorPickerHexInput!, 'ff00ff');
    await fireEvent.blur(colorPickerHexInput!);

    await waitFor(() => {
      expect(colorPickerInput).toHaveStyle(
        'background-color: rgb(255, 0, 255)'
      );
    });
  });

  it('should allow pasting a hex value in the hex input', async () => {
    const { getByTestId, findByTestId } = renderComponent({
      props: initialProps
    });

    const colorPickerInput = getByTestId('color-picker-input');
    expect(colorPickerInput).toBeInTheDocument();

    await userEvent.click(colorPickerInput);

    const colorPickerHexInput = await findByTestId('color-picker-hex-input');

    expect(colorPickerHexInput).toBeVisible();

    await fireEvent.paste(colorPickerHexInput!, {
      clipboardData: { getData: () => 'ff00ff' }
    });

    await waitFor(() => {
      expect(colorPickerInput).toHaveStyle(
        'background-color: rgb(255, 0, 255)'
      );
    });
  });

  it('should accept hex values in the accessible input', async () => {
    const { container, getByTestId } = renderComponent({
      props: initialProps
    });

    const accessibleInput = container.querySelector(
      `#${initialProps.accessibleInputId}`
    );
    const colorPickerInput = getByTestId('color-picker-input');
    expect(accessibleInput).toBeInTheDocument();
    expect(colorPickerInput).toBeInTheDocument();

    await fireEvent.blur(accessibleInput as HTMLInputElement, {
      target: { value: 'ff00ff' }
    });

    await waitFor(() => {
      expect(colorPickerInput).toHaveStyle(
        'background-color: rgb(255, 0, 255)'
      );
    });
  });

  it('should show visual focus on the color input when the hidden input is focused', async () => {
    const { container, getByTestId } = renderComponent({
      props: initialProps
    });

    const accessibleInput = container.querySelector(
      `#${initialProps.accessibleInputId}`
    );
    const colorPickerInput = getByTestId('color-picker-input');
    expect(accessibleInput).toBeInTheDocument();
    expect(colorPickerInput).toBeInTheDocument();

    await fireEvent.focus(accessibleInput as HTMLInputElement);

    await waitFor(() => {
      expect(colorPickerInput).toHaveClass('uic-color-picker__input--focused');
    });

    await fireEvent.blur(accessibleInput as HTMLInputElement);

    await waitFor(() => {
      expect(colorPickerInput).not.toHaveClass(
        'uic-color-picker__input--focused'
      );
    });
  });

  it('should not allow invalid hex values in the accessible input', async () => {
    const defaultColor = '#000000';
    const { container, getByTestId } = renderComponent({
      props: { ...initialProps, defaultColor }
    });

    const accessibleInput: HTMLInputElement | null = container.querySelector(
      `#${initialProps.accessibleInputId}`
    );
    const colorPickerInput = getByTestId('color-picker-input');
    expect(accessibleInput).toBeInTheDocument();
    expect(colorPickerInput).toBeInTheDocument();

    await fireEvent.blur(accessibleInput as HTMLInputElement, {
      target: { value: 'ff00f' }
    });

    await waitFor(() => {
      expect(colorPickerInput).toHaveStyle({
        backgroundColor: 'rgb(0, 0, 0)'
      });
    });

    await fireEvent.keyDown(accessibleInput as HTMLInputElement, 'q');

    expect(accessibleInput!.value).not.toContain('q');
  });

  it('should respond to mouse events', async () => {
    const { getByTestId } = renderComponent({
      props: initialProps
    });

    const colorPickerInput = getByTestId('color-picker-input');
    expect(colorPickerInput).toBeInTheDocument();

    await userEvent.click(colorPickerInput);

    let colorPickerPanel;

    await waitFor(() => {
      colorPickerPanel = screen.getByTestId('color-picker-panel'); // uses screen because the panel is transported ot the body
      expect(colorPickerPanel).toBeInTheDocument();
      expect(colorPickerPanel).toBeVisible();
    });

    const colorSelector = colorPickerPanel!.querySelector(
      '.uic-color-picker__selector'
    );

    const event = { pageX: 100, pageY: 120, preventDefault: () => {} };
    const event2 = { pageX: 5, pageY: 20, preventDefault: () => {} };

    // starts with the default color
    expect(colorPickerInput).toHaveStyle({
      backgroundColor: 'rgb(255, 0, 0)'
    });

    const mousedownEvent = Object.assign(
      createEvent('mousedown', colorSelector, event),
      event
    );
    await fireEvent(colorSelector, mousedownEvent);

    const mousemoveEvent = Object.assign(
      createEvent('mousemove', colorSelector, event),
      event2
    );

    await fireEvent(colorSelector, mousemoveEvent);

    await waitFor(() => {
      expect(colorPickerInput.style.backgroundColor).not.toEqual(
        'rgb(255, 0, 0)'
      );
    });
  });
});
