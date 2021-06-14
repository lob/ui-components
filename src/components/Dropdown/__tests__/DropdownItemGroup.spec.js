import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/vue';
import DropdownItemGroup from '../DropdownItemGroup.vue';

const initialProps = {
  id: 'id',
  group: {
    label: 'group',
    options: [
      'opt 1',
      'opt 2'
    ]
  },
  activeIndex: 0,
  placeholderText: '',
  flattenedOptions: [
    'opt 1',
    'opt 2',
    'opt 3'
  ]
};

const renderComponent = (options) => render(DropdownItemGroup, { ...options });

describe('DropdownItemGroup', () => {

  it('renders an option for each item in the group', () => {
    const props = initialProps;
    const { queryAllByRole, queryByText } = renderComponent({ props });

    const options = queryAllByRole('option');
    expect(options.length).toEqual(props.group.options.length);

    const opt1 = queryByText(props.group.options[0]);
    expect(opt1).toBeInTheDocument();

    const opt2 = queryByText(props.group.options[1]);
    expect(opt2).toBeInTheDocument();
  });

  it('emits a mousedown event', async () => {
    const props = initialProps;
    const { queryAllByRole, emitted } = renderComponent({ props });

    const option = queryAllByRole('option')[0];

    await fireEvent.mouseDown(option);
    const emittedEvent = emitted();
    expect(emittedEvent).toHaveProperty('mousedown');
  });

  it('emits a click event', async () => {
    const props = initialProps;
    const { queryAllByRole, emitted } = renderComponent({ props });

    const option = queryAllByRole('option')[0];

    await fireEvent.click(option);
    const emittedEvent = emitted();
    expect(emittedEvent).toHaveProperty('click');
  });
});
