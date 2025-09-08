import { Catalog } from '.';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { MantineProvider } from '@mantine/core';
import type { Launch } from '@/types';

function renderWithMantine(ui: React.ReactNode) {
  return render(<MantineProvider>{ui}</MantineProvider>);
}

describe('Catalog', () => {
  const mockLaunches: Launch[] = [
    {
      flight_number: 1,
      mission_name: 'FalconSat',
      details: 'Test mission',
      rocket: { rocket_name: 'Falcon 1' },
      links: { mission_patch_small: 'https://example.com/patch.png' },
    },
    {
      flight_number: 2,
      mission_name: 'DemoSat',
      details: 'Another mission',
      rocket: { rocket_name: 'Falcon 1' },
      links: { mission_patch_small: null },
    },
  ];

  beforeEach(() => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockLaunches),
      })
    ) as unknown as typeof fetch;

    const modalRoot = document.createElement('div');
    modalRoot.setAttribute('id', 'modal-root');
    document.body.appendChild(modalRoot);
  });

  it('загружает и отображает карточки', async () => {
    renderWithMantine(<Catalog />);
    expect(await screen.findByText('FalconSat')).toBeInTheDocument();
    expect(await screen.findByText('DemoSat')).toBeInTheDocument();
  });

  it('открывает модалку при клике на карточку', async () => {
    renderWithMantine(<Catalog />);
    const card = await screen.findByText('FalconSat');
    fireEvent.click(card);
    expect(await screen.findByText(/Mission name:/i)).toBeInTheDocument();
  });

  it('закрывает модалку по кнопке', async () => {
    renderWithMantine(<Catalog />);
    const card = await screen.findByText('FalconSat');
    fireEvent.click(card);

    const closeBtn = await screen.findByRole('button', { name: /close modal/i });
    fireEvent.click(closeBtn);

    await waitFor(() => {
      expect(screen.queryByText(/Mission name:/i)).not.toBeInTheDocument();
    });
  });
});
