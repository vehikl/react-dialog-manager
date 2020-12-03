import React from 'react';

export type DialogManagerStateType = {
  currentDialog?: string;
  openDialog(dialogName: string, props?: any): void;
  closeDialog(): void;
  show: boolean;
};

export default React.createContext<DialogManagerStateType>({ openDialog: () => {}, closeDialog: () => {}, show: false });
