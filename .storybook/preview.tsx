import { useEffect } from 'react';
import type { Decorator, Preview } from '@storybook/react-vite';
import '../src/styles.css';

// Theme switching mirrors the shipping contract exactly: the consumer sets
// data-theme="dark" on <html>; tokens are defined on :root so a wrapper div
// would not pick up the overrides.
const withTheme: Decorator = (Story, context) => {
  const theme = (context.globals.theme as string | undefined) ?? 'light';
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);
  return <Story />;
};

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Design-system theme (sets data-theme on <html>)',
      toolbar: {
        title: 'Theme',
        icon: 'mirror',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { theme: 'light' },
  decorators: [withTheme],
  parameters: {
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    backgrounds: { disable: true },
  },
  tags: ['autodocs'],
};

export default preview;
