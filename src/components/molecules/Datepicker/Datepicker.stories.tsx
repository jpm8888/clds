import type { Meta, StoryObj } from '@storybook/react-vite';
import { Datepicker } from './Datepicker';

const meta = {
  title: 'Molecules/Datepicker',
  component: Datepicker,
  parameters: {
    docs: {
      description: {
        component:
          'Calendar card for picking a single date. Controlled (`value` + `onChange`) or ' +
          'uncontrolled (`defaultValue`). Selected fill re-themes blue → lime in dark. ' +
          'Click the month label for the year grid; arrow keys move the focused day.',
      },
    },
  },
} satisfies Meta<typeof Datepicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { defaultValue: new Date(2022, 1, 11) },
};

export const WithMinMax: Story = {
  name: 'Min / max bounds',
  args: {
    defaultValue: new Date(2022, 1, 11),
    min: new Date(2022, 1, 4),
    max: new Date(2022, 1, 24),
  },
};

export const Empty: Story = {
  args: {},
};
