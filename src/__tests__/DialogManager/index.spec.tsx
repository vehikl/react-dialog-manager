import React, { useEffect } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { DialogManager } from '../../DialogManager';
import DialogService from '../../DialogService';
import useDialog from '../../hooks/useDialog';
import { act } from 'react-dom/test-utils';

describe('DialogManager', () => {
  it('will render the component', async () => {
    DialogService.register('dialog', () => <div data-testid="dialog" />);

    const Button = () => {
      const { openDialog } = useDialog();
      return (
        <button data-testid="button" onClick={() => openDialog('dialog')}>
          Click
        </button>
      );
    };

    render(
      <DialogManager>
        <Button />
      </DialogManager>,
    );

    const button = await screen.findByTestId('button');

    expect(screen.queryByTestId('dialog')).not.toBeInTheDocument();
    fireEvent.click(button);
    expect(screen.queryByTestId('dialog')).toBeInTheDocument();
  });

  it('will render the component with props', async () => {
    DialogService.register('dialog', ({ message }: any) => <div>{message}</div>);

    const testMessage = 'test-message'

    const Button = () => {
      const { openDialog } = useDialog();
      return (
        <button data-testid="button" onClick={() => openDialog('dialog', { message: testMessage})}>
          Click
        </button>
      );
    };

    render(
      <DialogManager>
        <Button />
      </DialogManager>,
    );

    const button = await screen.findByTestId('button');

    expect(screen.queryByText(testMessage)).not.toBeInTheDocument();
    fireEvent.click(button);
    expect(screen.queryByText(testMessage)).toBeInTheDocument();
  });

  it('can close a dialog', async () => {
    jest.useFakeTimers()

    DialogService.register('dialog', () => <div data-testid="dialog" />);
    const delay = 100;

    const Button = () => {
      const { openDialog, closeDialog } = useDialog();

      useEffect(() => {
        openDialog('dialog', { delay });
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

      return (
        <button data-testid="button" onClick={() => closeDialog()}>
          Click
        </button>
      );
    };

    render(
      <DialogManager>
        <Button />
      </DialogManager>,
    );

    const button = await screen.findByTestId('button');

    expect(screen.queryByTestId('dialog')).toBeInTheDocument();

    act(() => {
      fireEvent.click(button);
      jest.advanceTimersByTime(delay)
    })
    
    expect(screen.queryByTestId('dialog')).not.toBeInTheDocument();
  });
});
