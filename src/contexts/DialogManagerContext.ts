import React from 'react';

export type DialogManagerStateType = {
  currentDialog?: string;
  openDialog(dialogName: string, props?: any): void;
  closeDialog(): void;
};

export default React.createContext<DialogManagerStateType>({ openDialog: () => {}, closeDialog: () => {} });
