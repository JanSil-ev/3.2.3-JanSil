import { useEffect } from 'react';
import { IconRocket, IconX } from '@tabler/icons-react';
import { createPortal } from 'react-dom';
import { Button, Card, Image, Text } from '@mantine/core';
import { Launch } from '@/types';
import styles from './styles.module.css';

interface CatalogModalProps {
  launch: Launch;
  onClose: () => void;
}

export function CatalogModal({ launch, onClose }: CatalogModalProps) {
  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot || !launch) {
    return null;
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return createPortal(
    <div
      className={styles.modal}
      onClick={onClose}
      aria-label="Close modal background"
      role="presentation"
    >
      <Card
        padding="xl"
        radius="md"
        withBorder
        className={styles.modalCard}
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          variant="subtle"
          color="gray"
          onClick={onClose}
          className={styles.closeButton}
          aria-label="Close modal"
        >
          <IconX size={20} />
        </Button>

        <Text className={styles.missionTitle}>{launch.mission_name}</Text>

        {launch.links?.mission_patch_small ? (
          <Image
            src={launch.links.mission_patch_small}
            alt={launch.mission_name}
            height={80}
            width={80}
            fit="contain"
            className={styles.missionImage}
          />
        ) : (
          <IconRocket size={80} color="#868e96" className={styles.missionImage} />
        )}

        <div>
          <Text className={styles.sectionTitle}>Mission name:</Text>
          <Text className={styles.sectionContent}>{launch.mission_name}</Text>
        </div>

        <div>
          <Text className={styles.sectionTitle}>Rocket name:</Text>
          <Text className={styles.sectionContent}>{launch.rocket?.rocket_name}</Text>
        </div>

        <div>
          <Text className={styles.detailsTitle}>Details:</Text>
          <Text className={styles.detailsContent}>{launch.details || 'No details available'}</Text>
        </div>
      </Card>
    </div>,
    modalRoot
  );
}
