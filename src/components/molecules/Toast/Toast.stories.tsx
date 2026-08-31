import type { Meta, StoryObj } from '@storybook/react-vite';
import { Toast, ToastNotification, Snackbar } from './Toast';

const meta = {
  title: 'Molecules/Toast',
  component: Toast,
  args: { tone: 'primary', title: 'Your statement is ready' },
  parameters: {
    docs: {
      description: {
        component:
          'Floating feedback card (Figma 85:5234). The package ships the card only — ' +
          'position it fixed with z-index var(--mav-z-toast) in the app. ' +
          'Also exports ToastNotification (button rail) and Snackbar (compact dark mini-toast).',
      },
    },
  },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const WithEverything: Story = {
  args: {
    tone: 'success',
    title: 'Money sent',
    description: '₱2,500.00 to Amara Cruz',
    action: 'View',
    onClose: () => {},
  },
};

export const Tones: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 560 }}>
      <Toast tone="primary" title="Verification code sent" onClose={() => {}} />
      <Toast tone="success" title="Payment complete" description="₱1,200.00 to Meralco" />
      <Toast tone="warning" title="Weak signal" description="Transaction may take longer" />
      <Toast tone="danger" title="Transfer failed" action="Retry" />
    </div>
  ),
};

export const Notification: Story = {
  render: () => (
    <ToastNotification
      title="New login request"
      description="Chrome on macOS · Manila"
      actions={[{ label: 'Approve' }, { label: 'Deny' }]}
    />
  ),
};

export const SnackbarStory: Story = {
  name: 'Snackbar',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Snackbar status="success" title="Card frozen" action="Undo" />
      <Snackbar
        status="error"
        title="Sync failed"
        description="Check your connection"
        onClose={() => {}}
      />
    </div>
  ),
};
