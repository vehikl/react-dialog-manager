import { DialogManager, DialogManagerProps } from '../src/DialogManager';
import { Meta, Story } from '@storybook/react';
import React from 'react';
import DialogService from '../src/DialogService';
import useDialog from '../src/hooks/useDialog';
import DialogExample from './DialogExample';

DialogService.register('FirstDialog', DialogExample);

const meta: Meta = {
  title: 'DialogManager',
  component: DialogManager,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Button = (args) => {
  const { openDialog, closeDialog } = useDialog();
  return (
    <>
      <button onClick={() => openDialog('FirstDialog', args)}>Click me</button>
      <button onClick={closeDialog}>Close Dialog</button>
    </>
  );
};

const Template: Story<DialogManagerProps> = (args) => (
  <DialogManager>
    <Button {...args} />
  </DialogManager>
);

export const Default = Template.bind({});
Default.args = {
  message: 'Sir',
  delay: 200,
};
