// CatalogModal.test.tsx
import { CatalogModal } from '.';
import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { MantineProvider } from '@mantine/core';
import type { Launch } from '@/types';

function renderWithMantine(ui: React.ReactNode) {
  return render(<MantineProvider>{ui}</MantineProvider>);
}

describe('CatalogModal', () => {
  const launch: Launch = {
    mission_name: 'FalconSat',
    details: 'Test mission details',
    rocket: { rocket_name: 'Falcon 1' },
    links: { mission_patch_small: 'https://example.com/patch.png' },
    flight_number: 0,
  };

  let modalRoot: HTMLElement;

  beforeEach(() => {
    modalRoot = document.createElement('div');
    modalRoot.setAttribute('id', 'modal-root');
    document.body.appendChild(modalRoot);
  });

  it('рендерит данные миссии', () => {
    renderWithMantine(<CatalogModal launch={launch} onClose={() => {}} />);
    expect(screen.getByText(/Falcon 1/)).toBeInTheDocument();
  });

  it('вызывает onClose при клике на кнопку', () => {
    const onClose = vi.fn();
    renderWithMantine(<CatalogModal launch={launch} onClose={onClose} />);
    fireEvent.click(screen.getByRole('button', { name: /close modal/i }));
    expect(onClose).toHaveBeenCalled();
  });

  it('вызывает onClose при нажатии Escape', () => {
    const onClose = vi.fn();
    renderWithMantine(<CatalogModal launch={launch} onClose={onClose} />);
    fireEvent.keyDown(window, { key: 'Escape', code: 'Escape' });
    expect(onClose).toHaveBeenCalled();
  });
});
