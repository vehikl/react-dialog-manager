import React, { FC, useState } from 'react';
import DialogService from '../DialogService';
import DialogManagerContext from '../contexts/DialogManagerContext';

export type DialogManagerProps = {};

export const DialogManager: FC<DialogManagerProps> = ({ children }) => {
  const [dialog, setDialog] = useState<{ name: string; props: any }>();
  const [isDialogVisible, setIsDialogVisible] = useState<boolean>(false);

  const DialogNode = dialog ? DialogService.get(dialog.name) : null;

  const closeDialog = () => {
    setIsDialogVisible(false);

    setTimeout(() => {
      setDialog(undefined);
    }, dialog?.props.delay || 100);
  };

  const openDialog = (name: string, props: any = {}) => {
    setTimeout(() => {
      setIsDialogVisible(true);
    }, props.delay || 100);

    setDialog({ name, props });
  };

  return (
    <DialogManagerContext.Provider
      value={{ currentDialog: dialog?.name, openDialog, closeDialog, show: isDialogVisible }}
    >
      {children}
      {DialogNode ? <DialogNode {...(dialog?.props ?? {})} /> : null}
    </DialogManagerContext.Provider>
  );
};
