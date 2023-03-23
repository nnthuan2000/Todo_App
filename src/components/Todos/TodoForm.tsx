import React, { useState, useRef } from 'react';
import { format } from 'date-fns';

import { useAppDispatch, useAppSelector } from '../../store';
import { uiActions } from '../../store/uiSlice';
import { todosActions } from '../../store/Todo/todoSlice';

import ModalAddTask from '../UI/Modals/ModalAddTask/ModalAddTask';
import Button from '../UI/Button/Button';
import Select from '../UI/Select/Select';

import { ISelectRef } from '../../models/select';
import { ITodo, status } from '../../models/todo';
import styles from './TodoForm.module.scss';

interface TodoFormProps {
  type: string;
  todo?: ITodo;
}

const TodoForm = ({ type }: TodoFormProps) => {
  const dispatch = useAppDispatch();
  const hasEditingTodo = useAppSelector((state) => state.todo.hasEditingTodo);
  const editingTodo = useAppSelector((state) => state.todo.editingTodo);
  const [enteredTitle, setEnteredTitle] = useState<string>(editingTodo.todo?.title || '');
  const selectInputRef = useRef<ISelectRef>(null);

  const titleChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredTitle(e.target.value);
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const todo = {
      date: format(new Date(), 'hh:mm a, MM/dd/yyyy'),
      id: Math.random().toString(),
      isCompleted: selectInputRef.current?.value === 'Completed',
      title: enteredTitle,
    };
    if (!hasEditingTodo) {
      dispatch(todosActions.addTodo(todo));
    } else {
      dispatch(
        todosActions.updateTodo({
          index: editingTodo.index,
          todo: todo,
        })
      );
    }
    dispatch(uiActions.toggleAddTaskModal());
  };

  const closeModalHandler = () => {
    dispatch(uiActions.toggleAddTaskModal());
  };

  return (
    <ModalAddTask onClose={closeModalHandler}>
      <h2 className={styles['todo-header']}>{`${type} TODO`}</h2>
      <form action="" className={styles['todo-form']} onSubmit={submitHandler}>
        <div className={styles['todo-action']}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name=""
            id="title"
            required
            onChange={titleChangeHandler}
            value={enteredTitle}
          />
        </div>
        <div className={styles['todo-action']}>
          <label htmlFor="status">Status</label>
          <Select
            ref={selectInputRef}
            id="status"
            status={status.slice(1)}
            isCompleted={editingTodo.todo?.isCompleted || false}
            isChangeStatusGlobal={false}
          />
        </div>
        <div className={styles['todo-button-action']}>
          <Button type="submit" isPrimary isDisabled={false}>{`${type} Task`}</Button>
          <Button isPrimary={false} isDisabled={false} onShowModal={closeModalHandler}>
            Cancel
          </Button>
        </div>
      </form>
    </ModalAddTask>
  );
};

export default TodoForm;
