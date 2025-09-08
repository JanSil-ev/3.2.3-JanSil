import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';
import { Page } from './components/Page';
import { theme } from './theme';

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <Page />
    </MantineProvider>
  );
}
