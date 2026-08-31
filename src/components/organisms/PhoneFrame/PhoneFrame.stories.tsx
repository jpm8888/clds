import type { Meta, StoryObj } from '@storybook/react-vite';
import { PhoneFrame } from './PhoneFrame';

const meta = {
  title: 'Organisms/PhoneFrame',
  component: PhoneFrame,
  parameters: {
    docs: {
      description: {
        component:
          'Presentational 330×640 device bezel for staging mobile organisms in stories ' +
          'and demos. Not for production screens — ship those full-viewport.',
      },
    },
  },
} satisfies Meta<typeof PhoneFrame>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    homeIndicator: true,
    children: (
      <div
        style={{
          padding: '32px 20px',
          fontFamily: 'var(--mav-font-body)',
          color: 'var(--mav-text-default)',
        }}
      >
        <h4 style={{ margin: '16px 0 8px' }}>Screen content</h4>
        <p style={{ fontSize: 13, color: 'var(--mav-text-description)' }}>
          Anything absolutely-positioned (inset: 0) fills the screen.
        </p>
      </div>
    ),
  },
};
