import { Fragment, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../store';
import { getTodos, sendTodos } from '../../store/Todo/todoActions';

import TodosNavigation from './TodosNavigation';
import TodosList from './TodosList';
import TodoForm from './TodoForm';

import styles from './TodosApp.module.scss';

let isInitial = true;

const TodosApp = () => {
  const dispatch = useAppDispatch();
  const todo = useAppSelector((state) => state.todo);
  const isShown = useAppSelector((state) => state.ui.isShownAddTaskModal);
  const hasEditingTodo = useAppSelector((state) => state.todo.hasEditingTodo);
  console.log(todo);

  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    if (todo.changed) {
      dispatch(sendTodos(todo.todos));
    }
  }, [dispatch, todo]);

  return (
    <Fragment>
      {isShown && <TodoForm type={hasEditingTodo ? 'Update' : 'Add'} />}
      <h1 className={styles['todos-header']}>TODO LIST</h1>
      <div className={styles.wrapper}>
        <TodosNavigation />
        <TodosList />
      </div>
    </Fragment>
  );
};

export default TodosApp;
