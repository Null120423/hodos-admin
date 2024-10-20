import { createContext, useCallback, useContext, useState } from 'react';
import { Loader, Modal } from 'rsuite';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState(null);
  const [title, setTitle] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(null);

  const openModal = useCallback((modalContent, title, isFullScreen = false) => {
    setContent(modalContent);
    setTitle(title);
    setOpen(true);
    setIsFullScreen(isFullScreen);
  }, []);

  const closeModal = useCallback(() => {
    setOpen(false);
    setContent(null);
  }, []);

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <Modal open={open} onClose={closeModal} className={isFullScreen ? 'w-screen h-screen p-0 m-0' : 'w-fit'}>
        <Modal.Header>
          <Modal.Title>{title || 'title'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {content || (
            <div style={{ textAlign: 'center' }}>
              <Loader size='md' />
            </div>
          )}
        </Modal.Body>
      </Modal>
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
