import '@testing-library/jest-dom';
import { render } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import Accordion from '../Accordion';

const initialProps = {
  title: 'Accordion Title',
  defaultOpen: false
};

const renderComponent = (options = {}) => render(Accordion, { ...options });
describe('Accordion', () => {
  it('renders correctly', () => {
    const props = initialProps;
    const { queryByText } = renderComponent({ props });

    const title = queryByText('Accordion Title');
    expect(title).toBeInTheDocument();
  });

  it("doesn't display accordion content by default", () => {
    const props = initialProps;
    const { queryByRole } = renderComponent({ props });

    const slotTag = queryByRole('region');
    expect(slotTag).not.toBeInTheDocument();
  });

  it('displays content when clicked', async () => {
    const props = initialProps;
    const { queryByRole } = renderComponent({ props });
    const title = queryByRole('button');
    await userEvent.click(title);

    const slotTag = queryByRole('region');
    expect(slotTag).toBeInTheDocument();
  });

  it('hides content when clicked again', async () => {
    const props = initialProps;
    const { queryByRole } = renderComponent({ props });

    const title = queryByRole('button');
    await userEvent.click(title);

    const slotTag = queryByRole('region');
    expect(slotTag).toBeInTheDocument();

    await userEvent.click(title);

    expect(slotTag).not.toBeInTheDocument();
  });

  describe('When props are passed in', () => {
    it('renders the accordion as open', () => {
      const openProps = {
        title: 'Accordion Title',
        defaultOpen: true
      };
      const props = openProps;
      const { queryByRole } = renderComponent({ props });
      const slotTag = queryByRole('region');
      expect(slotTag).toBeInTheDocument();
    });
  });
});
