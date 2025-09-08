import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { MantineProvider } from '@mantine/core';
import type { CatalogCardProps } from '@/types';
import { CatalogCard } from './Index';

function renderWithMantine(ui: React.ReactNode) {
  return render(<MantineProvider>{ui}</MantineProvider>);
}

describe('CatalogCard', () => {
  const launch: CatalogCardProps['launch'] = {
    flight_number: 1,
    mission_name: 'FalconSat',
    rocket: { rocket_name: 'Falcon 1' },
    details: 'Some details',
    links: { mission_patch_small: 'https://example.com/patch.png' },
  };

  it('рендерит название миссии и ракеты', () => {
    renderWithMantine(<CatalogCard launch={launch} onOpenModal={() => {}} />);
    expect(screen.getByText('FalconSat')).toBeInTheDocument();
    expect(screen.getByText('Falcon 1')).toBeInTheDocument();
  });

  it('вызывает onOpenModal при клике на карточку', () => {
    const onOpenModal = vi.fn();
    renderWithMantine(<CatalogCard launch={launch} onOpenModal={onOpenModal} />);
    fireEvent.click(screen.getByRole('button', { name: /falconsat/i }));
    expect(onOpenModal).toHaveBeenCalled();
  });

  it('вызывает onOpenModal при клике на кнопку "See more"', () => {
    const onOpenModal = vi.fn();
    renderWithMantine(<CatalogCard launch={launch} onOpenModal={onOpenModal} />);
    fireEvent.click(screen.getByRole('button', { name: /see more/i }));
    expect(onOpenModal).toHaveBeenCalled();
  });
});
