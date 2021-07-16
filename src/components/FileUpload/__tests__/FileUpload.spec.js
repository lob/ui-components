import '@testing-library/jest-dom';
import { render } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import FileUpload from '../FileUpload.vue';

const initialProps = {
  label: 'Choose File',
  id: 'file-upload',
  accept: '.pdf'
};

const renderComponent = (options, configure = null) => render(FileUpload, { ...options }, configure);

describe('FileUpload', () => {

  it('renders correctly', () => {
    const props = initialProps;
    const { getByRole } = renderComponent({ props });

    const button = getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('focuses the input when the button is clicked', async () => {
    const props = initialProps;
    const { getByRole, getByLabelText } = renderComponent({ props });

    const button = getByRole('button');
    const input = getByLabelText(/choose file/i);

    await userEvent.click(button);
    expect(input).toHaveFocus();
  });

  describe('when a file is selected', () => {

    let props;
    let component;
    let input;
    let file;

    beforeEach(async () => {
      props = initialProps;
      component = renderComponent({ props });
      const { getByLabelText } = component;

      file = new File(['hello'], 'hello.pdf', { type: 'application/pdf' });

      input = getByLabelText(/choose file/i);
      await userEvent.upload(input, file);
    });

    it('emits a fileUpload event', () => {
      const { emitted } = component;

      expect(input.files[0]).toStrictEqual(file);
      expect(input.files.item(0)).toStrictEqual(file);
      expect(input.files).toHaveLength(1);

      const emittedEvent = emitted();
      expect(emittedEvent).toHaveProperty('fileUpload');
    });

    it('changes the label to the filename', () => {
      const { queryByLabelText } = component;

      const input = queryByLabelText('hello.pdf');
      expect(input).toBeInTheDocument();
    });

  });

});
