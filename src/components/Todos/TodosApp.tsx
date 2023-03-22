import { Fragment } from 'react';

import { useAppSelector } from '../../store';

import TodosNavigation from './TodosNavigation';
import TodosList from './TodosList';
import TodoForm from './TodoForm';

import styles from './TodosApp.module.scss';

const TodosApp = () => {
  const isShown = useAppSelector((state) => state.ui.isShownAddTaskModal);

  return (
    <Fragment>
      {isShown && <TodoForm type="Add" />}
      <h1 className={styles['todos-header']}>TODO LIST</h1>
      <TodosNavigation />
      <TodosList />
    </Fragment>
  );
};

export default TodosApp;
