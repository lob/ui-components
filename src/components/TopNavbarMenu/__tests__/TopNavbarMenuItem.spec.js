import '@testing-library/jest-dom';
import { render } from '@testing-library/vue';
import TopNavbarMenuItem from '../TopNavbarMenuItem.vue';

const initialProps = {
  to: '/settings',
  imageSource: 'image.svg'
};

const renderComponent = (options, configure = null) => render(TopNavbarMenuItem, { ...options, routes: [] }, configure);

describe('TopNavbarMenuItem', () => {

  it('renders correctly when an internal link', () => {
    const props = initialProps;
    const { queryByRole } = renderComponent({ props });

    const link = queryByRole('link');
    expect(link).toBeInTheDocument();

    const img = queryByRole('img');
    expect(img).toBeInTheDocument();
  });

  it('renders correctly when an external link', () => {
    const props = {
      ...initialProps,
      to: 'https://google.com'
    };
    const { queryByRole } = renderComponent({ props });

    const link = queryByRole('link');
    expect(link).toBeInTheDocument();

    const img = queryByRole('img');
    expect(img).toBeInTheDocument();
  });

  it('renders the subtitle when a subtitle is passed in', () => {
    const props = {
      ...initialProps,
      subtitle: 'subtitle'
    };
    const { queryByText } = renderComponent({ props });

    const subtitle = queryByText(props.subtitle);
    expect(subtitle).toBeInTheDocument();
  });

});
