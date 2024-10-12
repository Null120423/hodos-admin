import { createContext, useCallback, useContext, useState } from 'react';
import { Notification, useToaster } from 'rsuite';

const ToastContext = createContext();

export const TOAST_TYPE = {
  INFO: 'info',
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
};
export const ToastProvider = ({ children }) => {
  const toaster = useToaster();
  const [type, setType] = useState('info');
  const [placement, setPlacement] = useState('topEnd');

  const showToast = useCallback(
    (
      message,
      options = {
        placement: 'topEnd',
        type: TOAST_TYPE.INFO,
      },
    ) => {
      const { type: messageType = type, placement: messagePlacement = placement } = options;
      const notification = (
        <Notification type={messageType} header={`${messageType}!`} closable>
          <p>{message}</p>
        </Notification>
      );

      toaster.push(notification, { placement: messagePlacement });
    },
    [toaster, type, placement],
  );

  const removeToast = useCallback(() => {
    toaster.remove();
  }, [toaster]);

  const clearToasts = useCallback(() => {
    toaster.clear();
  }, [toaster]);

  return (
    <ToastContext.Provider value={{ showToast, removeToast, clearToasts, setType, setPlacement }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
