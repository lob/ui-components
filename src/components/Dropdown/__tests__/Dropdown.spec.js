import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/vue';
import Dropdown from '../Dropdown.vue';
import { translate } from '@/mixins';

const mixins = [translate];

const modelValue = '';
const initialProps = {
  id: 'test',
  modelValue,
  label: 'Test dropdown',
  options: ['a', 'b', 'c']
};

const renderComponent = (options) => render(Dropdown, { global: { mixins }, ...options });

describe('Dropdown', () => {

  it('renders correctly',  () => {
    const props = initialProps;
    const { getByRole, getByTestId } = renderComponent({ props });

    const select = getByRole('combobox');
    expect(select).toBeInTheDocument();

    const optionContainer = getByTestId('listbox');
    expect(optionContainer).toBeInTheDocument().not.toBeVisible();
  });

  it('requires the select when required prop is true', () => {
    const props = {
      ...initialProps,
      required: true
    };

    const { getByRole } = renderComponent({ props });
    const select = getByRole('combobox');

    expect(select).toBeRequired();
  });

  it('disables the textarea when disabled prop is true', () => {
    const props = {
      ...initialProps,
      disabled: true
    };

    const { getByRole } = renderComponent({ props });
    const select = getByRole('combobox');

    expect(select).toHaveAttribute('aria-disabled', 'true');
  });

  it('adds an error class to the textarea when error prop is true', () => {
    const props = {
      ...initialProps,
      error: true
    };

    const { getByRole } = renderComponent({ props });
    const select = getByRole('combobox');

    expect(select).toHaveClass('!border-red-600 !bg-red-50');
  });

  it('adds success class to the textarea when success prop is true', () => {
    const props = {
      ...initialProps,
      success: true
    };

    const { getByRole } = renderComponent({ props });
    const select = getByRole('combobox');

    expect(select).toHaveClass('!border-green-700');
  });

  describe('without a placeholder', () => {

    it('does not include a placeholder in the options', () => {
      const props = initialProps;
      const { queryAllByTestId } = renderComponent({ props });

      const options = queryAllByTestId('option');
      expect(options).toHaveLength(props.options.length);
    });

  });

  describe('with a placeholder', () => {

    it('includes a placeholder in the options', () => {
      const props = { placeholder: 'hello', ...initialProps };
      const { queryAllByTestId } = renderComponent({ props });

      const options = queryAllByTestId('option');
      expect(options).toHaveLength(props.options.length + 1);
    });

  });

  describe('when listHeight is not provided', () => {

    it('sets the height of the listbox to a default', () => {
      const props = { ...initialProps };
      delete props.listHeight;

      const { getByTestId } = renderComponent({ props });

      const listbox = getByTestId('listbox');
      expect(listbox).toHaveClass('max-h-80');
      expect(listbox).not.toHaveClass('custom-list-height');
    });

  });

  describe('when listHeight is provided', () => {

    it('sets a custom height class on the listbox', () => {
      const props = { ...initialProps, listHeight: '15rem' };

      const { getByTestId } = renderComponent({ props });

      const listbox = getByTestId('listbox');
      expect(listbox).toHaveClass('custom-list-height');
    });

  });

  describe('when an option is disabled', () => {

    let props;
    beforeEach(() => {
      props = { ...initialProps, options: [{ label: 'a' }, { label: 'b', disabled: true }, { label: 'c' }] };
    });

    it('renders that option disabled', () => {
      const { queryAllByTestId } = renderComponent({ props });

      const options = queryAllByTestId('option');
      expect(options[1]).toHaveAttribute('aria-disabled', 'true');
    });

    it('will not allow keyboard navigating to a disabled option', async () => {
      const { queryByRole, queryAllByTestId } = renderComponent({ props });

      const select = queryByRole('combobox');

      // open select
      await fireEvent.keyDown(select, { key: 'ArrowDown', code: 'ArrowDown' });
      // key down to option a
      await fireEvent.keyDown(select, { key: 'ArrowDown', code: 'ArrowDown' });
      // key down to option c (skipping b)
      await fireEvent.keyDown(select, { key: 'ArrowDown', code: 'ArrowDown' });
      const options = queryAllByTestId('option');
      expect(options[2]).toHaveAttribute('aria-selected', 'true');
    });

    it('will not allow clicking a disabled option', async () => {
      const { queryByRole, queryAllByTestId } = renderComponent({ props });

      const select = queryByRole('combobox');
      const options = queryAllByTestId('option');

      // open select
      await fireEvent.keyDown(select, { key: 'Enter', code: 'Enter' });
      // choose disabled option
      await fireEvent.click(options[1]);
      expect(options[1]).not.toHaveAttribute('aria-selected', 'true');
    });

  });

  describe('when collapsed', () => {

    it('displays the chevron icon pointing down', () => {
      const { queryByTestId } = renderComponent({ props: initialProps });

      const chevronDown = queryByTestId('chevron-down');
      expect(chevronDown).toBeInTheDocument().not.toHaveClass('-rotate-180');
    });

    ['ArrowDown', 'ArrowUp', 'Enter', ' ', 'Home', 'End'].forEach(async (key) => {

      it(`typing ${key}, it opens the listbox`, async () => {
        const props = initialProps;
        const { queryByRole, getByTestId } = renderComponent({ props });

        const select = queryByRole('combobox');
        let optionContainer = getByTestId('listbox');
        expect(optionContainer).not.toBeVisible();

        await fireEvent.keyDown(select, { key, code: key });

        optionContainer = getByTestId('listbox');
        expect(optionContainer).toBeVisible();
      });

    });

    it('typing a non-open key, it does not open the listbox', async () => {
      const props = initialProps;
      const { queryByRole, getByTestId } = renderComponent({ props });

      const select = queryByRole('combobox');
      let optionContainer = getByTestId('listbox');

      expect(optionContainer).not.toBeVisible();

      await fireEvent.keyDown(select, { key: 'Control', code: 'ControlLeft' });

      optionContainer = getByTestId('listbox');
      expect(optionContainer).not.toBeVisible();
    });

    it('typing a character, it opens the listbox and focuses on the first match', async () => {
      const props = initialProps;
      const { queryByRole, getAllByTestId, getByTestId } = renderComponent({ props });

      const select = queryByRole('combobox');
      let optionContainer = getByTestId('listbox');

      expect(optionContainer).not.toBeVisible();

      await fireEvent.keyDown(select, { key: 'b', code: 'KeyB' });

      optionContainer = getByTestId('listbox');
      expect(optionContainer).toBeVisible();

      const options = getAllByTestId('option');
      expect(options[1]).toHaveAttribute('aria-selected', 'true');
    });

    it('clicking, it opens the listbox', async () => {
      const props = initialProps;
      const { queryByRole, getByTestId } = renderComponent({ props });

      const select = queryByRole('combobox');
      let optionContainer = getByTestId('listbox');

      expect(optionContainer).not.toBeVisible();

      await fireEvent.click(select);
      optionContainer = getByTestId('listbox');
      expect(optionContainer).toBeVisible();
    });

  });

  describe('when opened', () => {

    let props;
    let component;
    let select;

    beforeEach(async () => {
      props = { ...initialProps, options: [...initialProps.options, 'aaaa', 'aaab', 'aaac'] };
      component = renderComponent({ props });
      const { queryByRole } = component;
      select = queryByRole('combobox');

      // open select
      await fireEvent.keyDown(select, { key: 'Enter', code: 'Enter' });
    });

    it('displays the chevron icon pointing down', () => {
      const { queryByTestId } = component;

      const chevronUp = queryByTestId('chevron-down');
      expect(chevronUp).toBeInTheDocument().toHaveClass('-rotate-180');
    });

    ['Enter', ' '].forEach(async (key) => {
      it(`typing ${key}, it selects the current option and closes the listbox`, async () => {
        const { emitted } = component;
        // key down to option a
        await fireEvent.keyDown(select, { key: 'ArrowDown', code: 'ArrowDown' });
        // key down to select and close
        await fireEvent.keyDown(select, { key, code: key });
        const emittedEvent = emitted();
        expect(emittedEvent).toHaveProperty('input');
        expect(emittedEvent.input[0][0]).toEqual(props.options[0]);
      });
    });

    describe('typing ArrowUp', () => {

      it('will move to previous non-disabled item', async () => {
        const { queryAllByTestId } = component;
        // key down to option a
        await fireEvent.keyDown(select, { key: 'ArrowDown', code: 'ArrowDown' });
        // key down to option b
        await fireEvent.keyDown(select, { key: 'ArrowDown', code: 'ArrowDown' });
        // key up to option a
        await fireEvent.keyDown(select, { key: 'ArrowUp', code: 'ArrowUp' });

        const options = queryAllByTestId('option');
        expect(options[0]).toHaveAttribute('aria-selected', 'true');
      });

      it('will not move if already on the first option', async () => {
        const { queryAllByTestId } = component;
        // key up to "previous" option
        await fireEvent.keyDown(select, { key: 'ArrowUp', code: 'ArrowUp' });

        const options = queryAllByTestId('option');
        expect(options[0]).toHaveAttribute('aria-selected', 'true');
      });

      it('does not change the selection', async () => {
        const { emitted } = component;
        // key down to option a
        await fireEvent.keyDown(select, { key: 'ArrowDown', code: 'ArrowDown' });
        // key down to option b
        await fireEvent.keyDown(select, { key: 'ArrowDown', code: 'ArrowDown' });
        // key up to option a
        await fireEvent.keyDown(select, { key: 'ArrowUp', code: 'ArrowUp' });

        const emittedEvent = emitted();
        expect(emittedEvent).not.toHaveProperty('input');
      });

    });

    describe('typing ArrowDown', () => {

      it('will move to next non-disabled item', async () => {
        const { queryAllByTestId } = component;
        // key down to option a
        await fireEvent.keyDown(select, { key: 'ArrowDown', code: 'ArrowDown' });
        // key down to option b
        await fireEvent.keyDown(select, { key: 'ArrowDown', code: 'ArrowDown' });

        const options = queryAllByTestId('option');
        expect(options[1]).toHaveAttribute('aria-selected', 'true');
      });

      it('will not move if already on the last option', async () => {
        const { queryAllByTestId } = component;
        for (let i = 0; i < props.options.length; i++) {
          await fireEvent.keyDown(select, { key: 'ArrowDown', code: 'ArrowDown' });
        }
        // key down to "next" option
        await fireEvent.keyDown(select, { key: 'ArrowDown', code: 'ArrowDown' });

        const options = queryAllByTestId('option');
        expect(options[options.length - 1]).toHaveAttribute('aria-selected', 'true');
      });

      it('does not change the selection', async () => {
        const { emitted } = component;
        // key down to option a
        await fireEvent.keyDown(select, { key: 'ArrowDown', code: 'ArrowDown' });

        const emittedEvent = emitted();
        expect(emittedEvent).not.toHaveProperty('input');
      });

    });

    it('typing Home, it moves to the first non-disabled item', async () => {
      const { queryAllByTestId } = component;
      // key down to first option
      await fireEvent.keyDown(select, { key: 'Home', code: 'Home' });

      const options = queryAllByTestId('option');
      expect(options[0]).toHaveAttribute('aria-selected', 'true');
    });

    it('typing End, it moves to the last non-disabled item', async () => {
      const { queryAllByTestId } = component;
      // key down to first option
      await fireEvent.keyDown(select, { key: 'End', code: 'End' });

      const options = queryAllByTestId('option');
      expect(options[options.length - 1]).toHaveAttribute('aria-selected', 'true');
    });

    it('typing a character, it focuses on the first match', async () => {
      const { queryAllByTestId } = component;

      await fireEvent.keyDown(select, { key: 'b', code: 'KeyB' });

      const options = queryAllByTestId('option');
      expect(options[1]).toHaveAttribute('aria-selected', 'true');
    });

    it('typing a string of characters, it selects the first option that matches the full string', async () => {
      const { queryAllByTestId } = component;

      // search and go to 'aaab'
      await fireEvent.keyDown(select, { key: 'a', code: 'KeyA' });
      await fireEvent.keyDown(select, { key: 'a', code: 'KeyA' });
      await fireEvent.keyDown(select, { key: 'a', code: 'KeyA' });
      await fireEvent.keyDown(select, { key: 'c', code: 'KeyC' });

      const options = queryAllByTestId('option');
      expect(options[5]).toHaveAttribute('aria-selected', 'true');
    });

    it('typing the same character multiple times, it cycles through the matches', async () => {
      const { queryAllByTestId } = component;

      // search and go to 'a'
      await fireEvent.keyDown(select, { key: 'a', code: 'KeyA' });
      // search and go to 'aaaa'
      await fireEvent.keyDown(select, { key: 'a', code: 'KeyA' });
      // search and go to 'aaab'
      await fireEvent.keyDown(select, { key: 'a', code: 'KeyA' });

      const options = queryAllByTestId('option');
      expect(options[4]).toHaveAttribute('aria-selected', 'true');
    });

    it('on losing focus, it selects the current option and closes the listbox', async () => {
      const { emitted } = component;
      // key down to option a
      await fireEvent.keyDown(select, { key: 'ArrowDown', code: 'ArrowDown' });
      // tabbing fires a FocusEvent (blur == focus away)
      await fireEvent.blur(select);
      const emittedEvent = emitted();
      expect(emittedEvent).not.toHaveProperty('input');
      expect(emittedEvent).not.toHaveProperty('change');
    });

    it('clicking the select, it closes the listbox and retains focus', async () => {
      const { queryByRole, getByTestId } = component;

      const select = queryByRole('combobox');
      let optionContainer = getByTestId('listbox');

      expect(optionContainer).toBeVisible();

      await fireEvent.click(select);

      optionContainer = getByTestId('listbox');
      expect(optionContainer).not.toBeVisible();
      expect(select).toHaveFocus();
    });

    it('clicking an option, it selects the current option and closes the listbox', async () => {
      const { queryAllByTestId, emitted } = component;
      const options = queryAllByTestId('option');
      // click 2nd option
      await fireEvent.click(options[1]);
      const emittedEvent = emitted();
      expect(emittedEvent).toHaveProperty('input');
      expect(emittedEvent.input[0][0]).toEqual(props.options[1]);
    });

  });

  describe('when the confirm change modal option is set', () => {

    const props = { ...initialProps, confirmChangeModal: true, modelValue: 'c' };

    it('opens the confirm change modal when an option is selected', async () => {
      const { getByRole, getByText, getAllByRole } = renderComponent({ props });
      const select = getByRole('combobox');
      await fireEvent.click(select);
      const options = getAllByRole('option');
      await fireEvent.click(options[0]);
      const modalText = getByText(/Are you sure you want to change this option?/);
      expect(modalText).toBeVisible();
    });

  });

});
