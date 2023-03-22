import React from 'react';

import styles from './Button.module.scss';

interface ButtonProps {
  type?: 'submit' | 'button' | 'reset';
  isPrimary: boolean;
  children: React.ReactNode | string;
  isDisabled: boolean;
  onShowModal?: () => void;
  onAddTodo?: () => void;
}

const Button = ({ type, isPrimary, isDisabled, onShowModal, onAddTodo, children }: ButtonProps) => {
  return (
    <React.Fragment>
      <button
        type={type || 'button'}
        className={`${styles.button} ${
          isPrimary ? styles['button--primary'] : styles['button--secondary']
        }`}
        onClick={onShowModal || onAddTodo}
        disabled={isDisabled}
      >
        {children}
      </button>
    </React.Fragment>
  );
};

export default Button;
