import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProgressBar } from './ProgressBar';

const meta = {
  title: 'Atoms/ProgressBar',
  component: ProgressBar,
  args: { value: 60 },
  parameters: {
    docs: {
      description: {
        component:
          'Determinate 6px progress bar for spend limits and goals. ' +
          'Pass `label` / `showValue` for captioned rows.',
      },
    },
  },
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithValue: Story = { args: { value: 62, showValue: true } };

export const WithLabel: Story = { args: { value: 80, label: 'Monthly limit', showValue: true } };

export const Disabled: Story = { args: { disabled: true } };

export const Stack: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, width: 400 }}>
      <ProgressBar value={25} />
      <ProgressBar value={50} />
      <ProgressBar value={75} />
      <ProgressBar value={100} />
    </div>
  ),
};
