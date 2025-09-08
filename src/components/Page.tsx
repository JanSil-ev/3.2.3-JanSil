import { Container, Title } from '@mantine/core';
import { Catalog } from './Catalog';

export function Page() {
  return (
    <Container size="lg" py="xl">
      <Title
        order={1}
        style={{
          textAlign: 'center',
          marginBottom: 40,
          fontSize: '2.5rem',
          fontWeight: 700,
        }}
      >
        SpaceX Launches 2020
      </Title>
      <Catalog />
    </Container>
  );
}
