import type { Meta, StoryObj } from '@storybook/react-vite';
import { Stepper } from './Stepper';

const meta = {
  title: 'Molecules/Stepper',
  component: Stepper,
  args: { steps: ['Amount', 'Recipient', 'Review', 'Done'], active: 1 },
  parameters: {
    docs: {
      description: {
        component:
          'Progress stepper for multi-step flows. `active` is the current index; ' +
          'everything before it renders as done.',
      },
    },
  },
} satisfies Meta<typeof Stepper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Start: Story = { args: { active: 0 } };

export const LastStep: Story = { args: { active: 3 } };

export const AllStates: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: 460 }}>
      {[0, 1, 2, 3].map((a) => (
        <Stepper key={a} {...args} active={a} />
      ))}
    </div>
  ),
};
