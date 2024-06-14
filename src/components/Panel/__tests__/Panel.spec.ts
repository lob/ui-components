import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { render, waitFor } from '@testing-library/vue';

import Panel from '../Panel.vue';

describe('Panel', () => {
  it('renders', () => {
    const { getByTestId, getByText } = render(Panel, {
      slots: {
        header: {
          template: 'Test header slot'
        },
        default: {
          template: 'Test default slot'
        }
      }
    });

    expect(getByTestId('uic-panel')).toBeVisible();
    expect(getByText('Test header slot')).toBeVisible();
    expect(getByText('Test default slot')).toBeVisible();
  });

  it('emits update:collapsed', async () => {
    const { findByTestId, emitted } = render(Panel, {
      props: {
        collapsible: true
      }
    });

    userEvent.click(await findByTestId('uic-panel-toggle-icon'));
    await waitFor(() => {
      expect(emitted()).toHaveProperty('update:collapsed');
    });
  });
});
