import { IconRocket } from '@tabler/icons-react';
import { Button, Card, Image, Text } from '@mantine/core';
import { CatalogCardProps } from '@/types';
import styles from './styles.module.css';

export function CatalogCard({ launch, onOpenModal }: CatalogCardProps) {
  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      className={styles.card}
      onClick={onOpenModal}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpenModal();
        }
      }}
      aria-label={`View details of ${launch.mission_name} mission`}
    >
      <Card.Section className={styles.cardSection}>
        {launch.links?.mission_patch_small ? (
          <Image
            src={launch.links.mission_patch_small}
            alt={launch.mission_name}
            height={100}
            width={100}
            fit="contain"
            className={styles.cardImage}
          />
        ) : (
          <IconRocket size={100} color="#868e96" />
        )}
      </Card.Section>

      <div className={styles.cardContent}>
        <Text className={styles.missionName} lineClamp={2}>
          {launch.mission_name}
        </Text>

        <Text className={styles.rocketName}>{launch.rocket?.rocket_name}</Text>

        <Button
          className={styles.buttonContainer}
          variant="light"
          fullWidth
          onClick={onOpenModal}
          style={{ marginTop: '15px' }}
        >
          See more
        </Button>
      </div>
    </Card>
  );
}
