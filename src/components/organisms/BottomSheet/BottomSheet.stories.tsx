import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { BottomSheet } from './BottomSheet';
import { Button } from '../../atoms/Button';
import { PhoneFrame } from '../PhoneFrame';

const meta = {
  title: 'Organisms/BottomSheet',
  component: BottomSheet,
  parameters: {
    docs: {
      description: {
        component:
          'Drawer rising over a dimmed blanket (32px top radius). Fills its nearest ' +
          '`position: relative` ancestor — wrap the screen and toggle `open`. Closes on ' +
          'blanket click, ✕/back, Escape, or dragging the header down. Put the main CTA ' +
          'in `footer` as `<Button size="xl">`.',
      },
    },
  },
} satisfies Meta<typeof BottomSheet>;

export default meta;
type Story = StoryObj<typeof meta>;

const LOREM =
  'Lorem ipsum dolor sit amet consectetur. Aenean aenean mauris ultricies ullamcorper dui enim mauris pulvinar lacus. Donec convallis lorem non aliquam in quam semper vitae sed.';

function Demo({ header, footer }: { header?: 'nav' | 'action'; footer?: boolean }) {
  const [open, setOpen] = useState(true);
  return (
    <PhoneFrame homeIndicator>
      <div style={{ padding: '24px 20px', fontFamily: 'var(--mav-font-body)' }}>
        <h4 style={{ margin: '32px 0 8px', color: 'var(--mav-text-default)' }}>Documents</h4>
        <p style={{ margin: 0, fontSize: 13, color: 'var(--mav-text-description)' }}>
          Tap an item to preview
        </p>
        <div style={{ marginTop: 16 }}>
          <Button onClick={() => setOpen(true)}>Open sheet</Button>
        </div>
      </div>
      <BottomSheet
        open={open}
        onClose={() => setOpen(false)}
        title="Title"
        header={header}
        actionLabel="Done"
        footer={footer ? <Button size="xl">Button</Button> : undefined}
      >
        <h5>Title</h5>
        <p>{LOREM}</p>
        <p>{LOREM}</p>
        <p>{LOREM}</p>
      </BottomSheet>
    </PhoneFrame>
  );
}

export const Default: Story = {
  args: { open: true, title: 'Title' },
  render: () => <Demo header="nav" />,
};

export const WithButtonDock: Story = {
  args: { open: true, title: 'Title' },
  render: () => <Demo header="action" footer />,
};
