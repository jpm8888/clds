import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { SearchField } from './SearchField';

const meta = {
  title: 'Atoms/SearchField',
  component: SearchField,
  args: { placeholder: 'Search transactions…' },
  parameters: {
    docs: {
      description: {
        component:
          'Search input with a leading magnifier that tints brand-color on focus. ' +
          'Pass `clearable` + `onClear` for the × affordance.',
      },
    },
  },
} satisfies Meta<typeof SearchField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithLabel: Story = {
  args: { label: 'Find a payee', placeholder: 'Name or account number' },
};

export const Controlled: Story = {
  render: (args) => {
    const [q, setQ] = useState('coffee');
    return (
      <SearchField
        {...args}
        value={q}
        onChange={(e) => setQ(e.target.value)}
        clearable
        onClear={() => setQ('')}
      />
    );
  },
};

export const States: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 400 }}>
      <SearchField {...args} />
      <SearchField {...args} state="focus" />
      <SearchField {...args} errorMessage="No results found" defaultValue="xyzzy" />
    </div>
  ),
};
