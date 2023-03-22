import React from 'react';
import ReactDOM from 'react-dom';

import styles from './ModalAddTask.module.scss';

interface BackdropProps {
  onClose: () => void;
}

interface ModalOverlayProps extends BackdropProps {
  children: React.ReactNode;
  className?: string;
}

interface ModalProps extends ModalOverlayProps {}

const Backdrop = ({ onClose }: BackdropProps) => {
  return <div className={styles.backdrop} onClick={onClose}></div>;
};

const ModalOverlay = ({ className, children, onClose }: ModalOverlayProps) => {
  return (
    <React.Fragment>
      <div className={`${styles.modal} ${className}`}>
        {children}
        <div className={styles.closeButton} onClick={onClose}>
          x
        </div>
      </div>
    </React.Fragment>
  );
};

const ModalAddTask = ({ onClose, children, className }: ModalProps) => {
  const overlayEl = document.getElementById('overlays')! as HTMLDivElement;

  return (
    <React.Fragment>
      {ReactDOM.createPortal(<Backdrop onClose={onClose} />, overlayEl)}
      {ReactDOM.createPortal(
        <ModalOverlay className={className} onClose={onClose}>
          {children}
        </ModalOverlay>,
        overlayEl
      )}
    </React.Fragment>
  );
};

export default ModalAddTask;
