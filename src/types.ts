export interface Launch {
  flight_number: number;
  mission_name: string;
  details?: string | null;
  rocket: {
    rocket_name: string;
  };
  links: {
    mission_patch_small?: string | null;
    mission_patch?: string | null;
  };
}

export interface CatalogCardProps {
  launch: Launch;
  onOpenModal: () => void;
}

export interface CatalogModalProps {
  launch: Launch;
  onClose: () => void;
}
