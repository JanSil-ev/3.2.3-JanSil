import { useEffect, useReducer } from 'react';
import { SimpleGrid } from '@mantine/core';
import { Launch } from '@/types';
import { CatalogCard } from './CatalogCard/Index';
import { CatalogModal } from './CatalogModal';

interface CatalogState {
  launches: Launch[];
  selectedLaunch: Launch | null;
  isModalOpen: boolean;
}

type CatalogAction =
  | { type: 'SET_LAUNCHES'; payload: Launch[] }
  | { type: 'ADD_LAUNCH'; payload: Launch }
  | { type: 'CLEAR_LAUNCHES' }
  | { type: 'OPEN_MODAL'; payload: Launch }
  | { type: 'CLOSE_MODAL' };

function catalogReducer(state: CatalogState, action: CatalogAction): CatalogState {
  switch (action.type) {
    case 'SET_LAUNCHES':
      return { ...state, launches: action.payload };
    case 'OPEN_MODAL':
      return { ...state, selectedLaunch: action.payload, isModalOpen: true };
    case 'CLOSE_MODAL':
      return { ...state, selectedLaunch: null, isModalOpen: false };
    default:
      return state;
  }
}

const initialState: CatalogState = {
  launches: [],
  selectedLaunch: null,
  isModalOpen: false,
};

export function Catalog() {
  const [state, dispatch] = useReducer(catalogReducer, initialState);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          'https://api.spacexdata.com/v3/launches/past?launch_year=2020'
        );
        const data: Launch[] = await response.json();
        dispatch({ type: 'SET_LAUNCHES', payload: data });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <SimpleGrid cols={4} spacing="lg">
        {state.launches.map((launch) => (
          <CatalogCard
            key={launch.flight_number}
            launch={launch}
            onOpenModal={() => dispatch({ type: 'OPEN_MODAL', payload: launch })}
          />
        ))}
      </SimpleGrid>

      {state.isModalOpen && state.selectedLaunch && (
        <CatalogModal
          launch={state.selectedLaunch}
          onClose={() => dispatch({ type: 'CLOSE_MODAL' })}
        />
      )}
    </>
  );
}
