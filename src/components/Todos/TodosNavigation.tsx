import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { uiActions } from '../../store/uiSlice';

import Button from '../UI/Button/Button';
import Select from '../UI/Select/Select';
import styles from './TodosNavigation.module.scss';

import { status } from '../../models/todo';
import { ISelectRef } from '../../models/select';

const TodosNavigation = () => {
  const dispatch = useDispatch();
  const selectInputRef = useRef<ISelectRef>(null);

  const showAddTaskModalHandler = () => {
    dispatch(uiActions.toggleAddTaskModal());
  };

  return (
    <div className={styles['todos-nagivation']}>
      <Button isPrimary onShowModal={showAddTaskModalHandler} isDisabled={false}>
        Add Task
      </Button>
      <Select
        ref={selectInputRef}
        id="status"
        className={styles['todos-navigations-select']}
        status={status}
        isCompleted={false}
        isChangeStatusGlobal
      />
    </div>
  );
};

export default TodosNavigation;
