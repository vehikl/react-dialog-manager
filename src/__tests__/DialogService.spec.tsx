import React from 'react';
import DialogService from '../DialogService';

describe('DialogService', () => {
  test('registers a new dialog', () => {
    const dialogName = 'Login';
    DialogService.register(dialogName, () => <div />);

    expect(DialogService.dialogs[dialogName]).toBeTruthy();
  });

  test('registers multiple dialogs', () => {
    const dialogs = {
      Login: () => <div />,
      ForgotPassword: () => <div />,
    };

    DialogService.registerMultiple(dialogs);

    expect(DialogService.dialogs).toEqual(dialogs);
  });

  test('will get a dialog by name', () => {
    const dialogName = 'Login';
    DialogService.register(dialogName, () => <div />);

    expect(DialogService.get(dialogName)).toEqual({});
  });

  test('will throw if dialog is not available', () => {
    expect(() => DialogService.get('random-name')).toThrow('Dialog random-name not found');
  });
});
